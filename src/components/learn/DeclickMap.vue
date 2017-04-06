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
import { mapActions, mapState, mapMutations } from 'vuex'

import * as mutations from '../../store/mutation-types.js'
import mapConfig from './mapConfig'

import Api from '../../api.js'

var map = new Map()

export default {
  data () {
    return {
    }
  },
  computed: mapState(['currentStep', 'steps', 'authenticatedUser']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + // eslint-disable-line camelcase
      'static/map-robot.svg'
    map.init('map', robotPath, (step) => {
      this.setCurrentStep(step.position)
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
    if (this.currentStep) {
      map.setCurrentStep(this.currentStep.position, false)
    }
  },
  watch: {
    currentStep (newStep) {
      map.updateState([{
        position: newStep.position,
        visited: newStep.visited,
        passed: newStep.passed
      }])
    },
    'currentStep.passed' (value) {
      map.updateState([{
        position: this.currentStep.position,
        passed: value
      }])
    },
    authenticatedUser () {
      this.loadSteps()
    },
    '$route.params.id' () {
      this.loadSteps()
    }
  },
  methods: {
    loadSteps() {
      Api.retrieveSteps(this.$route.params.id, steps => {
        map.loadStepsFromUI(steps)
        this.setSteps(steps)
      })
    },
    ...mapMutations({
      setSteps: mutations.SET_STEPS,
      setCurrentStep: mutations.SET_CURRENT_STEP
    }),
    ...mapActions(['selectPreviousStep', 'selectNextStep'])
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
