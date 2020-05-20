import { getNotificationsAPI } from "../apis/notifications";
import router from '../router'
export default {
  state: {
    notifications: [],
    loading: false
  },
  mutations: {
    PUSH_NEW_NOTIFICATION(state, payload) {
      state.notifications = [...state.notifications, payload];
    },
    SET_ALL_NOTIFICATIONS(state, payload) {
      state.notifications = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    // async getAllNotifications({ rootState, commit }, payload) {
    //   console.log('GET ALL NOTIFICATIONS')
    //   commit("SET_LOADING", true);
    //   const { token } = rootState.users.me;
    //   const notifications = await getNotificationsAPI(token);
    //   commit("SET_ALL_NOTIFICATIONS", notifications);
    //   commit("SET_LOADING", false);
    // },
  },
  getters: {}
};
