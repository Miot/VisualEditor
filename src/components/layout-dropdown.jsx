import {
  defineComponent,
  createVNode,
  reactive,
  render,
  computed,
  ref,
} from "vue";
import "./dropdown.less";

const DropdownComponent = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props, ctx) {
    const state = reactive({
      option: props.option,
      isShow: false,
      left: 0,
      top: 0,
    });
    const styles = computed(() => ({
      top: state.top + "px",
      left: state.left + "px",
    }));
    const dropdownRef = ref(null);
    const hide = () => {
      state.isShow = false;
      document.removeEventListener("mousedown", onMousedown, true);
    };
    const onMousedown = (e) => {
      if (!dropdownRef.value.contains(e.target)) {
        hide();
      }
    };

    ctx.expose({
      showDropdown(option) {
        state.option = option;
        state.isShow = true;
        const { clientX, clientY } = option.event;
        state.top = clientY;
        state.left = clientX;
        document.addEventListener("mousedown", onMousedown, true);
      },
      hide,
    });

    return () => {
      return (
        <div
          v-show={state.isShow}
          class="dropdown"
          style={styles.value}
          ref={dropdownRef}
        >
          {state.option.content()}
        </div>
      );
    };
  },
});

let vnode;
export function $dropdown(option) {
  if (!vnode) {
    let el = document.createElement("div");
    vnode = createVNode(DropdownComponent, { option });
    document.body.appendChild((render(vnode, el), el));
  }

  const { showDropdown } = vnode.component.exposed;
  showDropdown(option);
}

export const DropdownItem = defineComponent({
  props: {
    label: String,
  },
  setup(props) {
    return () => (
      <div class="dropdown-item" onClick={vnode.component.exposed.hide}>
        <span>{props.label}</span>
      </div>
    );
  },
});
