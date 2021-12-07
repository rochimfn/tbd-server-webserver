<template>
  <container>
    <h1 class="py-2">Secondary Nodes</h1>
    <button class="btn btn-primary" @click="newNode">Tambah</button>
    <div class="my-3" v-if="showForm">
      <h2>{{ mode === "tambah" ? "Tambah baru" : "Ubah node" }}</h2>
      <form>
        <div class="mb-3 row">
          <label for="name" class="col-sm-2 form-label">Nama</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="node.name"
              placeholder="masukkan name"
            />
          </div>
        </div>
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
          <label for="email" class="col-sm-2 form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="node.email"
              placeholder="masukkan email"
            />
          </div>
        </div>
        <div class="mb-3 row">
          <label for="password" class="col-sm-2 form-label">Password</label>
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
        <button
          type="button"
          class="btn btn-success"
          @click="addNode"
          v-if="mode === 'tambah'"
        >
          Tambah
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="updateNode"
          v-if="mode === 'edit'"
        >
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
          <th scope="col">name</th>
          <th scope="col">host</th>
          <th scope="col">port</th>
          <th scope="col">email</th>
          <th scope="col">aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in secondary" :key="node._id">
          <td>{{ node._id }}</td>
          <td>{{ node.name }}</td>
          <td>{{ node.host }}</td>
          <td>{{ node.port }}</td>
          <td>{{ node.email }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="editNode(node._id)"
            >
              Edit
            </button>
            <button
              type="button"
              class="ms-1 btn btn-danger"
              @click="deleteNode(node._id)"
            >
              Hapus
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
      secondary: [],
      node: {
        _id: "",
        name: "",
        host: "",
        port: "",
        email: "",
        password: "",
      },
      mode: "tambah",
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
        .get("/api/secondary")
        .then((r) => {
          if (r.status === 200 && r.data.data) {
            if (r.data.data.length > 0) {
              this.secondary = r.data.data;
            }
          }
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    cleanNodeState() {
      this.node = {
        _id: "",
        name: "",
        host: "",
        port: "",
        email: "",
        password: "",
      };
    },
    newNode() {
      this.cleanNodeState();
      this.mode = "tambah";
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
    addNode() {
      if (!this.validate()) {
        return;
      }
      axios
        .post("/api/secondary", {
          name: this.node.name,
          host: this.node.host,
          port: Number(this.node.port),
          email: this.node.email,
          password: this.node.password,
        })
        .then((r) => {
          if (r.status === 200 && r.data.data && r.data.status) {
            this.isError = false;
            this.closeForm();
            this.secondary.push(r.data.data);
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
    editNode(id) {
      this.mode = "edit";
      this.node = { ...this.secondary.filter((n) => n._id === id)[0] };
      this.showForm = true;
    },
    updateNode() {
      if (!this.validate() || !this.validateId(this.node._id)) {
        return;
      }
      axios
        .patch(`/api/secondary/${this.node._id}`, {
          name: this.node.name,
          host: this.node.host,
          port: Number(this.node.port),
          email: this.node.email,
          password: this.node.password,
        })
        .then((r) => {
          if (r.status === 201 && r.data.data && r.data.status) {
            this.secondary = this.secondary.filter(
              (n) => n._id !== this.node._id
            );
            this.isError = false;
            this.closeForm();
            this.secondary.push(r.data.data);
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
    deleteNode(id) {
      if (!confirm("Anda yakin ingin menghapus?")) {
        return;
      }
      if (!this.validateId(id)) {
        return;
      }
      axios
        .delete(`/api/secondary/${id}`)
        .then((r) => {
          if (r.status === 200 && r.data.status) {
            this.secondary = this.secondary.filter((n) => n._id != id);
            alert(r.data.status);
          }
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    validate() {
      if (
        this.node.email.length === 0 ||
        this.node.password.length === 0 ||
        this.node.host.length === 0 ||
        this.node.name.length === 0 ||
        this.node.port == 0
      ) {
        this.error = "seluruh isian wajib diisi";
        this.isError = true;
      } else if (!this.node.email.includes("@")) {
        this.error = "pastikan email valid!";
        this.isError = true;
      } else {
        return true;
      }
      return false;
    },
    validateId(id) {
      if (id.length === 0) {
        this.error = "id tidak benar, silahkan ulangi langkah";
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