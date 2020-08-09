import { cacheItem, deleteCachedItem } from "../utils/cacheHandler"
import { socketConnect, socketDisconnect } from "../utils/socket"
import {
  uniqueEmailRequest,
  uniqueUsernameRequest,
  registerRequest,
  loginRequest,
  getUserFromToken,
  logoutRequest,
  getUserFromUsername
} from "../apis/users"
import {
  editNotificationStatusAPI,
  deleteNotificationAPI
} from "../apis/notifications"
import { editTransactionStatusAPI } from "../apis/transactions"
import { createBorrowRequestAPI } from "../apis/transactions"
import { geocode } from "../apis/geocoding"
import router from "../router"

const EMPTY_USER = {
  _id: null,
  token: null,
  isLoggedIn: false,
  socket: null,
  username: "",
  email: "",
  firstName: "",
  lastNameInitial: "",
  age: 0,
  notifications: [],
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
}

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
    fetchingLocation: false,
    fetchingTransaction: false
  },
  mutations: {
    USER(state, payload) {
      // changed from state = Object.assign(state.me, payload); <- this was not reactive
      state.me = Object.assign({}, state.me, payload)
    },
    USER_LOGIN(state, payload) {
      state.me.isLoggedIn = payload
    },
    USER_TOKEN(state, payload) {
      state.me.token = payload
    },
    USER_SOCKET(state, payload) {
      state.me.socket = payload
    },
    FETCHING_USER(state, payload) {
      state.fetchingUser = payload
    },
    FETCHING_LOCATION(state, payload) {
      state.fetchingLocation = payload
    },
    FETCHING_TRANSACTION(state, payload) {
      state.fetchingTransaction = payload
    },
    SET_PROFILE_USER(state, payload) {
      state.profileUser = { ...state.profileUser, ...payload }
    },
    PUSH_SOCKET_NOTIFICATION(state, payload) {
      state.me.notifications = [...state.me.notifications, payload]
    }
  },
  actions: {
    async getLatLng({ commit }, payload) {
      commit("FETCHING_LOCATION", true)
      return geocode(payload).then(candidates => {
        if (candidates.length) {
          const { x, y } = candidates[0].location
          return { lat: y, lng: x }
        }
        commit("FETCHING_LOCATION", false)
      })
    },
    async logout({ state, commit }) {
      const LoggedOut = await logoutRequest(state.me.token)
      if (LoggedOut) {
        deleteCachedItem("user_token")
        // Why am I setting isLoggedIn to true in Logout?
        // Causes a bug in login/register if I remove, but why?
        commit("USER_LOGIN", true)
        commit("USER", EMPTY_USER)
        socketDisconnect()
      }
    },
    async loginFromToken({ commit }, payload) {
      commit("FETCHING_USER", true)
      const user = await getUserFromToken(payload)
      if (user) {
        commit("USER_LOGIN", true)
        commit("USER_TOKEN", payload)
        commit("USER", user)
        socketConnect(payload)
      }
      commit("FETCHING_USER", false)
    },
    async loginWithEmail({ commit }, payload) {
      commit("FETCHING_USER", true)
      const { user, token } = await loginRequest(payload)
      if (user && token) {
        commit("USER", user)
        commit("USER_LOGIN", true)
        commit("USER_TOKEN", token)
        cacheItem("user_token", token)
        socketConnect(token)
      }
      commit("FETCHING_USER", false)
    },
    async registerUser({ commit }, payload) {
      commit("FETCHING_USER", true)
      const { token, user } = await registerRequest(payload)
      if (token) {
        commit("USER_TOKEN", token)
        cacheItem("user_token", token)
      }
      if (user) {
        commit("USER", user)
        commit("USER_LOGIN", true)
      }
      commit("FETCHING_USER", false)
    },
    async getUserProfileData(
      { commit, state },
      { username: usernameFromParam }
    ) {
      if (state.me.username === usernameFromParam) {
        commit("SET_PROFILE_USER", { ...state.me, isUserMe: true })
      } else {
        commit("FETCHING_USER", true)
        const user = await getUserFromUsername(usernameFromParam)
        commit("SET_PROFILE_USER", { ...user, isUserMe: false })
        commit("FETCHING_USER", false)
      }
    },
    async verifyUniqueEmail(context, payload) {
      const isUnique = await uniqueEmailRequest(payload)
      return isUnique
    },
    async verifyUniqueUserName(context, payload) {
      const isUnique = await uniqueUsernameRequest(payload)
      return isUnique
    },
    async socketKarma({ state, commit }, payload) {
      commit("USER", { karma: state.me.karma + payload })
    },
    // === User Notifications ===
    async setNotificationSeen({ state, commit }, payload) {
      const user = await editNotificationStatusAPI(state.me.token, payload)
      commit("USER", user)
    },
    async deleteNotification({ state, commit }, payload) {
      const user = await deleteNotificationAPI(state.me.token, payload)
      commit("USER", user)
    },
    async socketNotification({ state, commit }, payload) {
      const alreadyExists = state.me.notifications.find(({ notification }) => {
        notification.id === payload.notification.id
      })

      if (!alreadyExists) {
        commit("PUSH_SOCKET_NOTIFICATION", payload)
      }
    },

    // === User Transactions ===
    async sendBorrowRequest({ state, commit }, payload) {
      commit("FETCHING_TRANSACTION", true)
      const { token } = state.me

      const reducedKarma = await createBorrowRequestAPI(payload, token)

      if (reducedKarma) {
        commit("USER", { karma: reducedKarma })
        router.go(-1)
        // TODO: Probably want to display feedback of successful POST here.
      } else {
        // TODO: Going to want to provide feedback to the user if the POST req doesn't succeed.
      }

      commit("FETCHING_TRANSACTION", false)
    },

    async acceptDeclineTransaction({ state, commit }, payload) {
      const user = await editTransactionStatusAPI(state.me.token, payload.id, payload.status)
      commit("USER", user)
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.me.isLoggedIn
    },
    token(state) {
      return state.me.token
    },
    unseenNotifications(state) {
      return state.me.notifications.filter(
        ({ notification }) => notification.status === "unseen"
      )
    }
  }
}
