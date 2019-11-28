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
    return {
      profileItems: [
        { title: "Profile", url: "/profile", showWhen: "loggedIn" },
        { title: "Settings", url: "/settings", showWhen: "always" },
        { title: "About", url: "about", showWhen: "always" }
      ],
      profileItemsLogin: {
        logout: { title: "Logout", url: "#", click: "modal" },
        login: { title: "Login", url: "#", click: "modal" },
        register: { title: "Register", url: "#", click: "modal" }
      },
      modalItems: ["Logout", "Login", "Register"]
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: state => state.user.meta.isLoggedIn
    }),
    filteredProfileItems() {
      const { isLoggedIn, token } = this.$store.getters;
      const { logout, login, register } = this.profileItemsLogin;

      return [
        ...this.profileItems.filter(item => {
          if (item.showWhen === "loggedIn" && !isLoggedIn) {
            return;
          }
          return item;
        }),

        (() => {
          if (isLoggedIn) {
            return logout;
          } else {
            return token ? login : register;
          }
        })()
      ];
    }
  },
  mounted() {
    console.log(this.$store.getters.isLoggedIn);
  }
};
</script>

<style scoped lang="scss">
.nav {
  padding: 0 3% 0 3%;

  &__logo {
    cursor: pointer;
  }

  &__icon {
    border-color: whitesmoke;
    border-width: 2px;
    border-style: solid;

    &--middle {
      margin: 0 1rem 0 1rem;
    }
  }
}
</style>
