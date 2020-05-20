import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"

import alerts from "./alerts";
import items from "./items";
import notifications from "./notifications"
import search from "./search";
import transactions from "./transactions"
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    alerts,
    items,
    notifications,
    search,
    transactions,
    users
  },
  // TODO: Uncomment this and set it up
  // docs: https://www.npmjs.com/package/vuex-persistedstate
  // Using it to persist state after refresh but is causing some auth bugs related to user.me.token being stored in local storage 
  // plugins: [createPersistedState()]
});
