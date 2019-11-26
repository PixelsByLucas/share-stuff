<template>
  <v-app>
    <Nav />
    <v-content>
      <router-view class="view"></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import router from "./router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default {
  name: "App",
  router,
  components: {
    Nav,
    Footer
  }
};
</script>

<style scoped lang="scss"></style>
