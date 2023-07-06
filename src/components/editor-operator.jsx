import { defineComponent, inject, reactive, watch } from "vue";
import "./operator.less";
import clone from "nanoclone";

export default defineComponent({
  props: {
    multipleSelected: { type: Boolean },
    block: { type: Object },
    data: { type: Object },
    updateContainer: { type: Function },
    updateBlock: { type: Function },
  },

  setup(props, ctx) {
    const config = inject("config");
    const state = reactive({
      editData: {},
    });
    const reset = () => {
      state.editData = clone(props.block ? props.block : props.data.container);
    };
    const apply = () => {
      if (props.block) {
        props.updateBlock(props.block, state.editData);
      } else {
        props.updateContainer({ ...props.data, container: state.editData });
      }
    };
    watch(() => props.block, reset, { immediate: true });
    return () => {
      let content = [];
      if (!props.block) {
        content.push(
          <>
            <div class="form-item">
              <p class="form-lable">容器宽度</p>
              <input
                type="number"
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model={state.editData.width}
                key="width-input"
              />{" "}
              px
            </div>
            <div class="form-item">
              <p class="form-lable">容器高度</p>
              <input
                type="number"
                oninput="value=value.replace(/[^\d]/g,'')"
                v-model={state.editData.height}
                key="height-input"
              />{" "}
              px
            </div>
          </>
        );
      } else {
        const component = config.componentMap[props.block.type];
        if (component && component.props) {
          content.push(
            Object.entries(component.props).map(([propName, propConfig]) => {
              return (
                <div class="form-item">
                  <p class="form-lable">{propConfig.label}</p>
                  {{
                    input: () => (
                      <input
                        type="text"
                        key="text-input"
                        v-model={state.editData.props[propName]}
                      ></input>
                    ),
                    select: () => (
                      <div class="form-selector">
                        <select
                          id="select"
                          v-model={state.editData.props[propName]}
                        >
                          {propConfig.options.map((each) => (
                            <option
                              value={each.value}
                              selected={
                                each.value === state.editData.props[propName]
                              }
                            >
                              {each.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ),
                  }[propConfig.type]()}
                </div>
              );
            })
          );
        }
        if (component && component.model) {
          content.push(
            Object.entries(component.model).map(([modelName, label]) => {
              return (
                <div class="form-item">
                  <p class="form-lable">{label}</p>
                  <input
                    type="text"
                    v-model={state.editData.model[modelName]}
                  ></input>
                </div>
              );
            })
          );
        }
      }

      if (props.multipleSelected) return <></>;
      return (
        <>
          {content}
          <button onClick={() => reset()}>重置</button>
          <button onClick={() => apply()}>确定</button>
        </>
      );
    };
  },
});
