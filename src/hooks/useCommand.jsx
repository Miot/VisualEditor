import clone from "nanoclone";
import { events } from "../utils/events";
import { reactive, onUnmounted } from "vue";

export function useCommand(inputData, selectedData) {
  const data = reactive(inputData);
  const state = {
    //前进后退指针
    curr: -1,
    queue: [],
    commands: {},
    commandsArr: [],
    destroyArr: [],
  };

  const registry = (command) => {
    state.commandsArr.push(command);
    state.commands[command.name] = (...args) => {
      const { redo, undo } = command.execute(...args);
      redo();
      if (!command.pushQueue) return;
      let { curr, queue } = state;
      if (queue.length) {
        // 删除中途撤销的操作
        queue = queue.slice(0, curr + 1);
        state.queue = queue;
      }
      queue.push({ redo, undo });
      state.curr = curr + 1;
    };
  };

  registry({
    name: "redo",
    keyboard: "ctrl+y",
    execute() {
      return {
        redo() {
          const item = state.queue[state.curr + 1];
          if (item) {
            item.redo && item.redo();
            state.curr++;
          }
        },
      };
    },
  });
  registry({
    name: "undo",
    keyboard: "ctrl+z",
    execute() {
      return {
        redo() {
          if (state.curr === -1) return;
          const item = state.queue[state.curr];
          if (item) {
            item.undo && item.undo();
            state.curr--;
          }
        },
      };
    },
  });
  registry({
    name: "drag",
    pushQueue: true,
    init() {
      this.before = [];
      // 监控拖拽前记录
      const start = () => {
        this.before = clone(data.value.blocks);
      };
      const end = () => state.commands.drag();
      events.on("start", start);
      events.on("end", end);

      return () => {
        events.off("start");
        events.off("end");
      };
    },
    execute() {
      const before = this.before;
      const after = data.value.blocks;
      return {
        redo() {
          data.value = { ...data.value, blocks: after };
        },
        undo() {
          data.value.blocks = [...before];
        },
      };
    },
  });

  registry({
    name: "updateContainer", // 更新所有节点
    pushQueue: true,
    execute(newValue) {
      const state = {
        before: data.value,
        after: newValue,
      };
      return {
        redo: () => {
          data.value = state.after;
        },
        undo: () => {
          data.value = state.before;
        },
      };
    },
  });
  registry({
    name: "updateBlock", // 更新单个节点
    pushQueue: true,
    execute(oldBlock, newBlock) {
      const state = {
        before: data.value.blocks,
        after: (() => {
          let blocks = clone(data.value.blocks);
          const idx = data.value.blocks.indexOf(oldBlock);
          if (idx > -1) {
            blocks.splice(idx, 1, newBlock);
          }
          return blocks;
        })(),
      };
      return {
        redo: () => {
          data.value.blocks = [...state.after];
        },
        undo: () => {
          data.value = { ...data.value, blocks: state.before };
        },
      };
    },
  });

  registry({
    name: "placeTop",
    pushQueue: true,
    execute() {
      const before = clone(data.value.blocks);
      const after = (() => {
        const { selected, unselected } = selectedData.value;
        const maxIndex = unselected.reduce((prev, block) => {
          return Math.max(prev, block.zIndex);
        }, -Number.MIN_SAFE_INTEGER);
        selected.forEach((block) => (block.zIndex = maxIndex + 1));
        return data.value.blocks;
      })();
      return {
        redo: () => {
          data.value = { ...data.value, blocks: after };
        },
        undo: () => {
          data.value = { ...data.value, blocks: before };
        },
      };
    },
  });
  registry({
    name: "placeBottom",
    pushQueue: true,
    execute() {
      const before = clone(data.value.blocks);
      const after = (() => {
        const { selected, unselected } = selectedData.value;
        let minIndex =
          unselected.reduce((prev, block) => {
            return Math.min(prev, block.zIndex);
          }, Number.MAX_SAFE_INTEGER) - 1;
        if (minIndex < 0) {
          const dur = Math.abs(minIndex);
          minIndex = 0;
          unselected.forEach((block) => (block.zIndex += dur));
        }
        selected.forEach((block) => (block.zIndex = minIndex));
        console.log(unselected);
        return data.value.blocks;
      })();
      return {
        redo: () => {
          data.value = { ...data.value, blocks: after };
        },
        undo: () => {
          data.value = { ...data.value, blocks: before };
        },
      };
    },
  });

  registry({
    name: "del",
    pushQueue: true,
    execute() {
      const before = clone(data.value.blocks);
      const after = selectedData.value.unselected;
      return {
        redo: () => {
          data.value = { ...data.value, blocks: after };
        },
        undo: () => {
          data.value = { ...data.value, blocks: before };
        },
      };
    },
  });

  const keyboardEvent = (() => {
    const keyCodes = {
      90: "z",
      89: "y",
    };
    const onKeydown = (e) => {
      const { ctrlKey, keyCode } = e;
      let keyString = [];
      if (ctrlKey) keyString.push("ctrl");
      keyString.push(keyCodes[keyCode]);
      keyString = keyString.join("+");

      state.commandsArr.forEach(({ keyboard, name }) => {
        if (!keyboard) return;
        if (keyboard === keyString) {
          state.commands[name]();
          e.preventDefault();
        }
      });
    };
    const init = () => {
      window.addEventListener("keydown", onKeydown);
      return () => {
        window.removeEventListener("keydown", onKeydown);
      };
    };

    return init;
  })();

  (() => {
    // 回收事件监听器
    state.destroyArr.push(keyboardEvent());
    state.commandsArr.forEach(
      (command) => command.init && state.destroyArr.push(command.init())
    );
  })();

  onUnmounted(() => {
    state.destroyArr.forEach((fn) => fn && fn());
  });
  return state;
}
