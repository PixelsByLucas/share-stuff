import { createBorrowRequestAPI } from "../apis/transactions";
import router from "../router"

export default {
  state: {
    loading: false,
    transactions: []
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
    NEW_TRANSACTION(state, payload) {
      state.transactions = [...state.transactions, payload];
    }
  },
  actions: {
    async sendBorrowRequest({ commit, rootState }, payload) {
      commit("SET_LOADING", true);
      const { token } = rootState.users.me;
      console.log("STORE TOKEN", token)

      const newRequest = await createBorrowRequestAPI(payload, token);

      if (newRequest) {
        commit("NEW_TRANSACTION", newRequest)
        router.go(-1)
        // TODO: Probably want to display feedback of successful POST here.
      } else {
        // TODO: Going to want to provide feedback to the user if the POST req doesn't succeed.
      }

      commit("SET_LOADING", false);
    }
  },
  getters: {}
};