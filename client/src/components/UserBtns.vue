<template>
  <!-- === NEEDS REFACTOR === -->
  <div>
    <v-btn icon class="nav__icon">
      <v-icon>mdi-message-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="nav__icon nav__icon--middle" to="/notifications">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon class="nav__icon" v-on="on">
          <v-avatar>
            <img
              v-if="_id"
              :src="`${SERVER_URL}/users/${_id}/avatar`"
              class="nav__img"
            />
            <v-icon v-else>mdi-account-outline</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in profileItems"
          v-bind:key="`profileItem:${index}`"
          v-on:click="clickHandler"
          :to="item.url"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SERVER_URL } from "../apis/users";
export default {
  name: "UserBtns",
  data() {
    return {
      profileItems: [
        {
          title: "Profile",
          url: `/profile/${this.$store.state.users.me.username}`
        },
        { title: "Settings", url: "/settings" },
        { title: "About", url: "/about" },
        { title: "Logout", url: "" }
      ],
      SERVER_URL
    };
  },
  computed: mapState({
    _id: state => state.users.me._id
  }),
  methods: {
    clickHandler(e) {
      if (e.target.textContent === "Logout") {
        this.$router.push("/");
        this.$store.dispatch("logout");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  &__icon,
  &__img {
    border-color: whitesmoke;
    border-width: 2px;
    border-style: solid;

    &--middle {
      margin: 0 1rem 0 1rem;
    }
  }
  &__img {
    padding: 1.5px;
  }
}
</style>
