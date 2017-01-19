<template>
  <div id="navigation-bar-small">
    <router-link to="/" id="home-control-small"></router-link>
    <div id="page-title">{{this.current_step_name}}</div>
    <router-link to="/DeclickMap" id="map-control-small" ></router-link>
    <div id="mapController">
      <div id="leftLink" @click="previous()" ></div>
      <div id="rightLink" @click="next()"></div>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {}
  },
  computed: mapState(['current_step_index', 'current_step_name']),
  methods:{
    previous(){
        this.$store.dispatch('set_current_step_index',this.current_step_index-1)
    },
    next(){
      this.$store.dispatch('set_current_step_index',this.current_step_index + 1)
    },
    toggleMapIframe(){
      $('#declick-client-learn').css('display','none')
      $('#map').css('display','block')
    }
  }
}
</script>

<style>
#mapController div{
  cursor: pointer
}
#rightLink:hover {
    background-image: url('../assets/img/arrow-right-hover.png');
}
#leftLink:hover {
    background-image: url('../assets/img/arrow-left-hover.png');
}
#rightLink {
    background-image: url('../assets/img/arrow-right.png');
    content: '';
    position: absolute;
    right: 115px !important;
    top: 9px;
    background-color: transparent;
    height: 33px;
    width: 33px;
}
#leftLink {
    position: absolute;
    content: '';
    background-image: url('../assets/img/arrow-left.png');
    right: 165px;
    top: 9px;
    left: initial !important;
    background-color: transparent;
    transform: initial;
    -webkit-transform: initial;
    height: 33px;
    width: 33px;
}
#navigation-bar-small {
  padding: 0px 10px;
  background-color: #480A2A;
  border-bottom: 5px solid #D1D718;
  height: 55px;
}

#page-title {
  margin-left: 25px;
  font-weight: 700;
  font-size: 25pt;
  color: white;
  font-family: 'Rubik', sans-serif;
  float: left;
  display: inline-block;
}

#home-control-small {
  display: inline-block;
  float: left;
  width: 45px;
  height: 45px;
  cursor: pointer;
  background-image: url('../assets/img/dk.png');
}

#map-control-small {
  box-sizing: content-box;
  display: inline-block;
  float: right;
  width: 42px;
  height: 42px;
  cursor: pointer;
  background-image: url('../assets/img/carte.png');
}

#map-control-small:hover {
  background-image: url('../assets/img/carte-hover.png')
}
</style>
