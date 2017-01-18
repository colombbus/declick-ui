<template lang="html">
  <div id="declickMap">
    <!--<div id="text"></div>-->
    <canvas id="map" ></canvas>
  </div>

</template>

<script>
import  map  from'../assets/js/map.js'
var bot = require('../assets/robot.svg')
import url from '../assets/config/declick.js'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      map

    }
  },
  computed: mapState(['map_visited','map_passed']),
  mounted () {

    this.map.init("map", bot, (index) => {
      this.$store.dispatch('set_map_visited',{id:index,visited:true})

      if(index != this.map_visited.id)
        this.$store.dispatch('set_map_passed',{id:index,passed:true})

    }, () => {
        // Load path
        this.map.loadPathFromUI(this.$store.state.json, () => {
            // Load steps
            this.map.loadStepsFromUI(this.$store.state.steps)
        })
    })
  },
  watch:{
    map_visited(){
      if(this.map.steps[this.map_visited.id].chapter == false){

        $('#declick-client-learn').attr('src',url.url.client+'learn.html#'+this.map_visited.id+'?token='+this.$store.state.authorizations)
        this.$router.push('/progress/iframe')
        this.$store.dispatch('set_map_current_step_name',this.map.steps[this.map_visited.id].name)
        this.map.updateState([this.map_visited])
        this.map.goToCurrentStep(this.map_visited.id+1, true);
      }else{


        this.$router.push('/declickMap')
        console.log(this.map.steps);
        this.map.updateState([{id:this.map_visited.id,passed:true}])
        this.map.goToCurrentStep(this.map_visited.id+1, true);

      }

    },
    map_passed(){
      this.map.updateState([this.map_passed])
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
