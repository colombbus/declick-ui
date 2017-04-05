import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
import * as types from './mutation-types.js'
import config from 'assets/config/declick'

var mutations = types

import Api from '../api'

export const setCurrentStepResult = ({commit, state}, payload) => {
  if (state.authenticatedUser) {
    let endpoint = `${config.apiUrl}v1/users/${state.authenticatedUser.id}/results`
    let body = {
      step_id: state.currentStep.id,
      passed: payload.passed,
      solution: payload.solution
    }
    Vue.http.post(endpoint, body, {
      headers: {Authorization: 'Token ' + state.authorizations}
    })
  }
  commit(types.SET_CURRENT_STEP_RESULT, payload)
}

export const selectNextStep = ({commit, state}) => {
  if (state.currentStep) {
    commit(types.SET_CURRENT_STEP, state.currentStep.position + 1)
  }
}

export const selectPreviousStep = ({commit, state}) => {
  if (state.currentStep) {
    commit(types.SET_CURRENT_STEP, state.currentStep.position - 1)
  }
}

/* eslint camelcase: "off" */
export const get_users = ({commit}) => {
  Vue.http.get(config.apiUrl + 'v1/users').then((response) =>
      commit(types.SET_LISTS, response)
  )
}
export const create_users = ({commit}, user) => {
  Vue.http.post(config.apiUrl + 'v1/users', user).then((response) =>
    console.log(response)
  )
}
export const get_user = ({commit, dispatch}, user_id) => {
  Vue.http.get(config.apiUrl + 'v1/users/' + user_id).then((response) => {
    commit(types.SET_USER, response.body)
    dispatch('get_project', response.body.default_project_id)
    dispatch('getCurrentUserProjects')
  })
}
export const update_users = ({commit}, user) => {
  Vue.http.path(config.apiUrl + 'v1/users/' + user.id, user).then((response) =>
    console.log(response)
  )
}
export const delete_user = ({commit}, user_id) => {
  Vue.http.delete(config.apiUrl + 'v1/users/' + user_id).then((response) =>
    console.log(response)
  )
}
export const get_authorizations = ({commit}) => {
  Vue.http.get(config.apiUrl + 'v1/authorizations').then((response) =>
    commit(types.SET_LISTS, response)
  )
}
export const create_authorizations = ({commit}, authorizations) => {
  Vue.http.post(config.apiUrl + 'v1/authorizations', authorizations).then((response) =>
    console.log(response)
  )
}
export const show_authorizations = ({commit}, authorizations_id) => {
  Vue.http.get(config.apiUrl + 'v1/authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const delete_authorizations = ({commit}, authorizations_id) => {
  Vue.http.delete(config.apiUrl + 'v1/authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const get_user_projects = ({commit}, user) => {
  Vue.http.get(
    config.apiUrl + 'v1/users/' + user.id + '/projects',
    {headers: {Authorization: 'Token ' + user.token}}
  ).then((response) =>
    commit(types.SET_LISTS, response)
  )
}
export const get_projects = ({commit}) => {
  Vue.http.get(config.apiUrl + 'v1/projects').then((response) =>
    commit(types.SET_LISTS, response)
  )
}
export const get_project = ({commit}, project_id) => {
  Vue.http.get(config.apiUrl + 'v1/projects/' + project_id).then((response) => {
    commit(types.CURRENT_PROJECT, response.body)
  })
}
export const create_project = ({commit}, project) => {
  Vue.http.post(config.apiUrl + 'v1/projects', project).then((response) =>
    console.log(response)
  )
}
export const update_projects = ({commit, dispatch}, project) => {
  Vue.http.patch(
    config.apiUrl + 'v1/projects/' + project.data.id,
    project.data,
    {headers: {Authorization: 'Token ' + project.token}}
  ).then((response) =>
    dispatch('get_project', project.data.id)
  )
}
export const delete_project = ({commit}, project_id) => {
  Vue.http.delete(config.apiUrl + 'v1/project/' + project_id).then((response) =>
    console.log(response)
  )
}
export const get_project_resource = ({commit}, project_id) => {
  Vue.http.get(config.apiUrl + 'v1/project/' + project_id + '/resources').then((response) =>
    commit(types.SET_LISTS, response)
  )
}
export const create_project_resources = ({commit}, project_id, resource) => {
  Vue.http.post(
    config.apiUrl + 'v1/projects/' + project_id + '/resources',
    resource
  ).then((response) =>
    console.log(response)
  )
}
export const get_resource_id = ({commit}, project_id, resources_id) => {
  Vue.http.post(config.apiUrl + 'v1/projects/' + project_id + '/resources/' + resources_id).then((response) =>
    console.log(response)
  )
}

export const register = async ({commit}, {username, email, password}) => {
  let endpoint = `${config.apiUrl}v1/users`
  let {body: response} =
    await Vue.http.post(endpoint, {username, email, password})
  return response
}

export const logIn = ({commit, dispatch}, {username, password}) => {
  return new Promise((resolve, reject) => {
    let endpoint = `${config.apiUrl}v1/authorizations`
    Vue.http.post(endpoint, {username, password}).then(({body: response}) => {
      commit(types.AUTHENTICATION_SUCCESS, response.token)
      dispatch('get_user', response.owner_id)
      resolve()
    }).catch(({body: response}) => {
      commit(types.AUTHENTICATION_FAILURE, response)
      reject()
    })
  })
}

export const logOut = ({commit}) =>
  commit(types.LOG_OUT)

export const createProject = async ({commit, state}, {data}) => {
  let project = await Api.createProject(data, state.authorizations)
  commit(mutations.SET_CURRENT_PROJECT, {project})
}

export const getCurrentUserProjects = ({commit, state}) => {
  Api.getUserProjects(state.authenticatedUser.id, state.authorizations)
    .then(projects => {
      commit('SET_CURRENT_USER_PROJECTS', {projects})
    }
  )
}
