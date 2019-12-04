import Vue from "vue";
import Vuex from "vuex";
import { cacheItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  uploadAvatar
} from "../apis/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meta: {
      isLoading: false
    },
    user: {
      _id: null,
      token: null,
      isLoggedIn: false,
      username: "",
      firstName: "",
      lastName: "",
      age: 0,
      location: "",
      avatar: "",
      karma: 0
    }
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.meta.isLoading = payload;
    },
    USER(state, payload) {
      state.user = { ...state.user, ...payload };
    },
    USER_LOGIN(state, payload) {
      state.user.isLoggedIn = payload;
    },
    USER_TOKEN(state, payload) {
      state.user.token = payload;
    },
    USER_AVATAR(state, payload) {
      state.user.avatar = payload;
    }
  },
  actions: {
    setUserLogin({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    setUserToken({ commit }, payload) {
      cacheItem("userToken", payload);
      commit("USER_TOKEN", payload);
    },
    async registerUser({ commit, dispatch }, payload) {
      commit("TOGGLE_LOADING", true);
      const response = await registerRequest(payload.formValues);
      const { token, user } = response;
      if (token) {
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
      if (user) {
        commit("USER", user);
        dispatch("uploadAvatar", payload.avatar);
        dispatch("setUserLogin", true);
      }
      commit("TOGGLE_LOADING", false);
    },
    async uploadAvatar({ commit }, payload) {
      console.log(commit);
      const avatar = await uploadAvatar(payload, this.state.user.token);
      if (avatar) {
        commit("USER_AVATAR", avatar);
      }
    },
    async verifyUniqueEmail({ commit }, payload) {
      commit("TOGGLE_LOADING", true);
      const isUnique = await uniqueEmailRequest(payload);
      commit("TOGGLE_LOADING", false);
      return isUnique;
    },
    async verifyUniqueUserName({ commit }, payload) {
      commit("TOGGLE_LOADING", true);
      const isUnique = await uniqueUsernameRequest(payload);
      commit("TOGGLE_LOADING", false);
      return isUnique;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.user.isLoggedIn;
    },
    token(state) {
      return state.user.token;
    }
  },
  modules: {}
});
