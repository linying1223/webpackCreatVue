import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getter'
import mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: 'e',
    getName: 'abby'
  },
  getters,
  mutations
})
