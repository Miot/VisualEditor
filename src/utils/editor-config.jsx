function createEditotConfig() {
  const componentList = [];
  const componentMap = {};

  return {
    componentList,
    componentMap,
    register: (component) => {
      componentList.push(component);
      componentMap[component.type] = component;
    },
  };
}

export const registerConfig = createEditotConfig();
const createInputProp = (label) => ({ type: "input", label });
const creteSelectProp = (label, options) => ({
  type: "select",
  label,
  options,
});
registerConfig.register({
  label: "文本",
  preview: () => "预览文本",
  render: ({ props }) => (
    <span style={{ fontSize: props.size, userSelect: "none" }}>
      {props.text || "渲染文本"}
    </span>
  ),
  type: "text",
  props: {
    text: createInputProp("输入文本内容"),
    size: creteSelectProp("字体大小", [
      { label: "14px", value: "14px" },
      { label: "16px", value: "16px" },
      { label: "18px", value: "18px" },
    ]),
  },
  defaultOptions: {
    text: "渲染文本",
    size: "16px"
  }
});
registerConfig.register({
  label: "按钮",
  resize: {
    width: true,
    height: true,
  },
  preview: () => <button>预览按钮</button>,
  render: ({ props, size }) => (
    <button
      class={`button-${props.type} button-${props.size}`}
      style={{ height: size.height + "px", width: size.width + "px" }}
    >
      {props.text || "渲染按钮"}
    </button>
  ),
  type: "button",
  props: {
    text: createInputProp("按钮文本"),
    type: creteSelectProp("按钮类型", [
      { label: "默认", value: "base" },
      { label: "成功", value: "success" },
      { label: "警告", value: "warning" },
      { label: "错误", value: "error" },
    ]),
    size: creteSelectProp("按钮大小", [
      { label: "默认", value: "base" },
      { label: "小", value: "small" },
      { label: "大", value: "large" },
    ]),
  },
  defaultOptions: {
    text: "渲染按钮",
    type: "base",
    size: "base"
  }
});
registerConfig.register({
  label: "输入框",
  resize: {
    width: true,
  },
  preview: () => <input placeholder="预览输入框"></input>,
  render: ({ props, size }) => (
    <input
      placeholder="渲染输入框"
      v-model={props.text}
      style={{ width: size.width + "px" }}
    ></input>
  ),
  type: "input",
  props: {
    text: createInputProp("输入框文本"),
  },
  defaultOptions: {
    text: "",
  }
});
