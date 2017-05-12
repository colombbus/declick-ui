import * as mutations from './mutation-types'
import Remote from 'src/api'
import config from 'assets/config/declick'
import Storage from 'src/storage'

let Api

if (config.offline) {
  Api = Storage
} else {
  Api = Remote
}

const LOCAL_STORAGE_PREFIX = 'ui'
const LOCAL_STORAGE_VERSION = 5

export const register = async ({dispatch}, {username, email, password}) => {
  await Api.createUser({username, email, password})
  await dispatch('logIn', {username, password})
}

export const autoLogIn = async ({dispatch}) => {
  let version = getLocalItem('version')
  if (!config.offline && (version === null || parseInt(version) !== LOCAL_STORAGE_VERSION)) {
    clearLocalItems()
  } else {
    let token = getLocalItem('token')
    if (config.offline && (!token)) {
      token = 0
    }
    dispatch('logIn', {token})
  }
}

export const logIn = async (
  {commit, dispatch},
  {username, password, token}
) => {
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
  async ({commit, state: {token, user, currentAssessment}}, data) => {
    if (user) {
      await Api.registerUserResult(
        user.id,
        currentAssessment.id,
        data,
        token
      )
    }
    commit(mutations.ASSESSMENT_RESULT, {
      id: currentAssessment.id,
      result: data
    })
  }

export const selectCourse = async ({commit, state}, {id}) => {
  let {user, token} = state
  let assessments = await Api.getAllCourseAssessments(id)
  if (user) {
    let results = await Api.getAllUserResults(user.id, token)
    assessments.forEach(assessment => {
      let result = results.reduce((selectedResult, currentResult) => {
        if (currentResult.assessmentId === assessment.id) {
          if (selectedResult && selectedResult.passed && !currentResult.passed
          ) {
            return selectedResult
          } else {
            return currentResult
          }
        }
        return selectedResult
      }, null)
      if (result) {
        assessment.visited = true
        assessment.passed = result.passed
        assessment.solution = result.solution
      }
    })
  }
  if (token !== state.token) {
    throw 'token changed, abandon current course data' // eslint-disable-line no-throw-literal
  }
  commit(mutations.COURSE_SELECTION, {course: assessments})
}

export const selectAssessment = async ({dispatch, commit, state}, {id}) => {
  commit(mutations.ASSESSMENT_SELECTION, {id})
  await dispatch('registerCurrentAssessmentResult', {})
}

export const selectPreviousAssessment = ({dispatch, state}) => {
  let currentPosition = null
  for (let index = 0; index < state.currentCourse.length; index++) {
    let currentItem = state.currentCourse[index]
    if (currentItem.id === state.currentAssessment.id) {
      currentPosition = index
      break
    }
  }
  if (currentPosition !== null && state.currentCourse[currentPosition - 1]) {
    dispatch('selectAssessment', {
      id: state.currentCourse[currentPosition - 1].id
    })
  }
}

export const selectNextAssessment = ({dispatch, state}) => {
  let currentPosition = null
  for (let index = 0; index < state.currentCourse.length; index++) {
    let currentItem = state.currentCourse[index]
    if (currentItem.id === state.currentAssessment.id) {
      currentPosition = index
      break
    }
  }
  if (currentPosition !== null && state.currentCourse[currentPosition + 1]) {
    dispatch('selectAssessment', {
      id: state.currentCourse[currentPosition + 1].id
    })
  }
}

export const createProject = async ({commit, state}, {data}) => {
  let project = await Api.createProject(data, state.token)
  await Api.updateUser(state.user.id, {
    currentProjectId: project.id
  }, state.token)
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
