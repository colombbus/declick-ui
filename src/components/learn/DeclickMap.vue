<template lang="html">
  <div>
    <div id="declickMap">
      <canvas id="map" ></canvas>
      <button
        @click="resetResults"
        v-if="useOfflineMode"
        type="button"
        id="reset-results-button"
      >Réinitialiser le parcours</button>
    </div>
  </div>
</template>

<script>
/* global __webpack_public_path__ */

import config from 'assets/config/declick'
import Storage from 'src/storage'
import Map from '../../assets/js/map.js'
import {mapState, mapActions} from 'vuex'

import mapConfig from './mapConfig'

var map = new Map()

export default {
  data () {
    return {
      useOfflineMode: config.offline
    }
  },
  computed: mapState(['currentAssessment', 'currentCourse', 'user']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + // eslint-disable-line camelcase
      'static/map-robot.svg'
    map.init('map', robotPath, (step) => {
      this.selectAssessment({id: step.id})
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
      map.setCurrentStep(this.currentAssessment.id, false)
    }
  },
  watch: {
    currentAssessment (newStep) {
      map.updateState([{
        id: newStep.id,
        visited: newStep.visited,
        passed: newStep.passed
      }])
    },
    'currentAssessment.passed' (value) {
      map.updateState([{
        id: this.currentAssessment.id,
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
    resetResults () {
      Storage.resetUserResults()
      this.loadSteps()
    },
    async loadSteps () {
      await this.selectCourse({id: this.$route.params.id})
      map.loadStepsFromUI(this.currentCourse)
    },
    ...mapActions(['selectCourse', 'selectAssessment'])
  }
}
</script>

<style lang="css">
#declickMap {
    position: relative;
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
#reset-results-button {
  position: absolute;
  right: 20px;
  bottom: 0;
  padding: 3px 5px;
  border-radius: 5px 5px 0 0;
  border-width: 0;
  color: white;
  background-color: brown;
  outline: 0;
}
#reset-results-button:hover {
  background-color: darkred;
}
</style>
