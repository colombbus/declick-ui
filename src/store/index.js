import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [],
    current_page: 0,
    last_page: 0,
    connected: false,
    authenticatedUser: null,
    current_project: {},
    authorizations: '',
    error_code: 0,
    currentStep: null,
    steps: null,
    editor: true
  },
  mutations,
  actions
})
