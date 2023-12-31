import {
  defineComponent,
  inject,
  ref,
  onMounted,
  nextTick,
  watch,
  computed,
} from "vue";
import clone from "nanoclone";
import BlockResize from "./block-resize";

export default defineComponent({
  props: {
    modelValue: { type: Object },
    containerStyle: { width: Number, height: Number },
  },
  components: {
    BlockResize,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    let block = computed({
      get() {
        return props.modelValue;
      },
      set(newVal) {
        ctx.emit("update:modelValue", clone(newVal));
      },
    });

    watch(
      () => props.modelValue,
      async () => {
        const { offsetWidth: beforeWidth } = blockRef.value;
        await nextTick();
        const { offsetWidth: afterWidth, offsetHeight } = blockRef.value;
        if (beforeWidth !== afterWidth) {
          block.value.width = afterWidth;
          block.value.height = offsetHeight;
        }
      },
      { immediate: false }
    );

    const blockStyles = computed(() => ({
      top: `${block.value.top}px`,
      left: `${block.value.left}px`,
      zIndex: `${block.value.zIndex}`,
    }));
    const config = inject("config");

    const blockRef = ref(null);
    onMounted(() => {
      const { offsetWidth, offsetHeight } = blockRef.value;
      const { width: containerWidth, height: containerHeight } =
        props.containerStyle;
      block.value.width = offsetWidth;
      block.value.height = offsetHeight;

      // 新加入的 拖拽松手时需居中
      if (block.value.alignCenter) {
        block.value.alignCenter = false;
        block.value.left = Math.min(
          Math.max(0, block.value.left - offsetWidth / 2),
          containerWidth - offsetWidth
        );
        block.value.top = Math.min(
          Math.max(0, block.value.top - offsetHeight / 2),
          containerHeight - offsetHeight
        );
      }
    });
    return () => {
      const component = config.componentMap[block.value.type];
      const renderComponent = component?.render({
        size: block.value.hasResize
          ? { width: block.value.width, height: block.value.height }
          : {},
        props: block.value.props,
      });
      const { width, height } = component.resize || {};
      const updateBlock = (newVal) => {
        block.value = { ...newVal };
      };
      return (
        <div class="editor-block" style={blockStyles.value} ref={blockRef}>
          {renderComponent}
          {block.value.selected && (width || height) && (
            <BlockResize
              block={block}
              component={component}
              onSetBlock={updateBlock}
            ></BlockResize>
          )}
        </div>
      );
    };
  },
});
