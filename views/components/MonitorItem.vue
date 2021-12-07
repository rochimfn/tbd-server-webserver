<template>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button
        :class="{ collapsed: node.expand }"
        class="accordion-button"
        type="button"
        @click="toogleExpand(node._id)"
      >
        {{ node.name }} - ({{ node.host }}:{{ node.port }})
      </button>
    </h2>
    <div class="accordion-collapse collapse" :class="{ show: node.expand }">
      <div class="accordion-body">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">waktu</th>
              <th scope="col">database</th>
              <th scope="col">tipe</th>
              <th scope="col">filename</th>
              <th scope="col">pindah</th>
              <th scope="col">restore</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in node.logs" :key="log._id">
              <td>{{ new Date(log.created_at).toString() }}</td>
              <td>{{ log.database }}</td>
              <td>{{ log.type }}</td>
              <td>{{ log.filename }}</td>
              <td>{{ log.is_move }}</td>
              <td>{{ log.is_restore }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["node", "toogleExpand"],
};
</script>