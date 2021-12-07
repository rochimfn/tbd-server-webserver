<template>
  <container>
    <h1 class="py-2">Secondary Monitor</h1>
    <monitor :data="monitor" :toogleExpand="toogleExpand"></monitor>
  </container>
</template>

<script>
import Monitor from "./components/Monitor.vue";
import Container from "./Container.vue";
import axios from "axios";
export default {
  data() {
    return {
      monitor: [],
    };
  },
  mounted() {
    axios
      .get("/api/monitor")
      .then((r) => {
        if (r.status === 200 && r.data.data) {
          if (r.data.data.length > 0) {
            this.monitor = r.data.data.map((d) => ({ ...d, expand: false }));
          }
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  },
  methods: {
    toogleExpand(_id) {
      this.monitor = this.monitor.map((d) => {
        if (d._id === _id) {
          const expand = !d.expand;
          return { ...d, expand };
        }
        return d;
      });
    },
  },
  components: {
    container: Container,
    monitor: Monitor,
  },
};
</script>