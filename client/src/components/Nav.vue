<template>
  <v-app-bar app dark class="nav">
    <v-container>
      <v-row align="center">
        <router-link to="/" tag="h1" class="nav__logo">ShareStuff</router-link>
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <v-row no-gutters>
            <v-col cols="12" md="8">
              <v-text-field
                class="nav__input"
                hide-details
                placeholder="Search Stuff"
                v-model="formValues.searchTerm"
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                class="nav__select"
                :items="ITEM_CATEGORIES"
                v-model="formValues.searchCategory"
                outlined
                hide-details
                dense
              ></v-select>
            </v-col>
            <h3></h3>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <div>
          <v-icon v-text="'$vuetify.icons.karma'"></v-icon>
          <span>{{ karma }}</span>
        </div>
        <v-spacer></v-spacer>
        <UserBtns v-if="isLoggedIn"></UserBtns>
        <LoginRegisterBtns v-else></LoginRegisterBtns>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import { ITEM_CATEGORIES } from "../utils/constants";
import debounce from "../utils/debounce";

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
      ITEM_CATEGORIES,
      formValues: {
        searchTerm: "",
        searchCategory: "All"
      }
    };
  },
  computed: mapState({
    isLoggedIn: state => state.users.me.isLoggedIn,
    karma: state => state.users.me.karma
  }),
  watch: {
    "formValues.searchTerm": function(term) {
      this.debouncedDispatch("setTerm", term);
    },
    "formValues.searchCategory": function(category) {
      this.$store.dispatch("setCategory", category);
    }
  },
  created() {
    this.debouncedDispatch = debounce(this.$store.dispatch, 1000);
  }
};
</script>

<style scoped lang="scss">
.nav {
  padding: 0 3% 0 3%;
  &__logo {
    cursor: pointer;
    font-family: "Knewave", cursive;
  }
  &__input {
    border-radius: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &__select {
    border-radius: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
