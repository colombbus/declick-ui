/* global localStorage */

import Vue from 'vue'
import Vuex from 'vuex'

import R from 'ramda'

import * as actions from './actions.js'
import * as type from './mutation-types.js'

Vue.use(Vuex)

function flattenTree (tree, key) {
  const level = element => element[key]
    ? [element, element[key].map(level)]
    : element
  return R.flatten(level(tree))
}

export default new Vuex.Store({
  state: {
    lists: [],
    current_page: 0,
    last_page: 0,
    connected: false,
    authenticatedUser: null,
    current_project: {},
    authorizations: '',
    error_code:0,
    currentStep: null,
    steps: null,
    editor:true
  },
  actions,
  mutations: {
    [type.SET_EDITOR] (state, value) {
      state.editor = value
    },
    [type.SET_STEPS] (state, steps) {
      state.steps = steps
    },
    [type.SET_CURRENT_STEP] (state, stepIndex) {
      let steps = flattenTree({steps: state.steps}, 'steps')
      state.currentStep =
        steps.filter(step => step.position === stepIndex)[0] ||
        state.currentStep
      state.currentStep.visited = true
    },
    [type.UPDATE_STEP_STATE] (state, value) {
      if (typeof value.visited !== 'undefined') {
        state.currentStep.visited = value.visited
      }
      if (typeof value.passed !== 'undefined') {
        state.currentStep.passed = value.passed
      }
    },
    [type.AUTHENTICATION_SUCCESS] (state, token) {
      state.authorizations = token
      state.connected = true
      state.error_code = 0
      localStorage.setItem('authorizations',state.authorizations)
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
      state.authenticatedUser = user
      localStorage.setItem('user', user.default_project_id  +'/'+ user.email +'/'+ user.id+'/'+ user.username)
    },
    [type.LOG_OUT] (state) {
      localStorage.removeItem('user')
      localStorage.removeItem('authorizations')
      state.authenticatedUser = null
      state.authorizations = ''
      state.connected = false
    },
    [type.ERROR] (state,error){
      state.error_code = error.status
    }
  }
})
