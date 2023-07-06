<template>
  <div class="app">
    <VisualEditor v-model="state" />
  </div>
</template>

<script>
import { ref, provide } from "vue";
import data from "./data.json";
import VisualEditor from "./components/visual-editor";
import { registerConfig as config } from "./utils/editor-config";

export default {
  components: {
    VisualEditor
  },
  setup() {
    const state = ref(data);
    provide('config', config);

    return {
      state
    }
  }
}
</script>

<style>
.app {
  font-family: "PingFang SC", Tahoma, Helvetica, Arial, "Hiragino Sans GB", "Microsoft YaHei", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
