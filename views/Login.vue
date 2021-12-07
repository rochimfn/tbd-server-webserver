<template>
  <container>
    <div class="card mt-3 w-50 mx-auto">
      <div class="card-header">Anda harus masuk dulu</div>
      <div class="card-body p-3">
        <h5 class="card-title">Login</h5>
        <form>
          <div class="mb-3 row">
            <label for="email" class="col-sm-2 form-label">Email</label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                @keyup="changed"
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
                v-model="password"
                @keyup="changed"
                placeholder="masukkan password"
              />
            </div>
          </div>
          <p class="card-text text-danger" v-if="isFail">
            {{ msg }}
          </p>
          <button type="button" class="btn btn-primary" @click="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  </container>
</template>
<script>
import Container from "./Container.vue";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      isFail: false,
      msg: "kombinasi email dan password tidak benar!",
    };
  },
  methods: {
    submit() {
      if (!this.validate()) {
        return;
      }
      axios
        .post("/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((r) => {
          if (r.status === 200 && r.data.data) {
            if (r.data.data.full_name && r.data.data.token) {
              localStorage.setItem("full_name", r.data.data.full_name);
              localStorage.setItem("token", r.data.data.token);
              this.$router.push({ path: "/" });
            }
          }
        })
        .catch((e) => {
          console.error(e);
          this.isFail = true;
          this.msg = "kombinasi email dan password tidak benar!";
        });
    },
    changed() {
      this.isFail = false;
    },
    validate() {
      if (this.email.length === 0 || this.password.length === 0) {
        this.msg = "email dan password tidak boleh kosong!";
        this.isFail = true;
      } else if (!this.email.includes("@")) {
        this.msg = "pastikan email valid!";
        this.isFail = true;
      } else {
        return true;
      }
      return false;
    },
  },
  mounted() {
    localStorage.removeItem("full_name");
    localStorage.removeItem("token");
  },
  components: {
    container: Container,
  },
};
</script>