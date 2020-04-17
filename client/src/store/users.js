import { cacheItem, deleteCachedItem } from "../utils/cacheHandler";
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  loginRequest,
  getUserFromToken,
  logoutRequest,
  uploadAvatarRequest,
  getUserFromUsername
  // updateUser
} from "../apis/users";
import { geocode } from "../apis/geocoding";

const EMPTY_USER = {
  _id: null,
  token: null,
  isLoggedIn: false,
  username: "",
  email: "",
  firstName: "",
  lastNameInitial: "",
  age: 0,
  primaryLocation: {
    lat: 43.64515353395524,
    lng: -79.41002994775774
  },
  currentLocation: {
    lat: 0,
    lng: 0
  },
  karma: 0,
  rating: {
    up: 0,
    down: 0
  }
};

export default {
  state: {
    me: {
      ...EMPTY_USER
    },
    profileUser: {
      isUserMe: false,
      ...EMPTY_USER
    },
    fetchingUser: false,
    fetchingLocation: false
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
    FETCHING_USER(state, payload) {
      this.fetchingUser = payload;
    },
    FETCHING_LOCATION(state, payload) {
      state.fetchingLocation = payload;
    },
    SET_PROFILE_USER(state, payload) {
      state.profileUser = { ...state.profileUser, ...payload };
    }
  },
  actions: {
    async getLatLng({ commit }, payload) {
      commit("FETCHING_LOCATION", true);
      return geocode(payload).then(candidates => {
        if (candidates.length) {
          const { x, y } = candidates[0].location;
          return { lat: y, lng: x };
        }
        commit("FETCHING_LOCATION", false);
      });
    },
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
    async registerUser({ commit }, payload) {
      commit("FETCHING_USER", true);
      const { token, user } = await registerRequest(payload);
      if (token) {
        commit("USER_TOKEN", token);
        cacheItem("user_token", token);
      }
      if (user) {
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
    token(state) {
      return state.me.token;
    }
  }
};
