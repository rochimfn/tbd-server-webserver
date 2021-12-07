<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: teal"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">RC Custom Log shipping</a>
      <button class="navbar-toggler" type="button" @click="toogleMenu()">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        v-bind:class="{ show: menu }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-for="route in routes" :key="route.path">
            <router-link
              :to="route.path"
              class="nav-link"
              :class="{ 'text-white': isActive(route.name) }"
              >{{ route.name }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { routes } from "./routes.js";
export default {
  data() {
    return {
      routes: [],
      menu: false,
    };
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.routes = routes.filter((r) => r.name.toLowerCase() != "login");
    } else {
      this.routes = routes.filter((r) => r.name.toLowerCase() === "login");
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    toogleMenu() {
      this.menu = !this.menu;
    },
    isActive(name) {
      return name == this.currentRouteName;
    },
  },
};
</script>