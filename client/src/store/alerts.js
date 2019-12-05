export default {
  state: {
    type: null,
    message: null
  },
  mutations: {
    SUCCESS(state, message) {
      state.type = "alert-success";
      state.message = message;
    },
    ERROR(state, message) {
      state.type = "alert-danger";
      state.message = message;
    },
    CLEAR(state) {
      state.type = null;
      state.message = null;
    }
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }, message) {
      commit("success", message);
    }
  }
};
