import Vue from "vue"
import Vuex from "vuex"

import alerts from "./alerts"
import items from "./items"
import reviews from "./reviews"
import search from "./search"
import users from "./users"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    alerts,
    items,
    reviews,
    search,
    users
  },
  // TODO: Uncomment this and set it up
  // docs: https://www.npmjs.com/package/vuex-persistedstate
  // Using it to persist state after refresh but is causing some auth bugs related to user.me.token being stored in local storage 
  // plugins: [createPersistedState()]
})
