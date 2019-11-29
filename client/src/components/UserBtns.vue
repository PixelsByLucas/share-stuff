<template>
  <!-- === NEEDS REFACTOR === -->
  <div>
    <v-btn icon class="nav__icon">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="nav__icon nav__icon--middle" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn icon class="nav__icon" v-on="on">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in filteredProfileItems"
          v-bind:key="index"
          :to="item.url"
        >
          <v-list-item-title v-if="modalItems.includes(item.title)">{{
            item.title
          }}</v-list-item-title>
          <v-list-item-title v-else>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "UserBtns",
  data() {
    return {
      // profileItems: [
      //   { title: "Profile", url: "/profile", showWhen: "loggedIn" },
      //   { title: "Settings", url: "/settings", showWhen: "always" },
      //   { title: "About", url: "about", showWhen: "always" }
      // ],
      // profileItemsLogin: {
      //   logout: { title: "Logout", url: "#", click: "modal" },
      //   login: { title: "Login", url: "#", click: "modal" },
      //   register: { title: "Register", url: "#", click: "modal" }
      // },
      // modalItems: ["Logout", "Login", "Register"]
    };
  },
  computed() {
    // filteredProfileItems() {
    //   const { isLoggedIn, token } = this.$store.getters;
    //   const { logout, login, register } = this.profileItemsLogin;
    //   return [
    //     ...this.profileItems.filter(item => {
    //       if (item.showWhen === "loggedIn" && !isLoggedIn) {
    //         return;
    //       }
    //       return item;
    //     }),
    //     (() => {
    //       if (isLoggedIn) {
    //         return logout;
    //       } else {
    //         return token ? login : register;
    //       }
    //     })()
    //   ];
    // }
  }
};
</script>

<style lang="scss" scoped>
.nav {
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
