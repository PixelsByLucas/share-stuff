import Vue from "vue";
import Vuex from "vuex";

import users from "./users";
import items from "./items";
import alerts from "./alerts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    users,
    items,
    alerts
  }
});
