<template>
  <v-app-bar app dark class="nav">
    <router-link to="/" tag="h1" class="nav__logo">ShareStuff</router-link>
    <v-spacer></v-spacer>
    <UserBtns v-if="isLoggedIn"></UserBtns>
    <LoginRegisterBtns v-else></LoginRegisterBtns>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

import UserBtns from "./UserBtns";
import LoginRegisterBtns from "./LoginRegisterBtns";

export default {
  name: "Nav",
  components: {
    UserBtns,
    LoginRegisterBtns
  },
  data() {
    return {};
  },
  computed: mapState({ isLoggedIn: state => state.users.isLoggedIn })
};
</script>

<style scoped lang="scss">
.nav {
  padding: 0 3% 0 3%;

  &__logo {
    cursor: pointer;
  }
}
</style>
