import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
import * as types from './mutation-types.js'

// export const authenticate = ({ commit, dispatch }, credentials) => {
//   Vue.http.post(types.ENDPOINT + 'authorizations', credentials).then((response) =>{
//     commit(types.AUTHENTICATION_SUCCESS, response.body.token);
//     dispatch('get_user',response.body.owner_id)
//   })
// }
export const set_current_step_index = ({commit},id) => {
  commit(types.CURRENT_STEP_INDEX,id)
}
export const set_current_step_name = ({commit},name) => {
  commit(types.CURRENT_STEP_NAME,name)
}
export const set_current_step_url = ({commit},url) => {
  commit(types.CURRENT_STEP_URL,url)
}
export const set_project = ({commit}, project) =>{
  commit(types.UPDATE_CURRENT_PROJECT,project)
}
export const get_users = ({commit}) => {
  Vue.http.get(types.ENDPOINT + 'users').then((response) =>
      commit(types.SET_LISTS,response)
  )
}
export const create_users = ({commit}, user) => {
  Vue.http.post(types.ENDPOINT + 'users',user).then((response) =>
    console.log(response)
  )
}
export const get_user = ({commit,dispatch}, user_id) => {
  Vue.http.get(types.ENDPOINT + 'users/' + user_id).then((response) =>{
    commit(types.SET_USER,response.body)
    dispatch('get_project',response.body.default_project_id)
  })
}
export const update_users = ({commit}, user) => {
  Vue.http.path(types.ENDPOINT + 'users/' + user.id,user).then((response) =>
    console.log(response)
  )
}
export const delete_user = ({commit}, user_id) => {
  Vue.http.delete(types.ENDPOINT + 'users/' + user_id).then((response) =>
    console.log(response)
  )
}
export const get_authorizations = ({commit}) => {
  Vue.http.get(types.ENDPOINT + 'authorizations').then((response) =>
    commit(types.SET_LISTS,response)
  )
}
export const create_authorizations = ({commit}, authorizations) => {
  Vue.http.post(types.ENDPOINT + 'authorizations',authorizations).then((response) =>
    console.log(response)
  )
}
export const show_authorizations = ({commit}, authorizations_id) => {
  Vue.http.get(types.ENDPOINT + 'authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const delete_authorizations = ({commit}, authorizations_id) => {
  Vue.http.delete(types.ENDPOINT + 'authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const get_user_projects = ({commit},user) => {
  Vue.http.get(types.ENDPOINT + 'users/' + user.id + '/projects',{headers:{Authorization:'Token '+ user.token}}).then((response) =>
    commit(types.SET_LISTS,response)
  )
}
export const get_projects = ({commit}) => {
  Vue.http.get(types.ENDPOINT + 'projects').then((response) =>
    commit(types.SET_LISTS, response)
  )
}
export const get_project = ({commit}, project_id) => {
  Vue.http.get(types.ENDPOINT + 'projects/' + project_id).then((response) =>{
    commit(types.CURRENT_PROJECT,response.body)
  })
}
export const create_project = ({commit}, project) => {
  Vue.http.post(types.ENDPOINT + 'projects',project).then((response) =>
    console.log(response)
  )
}
export const update_projects = ({commit,dispatch}, project) => {
  Vue.http.patch(types.ENDPOINT + 'projects/' + project.data.id, project.data,{headers:{Authorization:'Token '+ project.token}}).then((response) =>
    dispatch('get_project', project.data.id)
  )
}
export const delete_project = ({commit}, project_id) => {
  Vue.http.delete(types.ENDPOINT + 'project/' + project_id).then((response) =>
    console.log(response)
  )
}
export const get_project_resource = ({commit}, project_id) => {
  Vue.http.get(types.ENDPOINT + 'project/' + project_id + '/resources' ).then((response) =>
    commit(types.SET_LISTS,response)
  )
}
export const create_project_resources = ({commit}, project_id, resource) => {
  Vue.http.post(types.ENDPOINT + 'projects/' + project_id + '/resources',resources).then((response) =>
    console.log(response)
  )
}
export const get_resource_id = ({commit}, project_id, resources_id) => {
  Vue.http.post(types.ENDPOINT + 'projects/' + project_id + '/resources/' + resources_id).then((response) =>
    console.log(response)
  )
}

export const logOut = ({commit}) =>
  commit(types.LOG_OUT)
