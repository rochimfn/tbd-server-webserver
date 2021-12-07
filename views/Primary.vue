<template>
  <container>
    <h1 class="py-2">Primary Node</h1>
    <div class="my-3" v-if="showForm">
      <h2>Ubah node</h2>
      <form>
        <div class="mb-3 row">
          <label for="host" class="col-sm-2 form-label">Hostname/ip</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="host"
              v-model="node.host"
              placeholder="masukkan host"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="port" class="col-sm-2 form-label">Port</label>
          <div class="col-sm-10">
            <input
              type="number"
              class="form-control"
              id="port"
              v-model="node.port"
              placeholder="masukkan port"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="database" class="col-sm-2 form-label"
            >Database (pisahkan dengan koma (,))</label
          >
          <div class="col-sm-10">
            <input
              type="database"
              class="form-control"
              id="database"
              v-model="node.database"
              placeholder="masukkan database"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="username" class="col-sm-2 form-label">Username DB</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="node.username"
              placeholder="masukkan username"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-2 form-label">Password DB</label>
          <div class="col-sm-10">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="node.password"
              placeholder="masukkan password"
            />
          </div>
        </div>
        <p class="card-text text-danger" v-if="isError">{{ error }}</p>
        <button type="button" class="btn btn-success" @click="updateNode">
          Simpan
        </button>
        <button type="button" class="ms-1 btn btn-secondary" @click="closeForm">
          Batal
        </button>
      </form>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">host</th>
          <th scope="col">port</th>
          <th scope="col">database</th>
          <th scope="col">username</th>
          <th scope="col">aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ node._id }}</td>
          <td>{{ node.host }}</td>
          <td>{{ node.port }}</td>
          <td>{{ node.database }}</td>
          <td>{{ node.username }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="editNode(node._id)"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </container>
</template>

<script>
import axios from "axios";
import Container from "./Container.vue";
export default {
  data() {
    return {
      originalVal: {
        _id: "",
        username: "",
        password: "",
        host: "",
        port: "",
        database: "",
      },
      node: {
        _id: "",
        username: "",
        password: "",
        host: "",
        port: "",
        database: "",
      },
      showForm: false,
      isError: false,
      error: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("/api/primary")
        .then((r) => {
          if (r.status === 200 && r.data.data) {
            if (r.data.data) {
              this.originalVal = {
                ...r.data.data,
                database: r.data.data.database.join(","),
              };
              this.cleanNodeState();
            }
          }
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    cleanNodeState() {
      this.node = this.originalVal;
    },
    closeForm() {
      this.showForm = false;
      this.cleanNodeState();
    },
    editNode(id) {
      this.showForm = true;
    },
    updateNode() {
      if (!this.validate()) {
        return;
      }
      const data = { ...this.node };
      data.database = this.node.database.split(",").filter((v) => v);
      axios
        .patch(`/api/primary/${this.node._id}`, data)
        .then((r) => {
          if (r.status === 201 && r.data.data && r.data.status) {
            this.originalVal = {
              ...r.data.data,
              database: r.data.data.database.join(","),
            };
            this.isError = false;
            this.closeForm();
            alert(r.data.status);
            this.cleanNodeState();
          }
        })
        .catch((e) => {
          this.isError = true;
          this.error = e.message;
          console.error(e.message);
        });
    },
    validate() {
      if (
        this.node._id.length === 0 ||
        this.node.username.length === 0 ||
        this.node.password.length === 0 ||
        this.node.host.length === 0 ||
        this.node.port == 0
      ) {
        this.error = "seluruh isian wajib diisi";
        this.isError = true;
      } else {
        return true;
      }
      return false;
    },
  },
  components: {
    container: Container,
  },
};
</script>