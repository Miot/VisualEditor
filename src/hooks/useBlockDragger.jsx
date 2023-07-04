import { computed, reactive, ref } from "vue";

export function useBlockDragger(data) {
  let curIndex = ref(-1);
  const lastSelectedBlock = computed(() => data.value.blocks[curIndex.value]);

  const blcokMousedown = (e, block, idx) => {
    e.preventDefault();
    e.stopPropagation();
    curIndex.value = idx;
    const selectedCount = data.value.blocks.filter(
      (block) => block.selected
    ).length;
    if (e.shiftKey) {
      block.selected = !block.selected;
    } else {
      if (!block.selected) {
        if (selectedCount >= 1) clearMousedown();
        block.selected = true;
      }
    }
    handleMoveSelectedBlocks(e);
  };
  const clearMousedown = () => {
    data.value.blocks.forEach((block) => (block.selected = false));
  };
  const selectedStatus = computed(() => {
    return {
      selected: data.value.blocks.filter((block) => block.selected),
      unselected: data.value.blocks.filter((block) => !block.selected),
    };
  });

  // 拖拽所选组件
  let dragState = {
    startX: 0,
    startY: 0,
  };
  let markLine = reactive({
    x: null,
    y: null,
  });
  const handleMoveSelectedBlocks = (e) => {
    const { width: selectedWidth, height: selectedHeight } =
      lastSelectedBlock.value;

    dragState = {
      startX: e.clientX,
      startY: e.clientY, // 每一个选中的位置
      startLeft: lastSelectedBlock.value.left,
      startTop: lastSelectedBlock.value.top, // 现在move的起始位置
      startPos: selectedStatus.value.selected.map(({ top, left }) => ({
        top,
        left,
      })),
      lines: (() => {
        const { unselected } = selectedStatus.value;
        let lines = { x: [], y: [] };
        unselected.forEach((block) => {
          const {
            top: unselectedTop,
            left: unselectedLeft,
            width: unselectedWidth,
            height: unselectedHeight,
          } = block;
          lines.y.push({ showTop: unselectedTop, top: unselectedTop }); // 顶对顶
          lines.y.push({
            showTop: unselectedTop,
            top: unselectedTop - selectedHeight,
          }); // 顶对底
          lines.y.push({
            showTop: unselectedTop + unselectedHeight / 2,
            top: unselectedTop + unselectedHeight / 2 - selectedHeight / 2,
          }); // 中对中
          lines.y.push({
            showTop: unselectedTop + unselectedHeight,
            top: unselectedTop + unselectedHeight,
          }); // 底对顶
          lines.y.push({
            showTop: unselectedTop + unselectedHeight,
            top: unselectedTop + unselectedHeight - selectedHeight,
          }); // 底对底

          lines.x.push({ showLeft: unselectedLeft, left: unselectedLeft }); // 左对左
          lines.x.push({
            showLeft: unselectedLeft + unselectedWidth,
            left: unselectedLeft + unselectedWidth,
          }); // 右对左
          lines.x.push({
            showLeft: unselectedLeft + unselectedWidth / 2,
            left: unselectedLeft + unselectedWidth / 2 - selectedWidth / 2,
          }); // 中对中
          lines.x.push({
            showLeft: unselectedLeft + unselectedWidth,
            left: unselectedLeft + unselectedWidth - selectedWidth,
          }); // 右对右
          lines.x.push({
            showLeft: unselectedLeft,
            left: unselectedLeft - selectedWidth,
          }); // 左对右
        });
        return lines;
      })(),
    };
    document.addEventListener("mousemove", moveSelectedBlocks);
    document.addEventListener("mouseup", setSelectedBlocks);
  };
  const moveSelectedBlocks = (e) => {
    let { clientX: moveX, clientY: moveY } = e;
    // 显示标准线
    const moveLeft = moveX - dragState.startX + dragState.startLeft;
    const moveTop = moveY - dragState.startY + dragState.startTop;
    let y = null;
    let x = null;
    const lines = dragState.lines;
    for (let i = 0; i < lines.y.length; i++) {
      const { showTop, top } = lines.y[i];
      if (Math.abs(top - moveTop) < 5) {
        // 纵向接近，显示横向线
        y = showTop;
        // 快速贴边
        moveY = dragState.startY - dragState.startTop + top;
        break;
      }
    }
    for (let i = 0; i < lines.x.length; i++) {
      const { showLeft, left } = lines.x[i];
      if (Math.abs(left - moveLeft) < 5) {
        // 横向接近，显示纵向线
        x = showLeft;
        // 快速贴边
        moveX = dragState.startX - dragState.startLeft + left;
        break;
      }
    }
    markLine.x = x;
    markLine.y = y;

    const durX = moveX - dragState.startX;
    const durY = moveY - dragState.startY;
    selectedStatus.value.selected.forEach((block, idx) => {
      block.top = dragState.startPos[idx].top + durY;
      block.left = dragState.startPos[idx].left + durX;
    });
  };
  const setSelectedBlocks = (e) => {
    document.removeEventListener("mousemove", moveSelectedBlocks);
    document.removeEventListener("mouseup", setSelectedBlocks);
    markLine.x = null;
    markLine.y = null;
  };

  return { blcokMousedown, clearMousedown, markLine };
}
