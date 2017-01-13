<template>
  <div id="application">
    <!--header -->
    <div id="headerContainer" :class="minimized ? 'displayNone' : 'displayBlock'">

      <!-- navigation -->
      <navigation-bar></navigation-bar>
      <!-- end navigation -->

      <breadcrumb></breadcrumb>
    </div>
    <div  :class="minimized ? 'displayBlock' : 'displayNone'">
      <SmallNavigationBar></SmallNavigationBar>
    </div>
    <!-- end header -->

    <!-- main -->
    <iframe id="declick-client-create" class="fullscreen-iframe"
        :class="this.$route.path == '/create' ? 'displayBlock' : 'displayNone'" :src="urlCreate"
      ></iframe>
    <iframe id="declick-client-learn" class="fullscreen-iframe"
        :class="this.$route.path == '/progress' && current_circuit == {} ? 'displayBlock' : 'displayNone'" :src="urlLearn"
      ></iframe>
    <div id="mainContainer" :class="this.$route.path == '/create' ? 'displayNone' : 'displayBlock'">
      <router-view></router-view>
    </div>
    <!-- end main -->

    <!-- footer -->
    <footer v-if="!minimized">
      <div id="footerBottom">
        <div id="footerBottomLeft">
          <p>Réalisé par <a target="_blank" href="http://www.colombbus.org/">
            Colombbus</a> et <a target="_blank" href="http://www.france-ioi.org/">
              France-ioi</a>
            </p>
        </div>
        <div id="footerBottomRight">
          <a href="mailto:declick@colombbus.org">Contactez-nous ! <i class="glyphicon glyphicon-envelope"></i></a>
        </div>
      </div>
    </footer>
    <!-- end footer -->

  </div>
</template>

<script>
import NavigationBar from './components/navigation/NavigationBar'
import Breadcrumb from './components/Breadcrumb'
import SmallNavigationBar from './components/SmallNavigationBar'
import declickConfig from './assets/config/declick.js'

import {mapSate} from 'vuex'
export default {
  components: {
    NavigationBar,
    Breadcrumb,
    SmallNavigationBar
  },
  computed: {
    mapSate:(['current_circuit']),
    minimized () {
      /*return this.$route.matched[0] &&
        this.$route.matched[0].path === '/create'*/
        //return false
        return this.$route.path==='/create'

    },
    urlCreate () {
      return declickConfig.url.client + 'index.html#token=' + this.$store.state.authorizations
    },
    urlLearn () {
      return declickConfig.url.client + 'learn.html#id=4&token=' + this.$store.state.authorizations
    }
  },
  updated () {
    console.log(this.$route.name)
  }
}
</script>


<style>
.fullscreen-iframe {
  height: calc(100vh - 60px);
  width: 100%;
  border: none;
  overflow:hidden;
}
@font-face {
	font-family: 'Rubik';
	src: url('assets/font/Rubik-Regular.eot');
	src: url('assets/font/Rubik-Regular.eot?#iefix') format('embedded-opentype'),
		url('assets/font/Rubik-Regular.woff') format('woff'),
		url('assets/font/Rubik-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

  .displayNone {
    display:none;
  }

  #mainContainer {
    min-height: calc(100vh - 245px);
  }

  #breadcrumb{
    padding-left: 0px;
    height: 25px;
    background-color: #480A2A;
    font-weight: bold;
  }
  #footerBottom{
    background-color: #480A2A;
    flex-direction: row;
    justify-content: space-around;
    color: #D1D718;
    font-weight: normal;
    font-size: 12pt;
    margin-top: 50px;
    border-top: 1px solid #D1D718;
    height:25px;
  }
  #footerBottom  p{
    margin: 0;
  }
  #footerBottom  a {
    color: #D1D718;
    border-bottom: 1px solid #E52C20;
  }
  #footerBottom div{
    display: inline-block;
    width: 49.880222222%;
  }
  #footerBottomLeft{
    float: left;
    text-align: left;
    padding-left: 25px;
  }
  #footerBottomRight{
    padding-right: 25px;
    text-align: right;
  }
</style>
