import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    currentProject: null,
    currentCourse: null,
    currentAssessment: null
    /*
    lists: [],
    current_page: 0,
    last_page: 0,
    connected: false,
    user: null,
    currentProject: null,
    userProjects: null,
    authorizations: '',
    currentStep: null,
    steps: null,
    editor: true
    */
  },
  mutations,
  actions
})
