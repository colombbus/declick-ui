<template lang="html">
  <div>
    <div id="declickMap">
      <canvas id="map" ></canvas>
    </div>
  </div>
</template>

<script>
/* global __webpack_public_path__ */

import Map from '../../assets/js/map.js'
import {mapActions, mapState} from 'vuex'

import * as mutations from '../../store/mutation-types'
import mapConfig from './mapConfig'

import Api from '../../api.js'

var map = new Map()

export default {
  data () {
    return {
    }
  },
  computed: mapState(['currentAssessment', 'currentCourse', 'user']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + // eslint-disable-line camelcase
      'static/map-robot.svg'
    map.init('map', robotPath, (step) => {
      this.$store.commit(mutations.ASSESSMENT_SELECTION, {id: step.id})
      this.$router.push({name: 'step', params: {id: this.$route.params.id}})
    }, () => {
      // Load path
      map.loadPathFromUI(mapConfig, () => {
        // Load steps
        this.loadSteps()
      })
    })
  },
  activated () {
    if (this.currentAssessment) {
      map.setCurrentStep(this.currentAssessment.position, false)
    }
  },
  watch: {
    currentAssessment (newStep) {
      map.updateState([{
        position: newStep.position,
        visited: newStep.visited,
        passed: newStep.passed
      }])
    },
    'currentAssessment.passed' (value) {
      map.updateState([{
        position: this.currentStep.position,
        passed: value
      }])
    },
    user () {
      this.loadSteps()
    },
    '$route.params.id' () {
      this.loadSteps()
    }
  },
  methods: {
    loadSteps () {
      Api.getAllCourseAssessments(this.$route.params.id).then(steps => {
        map.loadStepsFromUI(steps)
        this.$store.commit(mutations.COURSE_SELECTION, {course: steps})
      })
    }
  }
}
</script>

<style lang="css">
#declickMap {
    background-color:#000000;
    height: calc(100vh - 195px)
}
#map {
    width:100%;
    height:100%;
    background-color:#46102A;
    margin-right:auto;
    margin-left:auto;
}
#text {
    color:#FFFFFF;
}
</style>
