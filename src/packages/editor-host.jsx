import { computed, defineComponent, inject, ref } from "vue";
import "./editor-host.less";
import editorBlock from "./editor-block";
import prewviewItem from "./preview-item";
import deepcopy from "deepcopy";
import { useMenuDragger } from "../hooks/useMenuDragger";
import { useBlockDragger } from "../hooks/useBlockDragger";

export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  emits: ["update:modelValue"],
  components: {
    editorBlock,
    prewviewItem,
  },
  setup(props, ctx) {
    const config = inject("config");
    const data = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        ctx.emit("update:modelValue", deepcopy(newVal));
      },
    });
    const containerStyle = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));

    // 从左侧拖拽组件到画布
    const containerRef = ref(null);
    const { dragstart, dragend } = useMenuDragger(containerRef, data);
    // 拖拽选中画布中的组件
    const { blcokMousedown, clearMousedown } = useBlockDragger(data);
    
    return () => (
      <div class="editor">
        <div class="editor-left">
          {config.componentList.map((component) => (
            <div
              class="preview-item"
              draggable
              ondragstart={(e) => dragstart(e, component)}
              ondragend={(e) => dragend(e, component)}
            >
              <span class="name">{component.label}</span>
              <div class="component">{component.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor-top">菜单</div>
        <div class="editor-right">右侧</div>
        <div class="editor-container">
          <div class="editor-canvas">
            <div
              class="editor-canvas-content"
              style={containerStyle.value}
              ref={containerRef}
              onmousedown={clearMousedown}
            >
              {data.value.blocks.map((block) => (
                <editorBlock
                  class={block.selected ? "editor-block-selected" : ""}
                  data={block}
                  onmousedown={(e) => blcokMousedown(e, block)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
