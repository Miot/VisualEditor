import { computed, defineComponent, inject, ref, onMounted, reactive } from "vue";

export default defineComponent({
  props: {
    data: { type: Object },
  },
  setup(props) {
    const block = reactive(props?.data);
    const blockStyles = computed(() => ({
      top: `${block.top}px`,
      left: `${block.left}px`,
      zIndex: `${block.zIndex}`,
    }));
    const config = inject("config");

    const blockRef = ref(null);
    const needAlignCenter = ref(props.data.alignCenter);
    onMounted(() => {
      //  拖拽松手时时居中
      const { offsetWidth, offsetHeight } = blockRef.value;
      if (needAlignCenter.value) {
        block.left -= offsetWidth / 2,
        block.top -= offsetHeight / 2,
        needAlignCenter.value = false
      }
      block.width = offsetWidth;
      block.height = offsetHeight;
    });
    return () => {
      const component = config.componentMap[props.data.type];
      const renderComponent = component?.render();

      return (
        <div class="editor-block" style={blockStyles.value} ref={blockRef}>
          {renderComponent}
        </div>
      );
    };
  },
});
