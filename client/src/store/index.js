import Vue from "vue";
import Vuex from "vuex";

import users from "./users";
import alerts from "./alerts";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    users,
    alerts
  }
});
