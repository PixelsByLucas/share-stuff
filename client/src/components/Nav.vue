<template>
  <v-app-bar app dark class="nav">
    <router-link to="/" tag="h1" class="nav__logo">ShareStuff</router-link>
    <v-spacer></v-spacer>
    <v-btn icon class="nav__icon">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="nav__icon nav__icon--middle" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <!-- === PROFILE DROPDOWN === -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon class="nav__icon" v-on="on">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in profileNavItems"
          v-bind:key="index"
          :to="item.url"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      profileNavItems: [
        { title: "Profile", url: "/profile" },
        { title: "Settings", url: "/settings" },
        { title: "About", url: "about" },
        { title: "Logout", url: this.$route }
      ]
    };
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
      margin: 0 1% 0 1%;
    }
  }
}
</style>
