import { createItem } from "../apis/items";
export default {
  state: {
    userItems: []
  },
  mutations: {
    NEW_USER_ITEM(state, payload) {
      state.userItems = [...state.userItems, payload];
    }
  },
  actions: {
    async newItem({ rootState, commit }, payload) {
      const { token } = rootState.users;

      const newItem = await createItem(payload, token);

      if (newItem) {
        commit("NEW_USER_ITEM", newItem);
      }
    }
  },
  getters: {}
};
