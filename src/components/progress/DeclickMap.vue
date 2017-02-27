<template lang="html">
  <div id="declickMap">
    <canvas id="map" ></canvas>
  </div>

</template>

<script>
import  Map  from'../../assets/js/map.js'
import config from '../../assets/config/declick.js'
import { mapActions, mapState, mapMutations } from 'vuex'

import * as mutations from '../../store/mutation-types.js'

import Api from '../../api.js'

var map = new Map();

export default {
  data () {
    return {
    }
  },
  computed: mapState(['currentStep', 'steps']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + 'static/map-robot.svg'
    map.init("map", robotPath, (step) => {
      this.setCurrentStep(step.id)
      this.$router.push({name: 'step', params: {id:this.$route.params.id}})
    }, () => {
        // Load path
        map.loadPathFromUI(this.$store.state.json, () => {
          // Load steps
          Api.retrieveSteps(this.$route.params.id, steps => {
            map.loadStepsFromUI(steps)
            this.setSteps(steps)
            /*
            this.$store.commit(mutations.SET_STEPS, steps)
            this.$store.commit(mutations.SET_CURRENT_STEP, 1000)
            console.debug(this.$store.state.currentStep)
            this.selectNextStep()
            console.debug(this.$store.state.currentStep)
            this.selectPreviousStep()
            this.selectPreviousStep()
            console.debug(this.$store.state.currentStep)
            */
          })
        })
    })
  },
  activated () {
    if (this.currentStep) {
      map.setCurrentStep(this.currentStep.position, false)
    }
  },
  watch: {
    currentStep(newStep) {
      map.updateState([{id:newStep.position,visited:true}])
    }
  },
  methods: {
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
