import { computed, defineComponent, inject, ref } from "vue";
import "./editor.less";
import EditorBlock from "./editor-block";
import clone from "nanoclone";
import { useMenuDragger } from "../hooks/useMenuDragger";
import { useBlockDragger } from "../hooks/useBlockDragger";
import { useCommand } from "@/hooks/useCommand";
import { $dialog } from "./layout-dialog";
import { $dropdown, DropdownItem } from "./layout-dropdown";
import EditorOperator from "./editor-operator";

export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  emits: ["update:modelValue"],
  components: {
    EditorBlock,
    DropdownItem,
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
    const {
      blcokMousedown,
      clearFocus,
      lastSelectedBlock,
      markLine,
      selectedStatus,
    } = useBlockDragger(data, previewing);
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
    // 右键菜单
    const onContextmenu = (e, block) => {
      e.preventDefault();
      $dropdown({
        event: e,
        content: () => {
          return (
            <>
              <DropdownItem
                label="删除"
                onClick={() => commands.del()}
              ></DropdownItem>
              <DropdownItem
                label="置顶"
                onClick={() => commands.placeTop()}
              ></DropdownItem>
              <DropdownItem
                label="置底"
                onClick={() => commands.placeBottom()}
              ></DropdownItem>
              <DropdownItem
                label="查看JSON"
                onClick={() => {
                  $dialog({
                    title: "查看节点JSON数据",
                    content: JSON.stringify(block),
                  });
                }}
              ></DropdownItem>
              <DropdownItem
                label="替换"
                onClick={() => {
                  $dialog({
                    title: "通过JSON替换节点",
                    hasFooter: true,
                    onConfirm(json) {
                      commands.updateBlock(block, JSON.parse(json));
                    },
                  });
                }}
              ></DropdownItem>
            </>
          );
        },
      });
    };

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
          <EditorOperator
            multipleSelected={selectedStatus.value.selected.length > 1}
            block={lastSelectedBlock.value}
            data={data.value}
            updateContainer={commands.updateContainer}
            updateBlock={commands.updateBlock}
          ></EditorOperator>
        </div>
        <div class="editor-container">
          <div class="editor-canvas">
            <div
              class="editor-canvas-content"
              style={containerStyle.value}
              ref={containerRef}
              onMousedown={clearFocus}
              v-show={!previewing.value}
            >
              {data.value.blocks.map((block, index) => (
                <EditorBlock
                  class={block.selected ? "editor-block-selected" : ""}
                  v-model={block}
                  onMousedown={(e) => blcokMousedown(e, block, index)}
                  onContextmenu={(e) => onContextmenu(e, block)}
                />
              ))}

              {markLine.x !== null && (
                <div class="line-x" style={{ left: markLine.x + "px" }}></div>
              )}
              {markLine.y !== null && (
                <div class="line-y" style={{ top: markLine.y + "px" }}></div>
              )}
            </div>

            {previewing.value && (
              <div class="editor-canvas-content" style={containerStyle.value}>
                {data.value.blocks.map((block) => (
                  <EditorBlock class="editor-block-preview" v-model={block} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
