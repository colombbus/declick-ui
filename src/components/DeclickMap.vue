<template lang="html">
  <div id="declickMap">
    <!--<div id="text"></div>-->
    <canvas id="map" ></canvas>
  </div>

</template>

<script>
import  Map  from'../assets/js/map.js'
import config from '../assets/config/declick.js'
import {mapState} from 'vuex'

var map = new Map();

export default {
  data () {
    return {
    }
  },
  computed: mapState(['current_step_index','current_step_name']),
  mounted () {
    map.init("map", "static/robot.svg", (index) => {
      //$('#declick-client-learn').attr('src',config.url.client+'learn.html#'+index+'?token='+this.$store.state.authorizations)
      this.$router.push('/progress/iframe')
      this.$store.dispatch('set_current_step_index',index)
    }, () => {
        // Load path
        map.loadPathFromUI(this.$store.state.json, () => {
            // Load steps
            map.loadStepsFromUI(this.$store.state.steps)
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
