import { ITEM_CATEGORIES } from "../utils/constants"

export default {
  state: {
    searchTerm: "",
    category: ""
  },
  mutations: {
    SET_CATEGORY(state, payload) {
      state.category = payload
    },
    SET_TERM(state, payload) {
      state.searchTerm = payload
    }
  },
  actions: {
    setCategory({ commit }, payload) {
      if (ITEM_CATEGORIES.includes(payload)) {
        commit("SET_CATEGORY", payload)
      } else {
        // TODO: Commit notification here!
        console.log("NOT APPROPRIATE CATEGORY")
      }
    },
    setTerm({ commit }, payload) {
      commit("SET_TERM", payload)
    },
    setLocation({ commit }, payload) {
      commit("SET_LOCATION", payload)
    }
  }
}
