import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
import * as type from './mutation-types.js'

// export const authenticate = ({ commit, dispatch }, credentials) => {
//   Vue.http.post(type.ENDPOINT + 'authorizations', credentials).then((response) =>{
//     commit(type.AUTHENTICATION_SUCCESS, response.body.token);
//     dispatch('get_user',response.body.owner_id)
//   })
// }
export const set_project = ({commit}, project) =>{
  commit(type.UPDATE_CURRENT_PROJECT,project)
}
export const get_users = ({commit}) => {
  Vue.http.get(type.ENDPOINT + 'users').then((response) =>
      commit(type.SET_LISTS,response)
  )
}
export const create_users = ({commit}, user) => {
  Vue.http.post(type.ENDPOINT + 'users',user).then((response) =>
    console.log(response)
  )
}
export const get_user = ({commit}, user_id) => {
  Vue.http.get(type.ENDPOINT + 'users/' + user_id).then((response) =>
    commit(type.SET_USER,response.body)//commit(type.GET_USERS_ID,response.body)
  )
}
export const update_users = ({commit}, user) => {
  Vue.http.path(type.ENDPOINT + 'users/' + user.id,user).then((response) =>
    console.log(response)
  )
}
export const delete_user = ({commit}, user_id) => {
  Vue.http.delete(type.ENDPOINT + 'users/' + user_id).then((response) =>
    console.log(response)
  )
}
export const get_authorizations = ({commit}) => {
  Vue.http.get(type.ENDPOINT + 'authorizations').then((response) =>
    commit(type.SET_LISTS,response)
  )
}
export const create_authorizations = ({commit}, authorizations) => {
  Vue.http.post(type.ENDPOINT + 'authorizations',authorizations).then((response) =>
    console.log(response)
  )
}
export const show_authorizations = ({commit}, authorizations_id) => {
  Vue.http.get(type.ENDPOINT + 'authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const delete_authorizations = ({commit}, authorizations_id) => {
  Vue.http.delete(type.ENDPOINT + 'authorizations/' + authorizations_id).then((response) =>
    console.log(response)
  )
}
export const get_user_projects = ({commit},user) => {
  Vue.http.get(type.ENDPOINT + 'users/' + user.id + '/projects',{headers:{Authorization:'Token '+ user.token}}).then((response) =>
    commit(type.SET_LISTS,response)
  )
}
export const get_projects = ({commit}) => {
  Vue.http.get(type.ENDPOINT + 'projects').then((response) =>
    commit(type.SET_LISTS, response)
  )
}
export const get_project = ({commit}, project_id) => {
  Vue.http.get(type.ENDPOINT + 'projects/' + project_id).then((response) =>{
    commit(type.CURRENT_PROJECT,response.body)
  })
}
export const create_project = ({commit}, project) => {
  Vue.http.post(type.ENDPOINT + 'projects',project).then((response) =>
    console.log(response)
  )
}
export const update_projects = ({commit,dispatch}, project) => {
  Vue.http.patch(type.ENDPOINT + 'projects/' + project.data.id, project.data,{headers:{Authorization:'Token '+ project.token}}).then((response) =>
    dispatch('get_project', project.data.id)
  )
}
export const delete_project = ({commit}, project_id) => {
  Vue.http.delete(type.ENDPOINT + 'project/' + project_id).then((response) =>
    console.log(response)
  )
}
export const get_project_resource = ({commit}, project_id) => {
  Vue.http.get(type.ENDPOINT + 'project/' + project_id + '/resources' ).then((response) =>
    commit(type.SET_LISTS,response)
  )
}
export const create_project_resources = ({commit}, project_id, resource) => {
  Vue.http.post(type.ENDPOINT + 'projects/' + project_id + '/resources',resources).then((response) =>
    console.log(response)
  )
}
export const get_resource_id = ({commit}, project_id, resources_id) => {
  Vue.http.post(type.ENDPOINT + 'projects/' + project_id + '/resources/' + resources_id).then((response) =>
    console.log(response)
  )
}

export const logOut = ({commit}) =>
  commit(type.LOG_OUT)
