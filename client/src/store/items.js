import { createItem, getItemsByOwner } from "../apis/items";
export default {
  state: {
    userItems: [],
    profileItems: [],
    fetchingItems: false
  },
  mutations: {
    NEW_USER_ITEM(state, payload) {
      state.userItems = [...state.userItems, payload];
    },
    SET_PROFILE_ITEMS(state, payload) {
      state.profileItems = payload;
    },
    FETCHING_ITEMS(state, payload) {
      state.fetchingItems = payload;
    }
  },
  actions: {
    async newItem({ rootState, commit }, payload) {
      commit("FETCHING_ITEMS", true);
      const { token } = rootState.users.me;

      const newItem = await createItem(payload, token);

      if (newItem) {
        commit("NEW_USER_ITEM", newItem);
      }
      commit("FETCHING_ITEMS", false);
    },
    async getProfileItems({ commit }, payload) {
      commit("FETCHING_ITEMS", true);
      const items = await getItemsByOwner(payload);
      commit("SET_PROFILE_ITEMS", items);
      commit("FETCHING_ITEMS", false);
    }
  },
  getters: {}
};
