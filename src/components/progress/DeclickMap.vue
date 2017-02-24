<template lang="html">
  <div id="declickMap">
    <canvas id="map" ></canvas>
  </div>

</template>

<script>
import  Map  from'../../assets/js/map.js'
import config from '../../assets/config/declick.js'
import {mapState} from 'vuex'

import Api from '../../api.js'

var map = new Map();

export default {
  data () {
    return {
    }
  },
  computed: mapState(['current_step_index','current_step_name']),
  mounted () {
    // TODO: Find a better solution.
    let robotPath = __webpack_public_path__ + 'static/map-robot.svg'
    map.init("map", robotPath, (step) => {
      this.$store.dispatch('set_current_step_index',step.id)
      if (step.url) {
        this.$store.dispatch('set_current_step_url',step.url)
      }
      this.$router.push('/progress/circuit/run')
    }, () => {
        // Load path
        map.loadPathFromUI(this.$store.state.json, () => {
          // Load steps
          Api.retrieveSteps(1, steps => {
            map.loadStepsFromUI(steps)
            this.$store.state.steps = steps
          })
        })
    })
  },
  activated () {
    if (this.current_step_index > -1) {
        map.setCurrentStep(this.current_step_index, false);
    }
  },
  watch: {
    current_step_index() {
      map.updateState([{id:this.current_step_index,visited:true}])
      this.$store.dispatch('set_current_step_name',map.getStepName(this.current_step_index))
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
