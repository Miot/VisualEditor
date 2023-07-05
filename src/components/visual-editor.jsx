import { computed, defineComponent, inject, ref } from "vue";
import "./editor.less";
import EditorBlock from "./editor-block";
import clone from "nanoclone";
import { useMenuDragger } from "../hooks/useMenuDragger";
import { useBlockDragger } from "../hooks/useBlockDragger";
import { useCommand } from "@/hooks/useCommand";
import { $dialog } from "./layout-dialog";

export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  emits: ["update:modelValue"],
  components: {
    EditorBlock,
  },
  setup(props, ctx) {
    const config = inject("config");
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        ctx.emit("update:modelValue", clone(newVal));
      },
    });
    const containerStyle = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    const previewing = ref(false); // 预览/编辑状态切换

    // 从左侧拖拽组件到画布
    const containerRef = ref(null);
    const { dragstart, dragend } = useMenuDragger(containerRef, data);
    // 拖拽选中画布中的组件
    const { blcokMousedown, clearFocus, markLine, selectedStatus } =
      useBlockDragger(data, previewing);
    // 顶部菜单
    const { commands } = useCommand(data, selectedStatus);
    const buttons = [
      { label: "上一步", handler: () => commands.undo() },
      { label: "撤销上一步", handler: () => commands.redo() },
      {
        label: "删除",
        handler: () => commands.del(),
      },
      {
        label: "置顶",
        handler: () => commands.placeTop(),
      },
      {
        label: "置底",
        handler: () => commands.placeBottom(),
      },
      {
        label: "导入JSON",
        handler: () => {
          $dialog({
            title: "导出完成",
            hasFooter: true,
            onConfirm(json) {
              commands.updateContainer(JSON.parse(json));
            },
          });
        },
      },
      {
        label: "导出JSON",
        handler: () => {
          $dialog({
            title: "导出完成",
            content: JSON.stringify(data.value),
          });
        },
      },
      {
        label: () => (previewing.value ? "编辑" : "预览"),
        steady: true,
        handler: () => {
          previewing.value = !previewing.value;
          clearFocus();
        },
      },
    ];

    return () => (
      <div class="editor">
        <div class="editor-left" v-show={!previewing.value}>
          {config.componentList.map((component) => (
            <div
              class="preview-item"
              draggable
              onDragstart={(e) => dragstart(e, component)}
              onDragend={dragend}
            >
              <span class="name">{component.label}</span>
              <div class="component">{component.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor-top">
          {buttons.map((btn) => {
            return (
              <div
                v-show={!previewing.value || btn.steady}
                class="editor-top-button"
                onClick={btn.handler}
              >
                <span>
                  {typeof btn.label === "function" ? btn.label() : btn.label}
                </span>
              </div>
            );
          })}
        </div>
        <div class="editor-right" v-show={!previewing.value}>
          右侧
        </div>
        <div class="editor-container">
          <div class="editor-canvas">
            <div
              class="editor-canvas-content"
              style={containerStyle.value}
              ref={containerRef}
              onmousedown={clearFocus}
              v-show={!previewing.value}
            >
              {data.value.blocks.map((block, index) => (
                <EditorBlock
                  class={block.selected ? "editor-block-selected" : ""}
                  data={block}
                  onmousedown={(e) => blcokMousedown(e, block, index)}
                />
              ))}

              {markLine.x !== null && (
                <div class="line-x" style={{ left: markLine.x + "px" }}></div>
              )}
              {markLine.y !== null && (
                <div class="line-y" style={{ top: markLine.y + "px" }}></div>
              )}
            </div>

            <div
              class="editor-canvas-content"
              style={containerStyle.value}
              v-show={previewing.value}
            >
              {data.value.blocks.map((block, index) => (
                <EditorBlock class="editor-block-preview" data={block} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
