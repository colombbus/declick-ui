<template>
  <div id="navigation-bar-small">
    <router-link to="/" id="home-control-small"></router-link>
    <div id="page-title">Créer</div>
    <router-link to="/" id="map-control-small"></router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
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
  background-image: url('../assets/img/back.png');
}

#map-control-small:hover {
  background-image: url('../assets/img/back-hover.png')
}
</style>
