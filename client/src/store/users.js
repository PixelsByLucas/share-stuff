import { cacheItem, deleteCachedItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  // readAvatar,
  loginRequest,
  getUserFromToken,
  logoutRequest,
  uploadAvatarRequest
} from "../apis/users";

const EMPTY_USER = {
  _id: null,
  token: null,
  isLoggedIn: false,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  age: 0,
  location: "",
  avatar: "",
  karma: 0,
  rating: {
    up: 0,
    down: 0
  }
};

export default {
  // TODO: remove all avatar actions and mutations since we're rendering images by providing endpoint URL as src in img html tag
  state: {
    ...EMPTY_USER
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
    async logout({ state, commit }) {
      const LoggedOut = await logoutRequest(state.token);
      if (LoggedOut) {
        deleteCachedItem("user_token");
        commit("USER_LOGIN", true);
        commit("USER", EMPTY_USER);
      }
    },
    async loginFromToken({ commit }, payload) {
      const user = await getUserFromToken(payload);
      if (user) {
        commit("USER_LOGIN", true);
        commit("USER_TOKEN", payload);
        commit("USER", user);
      }
    },
    async loginWithEmail({ commit }, payload) {
      const { user, token } = await loginRequest(payload);
      if (user && token) {
        commit("USER", user);
        commit("USER_LOGIN", true);
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
    },
    setUserLogin({ commit }, payload) {
      commit("USER_LOGIN", payload);
    },
    async registerUser({ commit, dispatch }, payload) {
      const { token, user } = await registerRequest(payload.formValues);
      if (token) {
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
      if (user) {
        await uploadAvatarRequest(payload.avatar, token);
        commit("USER", user);
        dispatch("setUserLogin", true);
      }
    },
    async uploadAvatar({ state }, payload) {
      uploadAvatarRequest(payload, state.token);
    },
    async verifyUniqueEmail(context, payload) {
      const isUnique = await uniqueEmailRequest(payload);
      return isUnique;
    },
    async verifyUniqueUserName(context, payload) {
      const isUnique = await uniqueUsernameRequest(payload);
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
