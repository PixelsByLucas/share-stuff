<template>
  <v-app>
    <Nav />
    <v-content>
      <v-progress-circular v-if="fetchingUser" class="loading" indeterminate></v-progress-circular>
      <router-view v-else></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import { checkForCached } from "./utils/cacheHandler";
import Footer from "./components/Footer";
import { mapState } from "vuex";
import Nav from "./components/Nav";
import router from "./router";

export default {
  name: "App",
  router,
  components: {
    Nav,
    Footer
  },
  computed: mapState({
    fetchingUser: state => state.users.fetchingUser
  }),
  created() {
    const token = checkForCached("user_token");
    if (token) {
      this.$store.dispatch("loginFromToken", token);
    }
  }
};
</script>

<style scoped lang="scss">
.loading {
  margin: 0 auto;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
</style>
