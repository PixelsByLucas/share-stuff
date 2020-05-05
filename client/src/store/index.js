import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"

import alerts from "./alerts";
import items from "./items";
import search from "./search";
import transactions from "./transactions"
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    alerts,
    items,
    search,
    transactions,
    users
  },
  plugins: [createPersistedState()]
});
