import * as mutations from './mutation-types'
import Api from 'src/api'

const LOCAL_STORAGE_VERSION = 1

export const register = async ({dispatch}, {username, email, password}) => {
  await Api.createUser({username, email, password})
  await dispatch('logIn', {username, password})
}

export const autoLogIn = async ({dispatch}) => {
  let version = localStorage.getItem('ui.version')
  if (version === null || version < LOCAL_STORAGE_VERSION) {
    localStorage.clear()
  } else {
    let token = localStorage.getItem('ui.token')
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
  localStorage.clear()
  localStorage.setItem('ui.version', LOCAL_STORAGE_VERSION)
  localStorage.setItem('ui.token', token)
  let projectId = user.currentProjectId || user.defaultProjectId
  let project = await Api.getProject(projectId, token)
  commit(mutations.PROJECT_SELECTION, {project})
}

export const logOut = ({commit, state}, {token}) => {
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
