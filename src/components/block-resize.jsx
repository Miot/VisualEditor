import { defineComponent, reactive } from "vue";

export default defineComponent({
  props: {
    block: { type: Object },
    component: { type: Object },
  },
  emits: ["setBlock"],
  setup(props, ctx) {
    let { value: block } = reactive(props.block);
    const { width, height } = reactive(props.component.resize);
    let data = {};
    const onMousedown = (e, direction) => {
      e.stopPropagation();
      if (!block.hasResize) {
        block.originSize = { width: block.width, height: block.height };
      }

      data = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: block.width,
        startHeight: block.height,
        startLeft: block.left,
        startTop: block.top,
        direction,
      };
      document.body.addEventListener("mousemove", onmousemove);
      document.body.addEventListener("mouseup", onmouseup);
    };
    const onmousemove = (e) => {
      let { clientX, clientY } = e;
      const {
        startX,
        startY,
        startHeight,
        startWidth,
        startLeft,
        startTop,
        direction,
      } = data;

      if (direction.x === "center") clientX = startX;
      if (direction.y === "center") clientY = startY;

      let diffX = clientX - startX;
      let diffY = clientY - startY;

      if (direction.y === "top") {
        diffY = -diffY;
        block.top = Math.min(
          startTop - diffY,
          startTop + startHeight - block.originSize.height
        );
      }

      if (direction.x === "left") {
        diffX = -diffX;
        block.left = Math.min(
          startLeft - diffX,
          startLeft + startWidth - block.originSize.width
        );
      }

      const width = Math.max(startWidth + diffX, block.originSize.width);
      const height = Math.max(startHeight + diffY, block.originSize.height);

      block.width = width;
      block.height = height;
      block.hasResize = true;
      ctx.emit("setBlock", block);
    };
    const onmouseup = () => {
      document.body.removeEventListener("mousemove", onmousemove);
      document.body.removeEventListener("mouseup", onmouseup);
    };
    return () => (
      <>
        {width && (
          <>
            <div
              class="block-resize block-resize-left"
              onMousedown={(e) => onMousedown(e, { x: "left", y: "center" })}
            ></div>
            <div
              class="block-resize block-resize-right"
              onMousedown={(e) => onMousedown(e, { x: "right", y: "center" })}
            ></div>
          </>
        )}
        {height && (
          <>
            <div
              class="block-resize block-resize-top"
              onMousedown={(e) => onMousedown(e, { x: "center", y: "top" })}
            ></div>
            <div
              class="block-resize block-resize-bottom"
              onMousedown={(e) => onMousedown(e, { x: "center", y: "bottom" })}
            ></div>
          </>
        )}
        {height && width && (
          <>
            <div
              class="block-resize block-resize-top-left"
              onMousedown={(e) => onMousedown(e, { x: "left", y: "top" })}
            ></div>
            <div
              class="block-resize block-resize-top-right"
              onMousedown={(e) => onMousedown(e, { x: "right", y: "top" })}
            ></div>
            <div
              class="block-resize block-resize-bottom-left"
              onMousedown={(e) => onMousedown(e, { x: "left", y: "bottom" })}
            ></div>
            <div
              class="block-resize block-resize-bottom-right"
              onMousedown={(e) => onMousedown(e, { x: "right", y: "bottom" })}
            ></div>
          </>
        )}
      </>
    );
  },
});
