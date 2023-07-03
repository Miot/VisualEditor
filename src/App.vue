<template>
  <div class="app">
    <editorHost v-model="state"></editorHost>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import data from "./data.json";
import editorHost from "./packages/editor-host";
import { registerConfig as config } from "./utils/editor-config";

export default {
  components: {
    editorHost
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
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
}
</style>
