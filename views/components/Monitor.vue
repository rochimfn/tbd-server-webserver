<template>
  <div class="accordion">
    <monitor-item
      v-for="node in data"
      :key="node._id"
      :node="node"
      :toogleExpand="toogleExpand"
    ></monitor-item>
  </div>
</template>

<script>
import MonitorItem from "./MonitorItem.vue";
export default {
  props: ["data", "toogleExpand"],
  components: {
    "monitor-item": MonitorItem,
  },
};
</script>