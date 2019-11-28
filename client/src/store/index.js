import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      meta: {
        isLoggedIn: false,
        token: false
      },
      userName: "",
      firstName: "",
      lastName: "",
      age: 0,
      location: "",
      avatar: "",
      karma: 0
    }
  },
  mutations: {
    USER_LOGIN(state, payload) {
      state.user.meta.isLoggedIn = payload;
    },
    USER_TOKEN(state, payload) {
      state.user.meta.token = [...state.user.meta.token, payload];
    }
  },
  actions: {
    setUserLogin({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    setUserToken({ commit }, payload) {
      commit("USER_TOKEN", payload);
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user.meta.isLoggedIn;
    },
    token(state) {
      return state.user.meta.token;
    }
  },
  modules: {}
});
