import { createVNode, defineComponent, reactive, render } from "vue";
import "./dialog.less";

const DialogComponent = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props, ctx) {
    const state = reactive({
      isShow: false,
      option: props.option,
    });
    ctx.expose({
      showDialog(option) {
        state.option = option;
        state.isShow = true;
      },
    });
    const close = () => {
      state.isShow = false;
    };
    const confirm = () => {
      try {
        state.option.onConfirm(state.option.content);
        close();
      } catch (error) {
        alert("⚠️输入内容为非法JSON⚠️");
      }
    };
    return () => {
      return (
        <div v-show={state.isShow} class="modal">
          <div class="dialog-modal">
            <header class="header-modal">
              <h2 class="tit">{state.option.title}</h2>
              <span class="close" onClick={close}>
                <a href="#" class="bt"></a>
              </span>
            </header>
            <div class="content-modal">
              <textarea type="text" v-model={state.option.content} />
            </div>
            <footer class="footer-modal" v-show={state.option.hasFooter}>
              <button onClick={confirm}>提交</button>
            </footer>
          </div>
        </div>
      );
    };
  },
});

let vnode;
export function $dialog(option) {
  if (!vnode) {
    let el = document.createElement("div");
    vnode = createVNode(DialogComponent, { option });
    document.body.appendChild((render(vnode, el), el));
  }

  const { showDialog } = vnode.component.exposed;
  showDialog(option);
}
