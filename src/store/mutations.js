/* global: localStorage */

import R from 'ramda'
import * as types from './mutation-types.js'

export default {
  [types.SET_EDITOR] (state, value) {
    state.editor = value
  },
  [types.SET_STEPS] (state, steps) {
    state.steps = steps
  },
  [types.SET_CURRENT_STEP] (state, stepIndex) {
    let steps = flattenTree({steps: state.steps}, 'steps')
    state.currentStep =
      steps.filter(step => step.position === stepIndex)[0] ||
      state.currentStep
    state.currentStep.visited = true
  },
  [types.UPDATE_STEP_STATE] (state, value) {
    if (typeof value.visited !== 'undefined') {
      state.currentStep.visited = value.visited
    }
    if (typeof value.passed !== 'undefined') {
      state.currentStep.passed = value.passed
    }
  },
  [types.AUTHENTICATION_SUCCESS] (state, token) {
    state.authorizations = token
    state.connected = true
    state.error_code = 0
    localStorage.setItem('authorizations', state.authorizations)
  },
  [types.CURRENT_PROJECT] (state, project) {
    state.current_project = project
  },
  [types.SET_LISTS] (state, lists) {
    state.lists = lists.body
    state.current_page = lists.body.current_page
    state.last_page = lists.body.last_page
  },
  [types.GET_USERS_ID] (state, user) {
    state.get_user_id = user
  },
  [types.SET_USER] (state, user) {
    state.authenticatedUser = user
    localStorage.setItem('user',
      user.default_project_id + '/' +
      user.email + '/' +
      user.id + '/' +
      user.username
    )
  },
  [types.LOG_OUT] (state) {
    localStorage.removeItem('user')
    localStorage.removeItem('authorizations')
    state.authenticatedUser = null
    state.authorizations = ''
    state.connected = false
  },
  [types.ERROR] (state, error) {
    state.error_code = error.status
  }
}

function flattenTree (tree, key) {
  const level = element => element[key]
    ? [element, element[key].map(level)]
    : element
  return R.flatten(level(tree))
}
