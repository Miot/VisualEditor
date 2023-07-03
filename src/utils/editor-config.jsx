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
registerConfig.register({
  label: "文本",
  preview: () => "预览文本",
  render: () => "渲染文本",
  type: "text",
});
registerConfig.register({
  label: "按钮",
  preview: () => <button>预览按钮</button>,
  render: () => <button>渲染按钮</button>,
  type: "button",
});
registerConfig.register({
  label: "输入框",
  preview: () => <input placeholder="预览输入框"></input>,
  render: () => <input placeholder="渲染输入框"></input>,
  type: "input",
});
