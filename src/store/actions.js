import * as mutations from './mutation-types'
import Api from 'src/api'

const LOCAL_STORAGE_PREFIX = 'ui'
const LOCAL_STORAGE_VERSION = 5

export const register = async ({dispatch}, {username, email, password}) => {
  await Api.createUser({username, email, password})
  await dispatch('logIn', {username, password})
}

export const autoLogIn = async ({dispatch}) => {
  let version = getLocalItem('version')
  if (version === null || parseInt(version) !== LOCAL_STORAGE_VERSION) {
    clearLocalItems()
  } else {
    let token = getLocalItem('token')
    dispatch('logIn', {token})
  }
}

export const logIn = async (
  {commit, dispatch},
  {username, password, token}
) => {
  Api.getAllCourseAssessments(2)
  if (!token) {
    token = await Api.createToken(username, password)
  }
  let user = await Api.getUserByToken(token)
  commit(mutations.LOG_IN, {token, user})
  setLocalItem('version', LOCAL_STORAGE_VERSION)
  setLocalItem('token', token)
  let projectId = user.currentProjectId || user.defaultProjectId
  let project = await Api.getProject(projectId, token)
  commit(mutations.PROJECT_SELECTION, {project})
}

export const logOut = async ({commit, state}, {token}) => {
  clearLocalItems()
  Api.destroyToken(state.token)
  commit(mutations.LOG_OUT)
}

export const getAllCourses = async () => {
  return await Api.getAllCourses()
}

export const registerCurrentAssessmentResult =
  async ({commit, state}, data) => {
    await Api.registerAssessmentResult(
      state.currentUser.id,
      state.currentAssessment.id,
      data,
      state.token
    )
    commit(mutations.ASSESSMENT_RESULT, {
      id: state.currentAssessment.id,
      result: data
    })
  }

export const selectPreviousAssessment = async ({commit, state}) => {
  let [assessment] = state.currentCourse.filter(assessment =>
    assessment.position === state.currentAssessment.position - 1
  )
  if (assessment) {
    commit(mutations.ASSESSMENT_SELECTION, {id: assessment.id})
  }
}

export const selectNextAssessment = async ({commit, state}) => {
  let [assessment] = state.currentCourse.filter(assessment =>
    assessment.position === state.currentAssessment.position + 1
  )
  if (assessment) {
    commit(mutations.ASSESSMENT_SELECTION, {id: assessment.id})
  }
}

export const createProject = async ({commit, state}, {data}) => {
  let project = await Api.createProject(data, state.token)
  commit(mutations.PROJECT_SELECTION, {project})
}

export const selectProject = async ({commit, state}, {id}) => {
  await Api.updateUser(state.user.id, {
    currentProjectId: id
  }, state.token)
  let project = await Api.getProject(id, state.token)
  commit(mutations.PROJECT_SELECTION, {project})
}

export const updateProject = async ({state}, {id, data}) => {
  return await Api.updateProject(id, data, state.token)
}

export const getAllUserProjects = async ({state}) => {
  return await Api.getAllUserProjects(state.user.id, state.token)
}

function getLocalItem (key) {
  return localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`)
}

function setLocalItem (key, value) {
  return localStorage.setItem(`${LOCAL_STORAGE_PREFIX}.${key}`, value)
}

function clearLocalItems () {
  let keys = []
  for (let index = 0; index < localStorage.length; index++) {
    keys.push(localStorage.key(index))
  }
  let prefixLength = LOCAL_STORAGE_PREFIX.length
  keys.forEach((key) => {
    if (key.substr(0, prefixLength + 1) === `${LOCAL_STORAGE_PREFIX}.`) {
      localStorage.removeItem(key)
    }
  })
}
