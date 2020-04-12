import { createItem, getItemsByOwner, getAllItemsAPI } from "../apis/items";
export default {
  state: {
    userItems: [],
    profileItems: [],
    allItems: [],
    fetchingItems: false
  },
  mutations: {
    NEW_USER_ITEM(state, payload) {
      state.userItems = [...state.userItems, payload];
    },
    SET_PROFILE_ITEMS(state, payload) {
      state.profileItems = payload;
    },
    SET_ALL_ITEMS(state, payload) {
      state.allItems = payload
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
    async getAllItems({ commit }, payload) {
      commit("FETCHING_ITEMS", true);
      const items = await getAllItemsAPI();
      commit("SET_ALL_ITEMS", items);
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
