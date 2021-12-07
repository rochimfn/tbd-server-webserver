<template>
  <custom-nav></custom-nav>
  <div class="container-fluid py-3">
    <slot></slot>
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    "custom-nav": Nav,
  },
};
</script>
