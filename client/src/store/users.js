import { cacheItem, deleteCachedItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  // readAvatar,
  loginRequest,
  getUserFromToken,
  logoutRequest,
  uploadAvatarRequest,
  getUserFromUsername
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
    me: {
      ...EMPTY_USER
    },
    profileUser: {
      isUserMe: false,
      ...EMPTY_USER
    },
    fetchingUser: false
  },
  mutations: {
    // TODO: potentially replace Object.assign with vue.set()
    USER(state, payload) {
      state = Object.assign(state.me, payload);
    },
    USER_LOGIN(state, payload) {
      state.me.isLoggedIn = payload;
    },
    USER_TOKEN(state, payload) {
      state.me.token = payload;
    },
    USER_AVATAR(state, payload) {
      state.me.avatar = payload;
    },
    FETCHING_USER(state, payload) {
      this.fetchingUser = payload;
    },
    SET_PROFILE_USER(state, payload) {
      state.profileUser = { ...state.profileUser, ...payload };
    }
  },
  actions: {
    async logout({ state, commit }) {
      const LoggedOut = await logoutRequest(state.me.token);
      if (LoggedOut) {
        deleteCachedItem("user_token");
        commit("USER_LOGIN", true);
        commit("USER", EMPTY_USER);
      }
    },
    async loginFromToken({ commit }, payload) {
      commit("FETCHING_USER", true);
      const user = await getUserFromToken(payload);
      if (user) {
        commit("USER_LOGIN", true);
        commit("USER_TOKEN", payload);
        commit("USER", user);
      }
      commit("FETCHING_USER", false);
    },
    async loginWithEmail({ commit }, payload) {
      commit("FETCHING_USER", true);
      const { user, token } = await loginRequest(payload);
      if (user && token) {
        commit("USER", user);
        commit("USER_LOGIN", true);
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
      commit("FETCHING_USER", false);
    },
    // setUserLogin({ commit }, payload) {
    //   commit("USER_LOGIN", payload);
    // },
    async registerUser({ commit }, payload) {
      commit("FETCHING_USER", true);
      const { token, user } = await registerRequest(payload.formValues);
      if (token) {
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
      if (user) {
        await uploadAvatarRequest(payload.avatar, token);
        commit("USER", user);
        commit("USER_LOGIN", true);
      }
      commit("FETCHING_USER", false);
    },
    async getUserProfileData(
      { commit, state },
      { username: usernameFromParam }
    ) {
      if (state.me.username === usernameFromParam) {
        commit("SET_PROFILE_USER", { ...state.me, isUserMe: true });
      } else {
        commit("FETCHING_USER", true);
        const user = await getUserFromUsername(usernameFromParam);
        commit("SET_PROFILE_USER", { ...user, isUserMe: false });
        commit("FETCHING_USER", false);
      }
    },
    async uploadAvatar({ state }, payload) {
      uploadAvatarRequest(payload, state.me.token);
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
      return state.me.isLoggedIn;
    },
    // isMyProfile: state => paramsUsername => {
    //   return state.me.username === paramsUsername;
    // },
    token(state) {
      return state.me.token;
    }
  }
};
