import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"

import users from "./users";
import items from "./items";
import alerts from "./alerts";
import search from "./search";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    alerts,
    items,
    search,
    users
  },
  plugins: [createPersistedState()]
});
