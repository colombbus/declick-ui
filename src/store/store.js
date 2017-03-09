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
    json: {
        "data": "M25.255,63.302c32.97-3.167,63.481-17.886,96.522-21.262c31.374-3.206,62.175-4.643,94.51-4.328c45.235,0.439,113.158,22.029,128.641,66.525c10.522,30.243,11.189,71.242-8.883,97.309c-23.825,30.939-55.704,40.616-89.128,60.174c-39.078,22.867-39.078,22.867-75.06,47.575c-35.261,24.213-87.611,59.112-92.27,102.089c-2.703,24.943,7.114,54.339,21.787,74.96c28.008,39.363,65.192,80.229,111.434,101.433c55.587,25.485,112.499,36.663,173.848,39.621c57.567,2.778,111.682,2.036,162.889-24.55c39.235-20.368,69.451-54.185,69.977-97.74c0.375-31.134-11.793-55.753-22.851-84.559c-11.122-28.972-16.033-58.073-15.71-88.649c0.292-27.768,11.396-54.101,35.71-70.92c25.972-17.969,54.402-25.999,72.833-52.986c33.826-49.535,12.82-134.523,70.377-170.015c65.75-40.539,163.432,7.745,209.688,53.859c34.891,34.786,57.88,91.84,58.417,139.253c0.237,20.913,3.027,44.543-1.792,64.917c-5.568,23.546-19.611,34.563-39.299,48.274c-40.057,27.902-78.061,62.405-88.834,109.851c-4.686,20.627-9.176,46.802,1.037,66.749c6.909,13.499,19.683,26.981,31.945,36.569c52.711,41.21,131.881,44.271,196.91,44.396c84.241,0.162,148.639-52.938,177.451-124.24c23.287-57.621,31.08-113.144,31.07-174.281c-0.009-49.22-22.069-102.894-12.887-151.773c4.817-25.648,43.632-57.636,68.898-66.53c30.76-10.827,67.95,3.379,96.806,13.133",
        "color": "#CFBFC7",
        "width": 7,
        "opacity": "0.4"
    },
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
