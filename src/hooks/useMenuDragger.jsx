import { events } from "../utils/events";

export function useMenuDragger(containerRef, data) {
  let curComponent = null;
  const dragenter = (e) => {
    e.dataTransfer.dropEffect = "move";
  };
  const dragover = (e) => {
    e.preventDefault();
  };
  const dragleave = (e) => {
    e.dataTransfer.dropEffect = "none";
  };
  const drop = (e) => {
    data.value.blocks.push({
      top: e.offsetY,
      left: e.offsetX,
      zIndex: 1,
      type: curComponent.type,
      alignCenter: true,
      props: curComponent.defaultOptions, // 默认选项配置
    });
  };
  const dragstart = (e, component) => {
    curComponent = component;
    const container = containerRef.value;
    container.addEventListener("dragenter", dragenter);
    container.addEventListener("dragover", dragover);
    container.addEventListener("dragleave", dragleave);
    container.addEventListener("drop", drop);
    events.emit("start");
  };
  const dragend = () => {
    const container = containerRef.value;
    container.removeEventListener("dragenter", dragenter);
    container.removeEventListener("dragover", dragover);
    container.removeEventListener("dragleave", dragleave);
    container.removeEventListener("drop", drop);
    events.emit("end");
  };

  return { dragstart, dragend };
}
