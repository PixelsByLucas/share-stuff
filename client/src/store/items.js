import { createItem, getItemsByOwner, getAllItemsAPI, getItemAPI } from "../apis/items";
import router from '../router'
export default {
  state: {
    userItems: [],
    profileItems: [],
    allItems: [],
    itemDetail: {},
    fetchingItems: false,
    postingItem: false
  },
  mutations: {
    NEW_USER_ITEM(state, payload) {
      state.userItems = [...state.userItems, payload];
    },
    SET_PROFILE_ITEMS(state, payload) {
      state.profileItems = payload;
    },
    SET_ALL_ITEMS(state, payload) {
      state.allItems = payload;
    },
    SET_ITEM_DETAIL(state, payload) {
      state.itemDetail = payload;
    },
    FETCHING_ITEMS(state, payload) {
      state.fetchingItems = payload;
    },
    POSTING_ITEM(state, payload) {
      state.postingItem = payload
    }
  },
  actions: {
    async newItem({ rootState, commit }, payload) {
      commit("POSTING_ITEM", true);
      const { token } = rootState.users.me;

      const newItem = await createItem(payload, token);

      if (newItem) {
        router.push(`/profile/${rootState.users.me.username}`);
      } else {
        // TODO: Going to want to provide feedback to the user if the POST req doesn't succeed.
      }
      commit("POSTING_ITEM", false);
    },
    async getAllItems({ rootState, commit }, payload) {
      // TODO: This action should not fire if fetchingUser
      commit("FETCHING_ITEMS", true);
      const items = await getAllItemsAPI(rootState.users.me._id);
      commit("SET_ALL_ITEMS", items);
      commit("FETCHING_ITEMS", false);
    },
    async getProfileItems({ commit }, payload) {
      commit("FETCHING_ITEMS", true);
      const items = await getItemsByOwner(payload);
      commit("SET_PROFILE_ITEMS", items);
      commit("FETCHING_ITEMS", false);
    },
    async getItemDetail({ commit }, payload) {
      commit("FETCHING_ITEMS", true);
      const item = await getItemAPI(payload);
      commit("SET_ITEM_DETAIL", item);
      commit("FETCHING_ITEMS", false);
    }
  },
  getters: {}
};
