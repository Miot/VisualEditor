import { computed } from "vue";

export function useBlockDragger(data) {
  const blcokMousedown = (e, block) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.shiftKey && !block.selected) clearMousedown();
    block.selected = !block.selected;
    handleMoveSelectedBlocks(e);
  };
  const clearMousedown = () => {
    data.value.blocks.forEach((block) => (block.selected = false));
  };
  const selectedStatus = computed(() => {
    let selected = [], unselected = [];
    data.value.blocks.forEach((block) => (block.selected ? selected: unselected).push(block))
    return {
      selected,
      unselected
    };
  });

  // 拖拽所选组件
  let dragState = {
    startX: 0,
    startY: 0,
  };
  const handleMoveSelectedBlocks = (e) => {
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: selectedStatus.value.selected.map(({ top, left }) => ({
        top,
        left,
      })),
    };
    document.addEventListener("mousemove", moveSelectedBlocks);
    document.addEventListener("mouseup", setSelectedBlocks);
  };
  const moveSelectedBlocks = (e) => {
    const { clientX: moveX, clientY: moveY } = e;
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
  };

  return { blcokMousedown, clearMousedown };
}
