import { setUserReviewAPI, getReviewsByUsername } from '../apis/reviews'

export default {
  state: {
    fetchingReviews: false,
    profileReviews: []
  },
  mutations: {
    FETCHING_REVIEWS(state, payload) {
      state.fetchingReviews = payload
    },
    SET_PROFILE_REVIEWS(state, payload) {
      state.profileReviews = payload
    }
  },
  actions: {
    async getProfileReviews({ commit }, { username }) {
      commit("FETCHING_REVIEWS", true)
      const reviews = await getReviewsByUsername(username)
      commit("SET_PROFILE_REVIEWS", reviews)
      commit("FETCHING_REVIEWS", false)
    },
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