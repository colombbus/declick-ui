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
    currentProject: null,
    currentUserProjects: null,
    authorizations: '',
    error_code: 0,
    currentStep: null,
    steps: null,
    editor: true,
    logInErrors: null
  },
  mutations,
  actions
})
