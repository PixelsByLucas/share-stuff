import { setUserReviewAPI } from '../apis/reviews'

export default {
  state: {

  },
  mutations: {
  },
  actions: {
    async postReview({ rootState, commit }, payload) {
      const updatedUser = await setUserReviewAPI(rootState.users.me.token, payload)
      if (updatedUser) {
        commit("USER", updatedUser)
      }
    }
  },
  getters: {

  }
}