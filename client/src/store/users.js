import { cacheItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  uploadAvatar,
  readAvatar,
  getUserFromToken
} from "../apis/users";

export default {
  state: {
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
  },
  mutations: {
    USER(state, payload) {
      state = Object.assign(state, payload);
    },
    USER_LOGIN(state, payload) {
      state.isLoggedIn = payload;
    },
    USER_TOKEN(state, payload) {
      state.token = payload;
    },
    USER_AVATAR(state, payload) {
      state.avatar = payload;
    }
  },
  actions: {
    async loginFromToken({ commit, state }, payload) {
      const user = await getUserFromToken(payload);
      if (user) {
        commit("USER_LOGIN", true);
        commit("USER_TOKEN", payload);
        commit("USER", user);

        const avatar = await readAvatar(state._id);

        if (avatar) {
          commit("USER_AVATAR", avatar);
        }
      }
    },
    setUserLogin({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    async registerUser({ commit, dispatch }, payload) {
      // commit("TOGGLE_LOADING", true);
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
      // commit("TOGGLE_LOADING", false);
    },
    async uploadAvatar({ commit, state }, payload) {
      const avatar = await uploadAvatar(payload, state.token);
      if (avatar) {
        commit("USER_AVATAR", avatar);
      }
    },
    async verifyUniqueEmail(context, payload) {
      // commit("TOGGLE_LOADING", true);
      const isUnique = await uniqueEmailRequest(payload);
      // commit("TOGGLE_LOADING", false);
      return isUnique;
    },
    async verifyUniqueUserName(context, payload) {
      // commit("TOGGLE_LOADING", true);
      const isUnique = await uniqueUsernameRequest(payload);
      // commit("TOGGLE_LOADING", false);
      return isUnique;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    token(state) {
      return state.token;
    }
  }
};
