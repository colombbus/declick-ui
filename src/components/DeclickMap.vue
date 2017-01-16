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
      map,
      declickToken:''
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
      $('#declick-client-learn').attr('src',url.url.client+'learn/'+this.map.steps[this.map_visited.id].name.replace(' ','-').toLowerCase()+'-'+this.map_visited.id+'?token='+this.$store.state.authorizations)
      this.map.updateState([this.map_visited])
      $('#declick-client-learn').css('display','block')
      $('#map').css('display','none')
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
