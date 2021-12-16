<template>
  <container>
    <h1 class="py-2">Profile</h1>
    <div class="my-3">
      <h2>Ubah Profile</h2>
      <form>
        <div class="mb-3 row">
          <label for="full_name" class="col-sm-2 form-label"
            >Nama lengkap</label
          >
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="full_name"
              v-model="profile.full_name"
              placeholder="masukkan nama lengkap"
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
              v-model="profile.email"
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
              v-model="profile.password"
              placeholder="masukkan password"
            />
            <small class="form-text fw-bold">Kosongkan jika tidak ingin mengganti.</small>
          </div>
        </div>
        <p class="card-text text-danger" v-if="isError">{{ error }}</p>
        <button type="button" class="btn btn-success" @click="updateNode">
          Simpan
        </button>
        <button type="button" class="ms-1 btn btn-secondary" @click="resetState">
          Batal
        </button>
      </form>
    </div>
  </container>
</template>

<script>
import Container from './Container.vue'
import axios from 'axios'
export default {
  data() {
    return {
      profile: {},
      original: {},
      isError: false,
      error: undefined
    }
  },
  methods: {
    fetchData() {
      axios
        .get("/api/profile")
        .then((r) => {
          if (r.status === 200 && r.data.data) {
            if (r.data.data) {
              this.original = {
                ...r.data.data,
              }
              this.resetState()
            }
          }
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    resetState() {
      this.isError = false
      this.profile = {...this.original}
    },
    updateNode() {
      const data = { ...this.profile }
      axios
        .patch(`/api/profile/${this.profile._id}`, data)
        .then((r) => {
          if (r.status === 201 && r.data.data && r.data.status) {
            this.original = {
              ...r.data.data
            }
            this.isError = false
            alert(r.data.status)
            this.resetState()
          }
        })
        .catch((e) => {
          console.log(this.original)
          this.error = e.message
          if (e.response.data && e.response.data.error ) {
            this.error = e.response.data.error
          }
          this.isError = true
          console.error(e.message)
        })
    },
  },
  mounted() {
    this.fetchData()
  },
  components: {
    container: Container,
  },
}
</script>