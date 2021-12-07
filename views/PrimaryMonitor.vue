<template>
  <container>
    <h1 class="py-2">Primary Monitor</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">database</th>
          <th scope="col">direktori</th>
          <th scope="col">nama file</th>
          <th scope="col">tipe</th>
          <th scope="col">telah diupload ke</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in monitor" :key="log._id">
          <td>{{ log._id }}</td>
          <td>{{ log.database }}</td>
          <td>{{ log.directory }}</td>
          <td>{{ log.fileName }}</td>
          <td>{{ log.type }}</td>
          <td>{{ log.uploaded.join() }}</td>
        </tr>
      </tbody>
    </table>
  </container>
</template>

<script>
import Container from "./Container.vue";
import axios from "axios";
export default {
  data() {
    return {
      monitor: {},
    };
  },
  mounted() {
    axios
      .get("/api/log")
      .then((r) => {
        if (r.status === 200 && r.data.data) {
          if (r.data.data.length > 0) {
            this.monitor = r.data.data;
          }
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  },
  components: {
    container: Container,
  },
};
</script>