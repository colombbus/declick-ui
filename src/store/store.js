import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions.js'
import * as type from './mutation-types.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    lists: [],
    current_page: 0,
    last_page: 0,
    connected: false,
    current_user: {},
    current_project: {},
    authorizations: '',
    error_code:0
  },
  actions,
  mutations: {
    [type.AUTHENTICATION_SUCCESS] (state, token) {
      state.authorizations = token
      state.connected = true
      state.error_code = 0
    },
    [type.CURRENT_PROJECT] (state, project){
      state.current_project = project
    },
    [type.SET_LISTS] (state, lists) {
      state.lists = lists.body
      state.current_page = lists.body.current_page
      state.last_page = lists.body.last_page
    },
    [type.GET_USERS_ID] (state,user) {
      state.get_user_id =  user
    },
    [type.SET_USER] (state,user) {
      console.log(user);
      state.current_user = user
    },
    [type.DISCONNECT] (state,nothing){
      state.current_user = {}
      state.authorizations = ''
      state.connected = false
    },
    [type.ERROR] (state,error){
      state.error_code = error.status
    }
  }
})
