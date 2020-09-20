import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    users: []
  },
  mutations: {
    update_state(state, data) {
      state[data[0]] = data[1]
    }
  },
  actions: {
  },
  modules: {
  }
})
