import Vue from "vue";
import Vuex from "vuex";
import { cacheItem } from "../utils/cacheHandler";

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
    },
    USERNAME(state, payload) {
      state.user.userName = payload;
    },
    FIRST_NAME(state, payload) {
      state.user.firstName = payload;
    },
    LAST_NAME(state, payload) {
      state.user.lastName = payload;
    },
    USER_AGE(state, payload) {
      state.user.age = payload;
    },
    USER_LOCATION(state, payload) {
      state.user.location = payload;
    },
    USER_AVATAR(state, payload) {
      state.user.avatar = payload;
    },
    USER_KARMA(state, payload) {
      state.user.karma = payload;
    }
  },
  actions: {
    setUserLogin({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    setUserToken({ commit }, payload) {
      cacheItem(payload);
      commit("USER_TOKEN", payload);
    },
    setUser({ commit }, payload) {
      // === STOPPED WORK HERE ===
      console.log(commit, payload);
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
