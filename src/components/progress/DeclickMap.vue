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
  computed: mapState(['currentStep', 'current_step_index','current_step_name', 'steps']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + 'static/map-robot.svg'
    map.init("map", robotPath, (step) => {
      this.setCurrentStep(step.index)
      /*this.$store.dispatch('set_current_step_index',step.id)
      if (step.url) {
        this.$store.dispatch('set_current_step_url',step.url)
      }
      this.$router.push('/progress/circuit/run')*/
    }, () => {
        // Load path
        map.loadPathFromUI(this.$store.state.json, () => {
          // Load steps
          Api.retrieveSteps(this.$route.params.id, steps => {
            map.loadStepsFromUI(steps)
            this.setSteps(steps)
            console.log("setting current step")
            this.setCurrentStep(1)
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
      map.setCurrentStep(this.currentStep.index, false)
    }
    /*if (this.current_step_index > -1) {
        map.setCurrentStep(this.current_step_index, false);
    }*/
  },
  watch: {
    currentStep() {
      console.log("current step changed")
      map.updateState([{id:this.currentStep.index,visited:true}])
    }/*,
    current_step_index() {
      map.updateState([{id:this.current_step_index,visited:true}])
      this.$store.dispatch('set_current_step_name',map.getStepName(this.current_step_index))
    }*/
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
