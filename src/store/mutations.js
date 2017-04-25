import Vue from 'vue'
import * as mutations from './mutation-types.js'

export default {
  [mutations.LOG_IN] (state, {token, user}) {
    state.token = token
    state.user = user
  },
  [mutations.LOG_OUT] (state) {
    state.token = null
    state.user = null
    state.currentProject = null
  },
  [mutations.PROJECT_SELECTION] (state, {project}) {
    state.currentProject = project
  },
  [mutations.COURSE_SELECTION] (state, {course}) {
    state.currentAssessment = null
    state.currentCourse = course
  },
  [mutations.ASSESSMENT_SELECTION] (state, {id}) {
    let [assessment] = state.currentCourse.filter(
      assessment => assessment.id === id
    )
    if (assessment) {
      state.currentAssessment = assessment
    } else {
      state.currentAssessment = null
    }
  },
  [mutations.ASSESSMENT_RESULT] (state, {id, result}) {
    let [assessment] = state.currentCourse.filter(
      assessment => assessment.id === id
    )
    if (assessment) {
      Vue.set(assessment, 'passed', result.passed)
      // assessment.passed = result.passed
      assessment.visited = result.visited
      assessment.solution = result.solution
    }
  }
}
