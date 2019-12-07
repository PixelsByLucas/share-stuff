import { cacheItem, deleteCachedItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  uploadAvatar,
  // readAvatar,
  loginRequest,
  getUserFromToken,
  logoutRequest
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
  karma: 0
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

        // const avatar = await readAvatar(state._id);

        // if (avatar) {
        //   commit("USER_AVATAR", avatar);
        // }
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
    },
    async uploadAvatar({ commit, state }, payload) {
      const avatar = await uploadAvatar(payload, state.token);
      if (avatar) {
        commit("USER_AVATAR", avatar);
      }
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
