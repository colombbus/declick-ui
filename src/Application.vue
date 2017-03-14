<template>
  <div
    id="application"
    :style="{ overflow: viewUseFullscreen ? 'hidden' : null }"
  >
    <div v-show="!viewUseFullscreen">
      <header-bar></header-bar>
      <authenticated-user-box
        v-if="authenticatedUser"
      ></authenticated-user-box>
      <main-menu></main-menu>
      <breadcrumb></breadcrumb>
    </div>
    <div id="main-container">
      <CircuitRun v-show="this.$route.name == 'step'"></CircuitRun>
      <Create v-show="this.$route.path == '/create'"></Create>
      <keep-alive>
        <router-view :key="viewReuseKey"></router-view>
      </keep-alive>
    </div>
    <footer-bar v-show="!viewUseFullscreen"></footer-bar>
  </div>
</template>

<script>
import R from 'ramda'
import AuthenticatedUserBox from 'components/AuthenticatedUserBox'
import Breadcrumb from 'components/navigation/Breadcrumb'
import CircuitRun from 'components/progress/CircuitRun'
import Create from 'components/Create'
import FooterBar from 'components/navigation/FooterBar'
import HeaderBar from 'components/navigation/HeaderBar'
import MainMenu from 'components/navigation/MainMenu'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      isAuthenticationModalVisible: false
    }
  },
  computed: {
    viewReuseKey () {
      return R.last(this.$route.matched).meta.reuseKey || null
    },
    viewUseFullscreen () {
      return this.$route.matched.some(match => match.meta.useFullscreen)
    },
    ...mapState(['authenticatedUser'])
  },
  components: {
    AuthenticatedUserBox,
    Breadcrumb,
    CircuitRun,
    Create,
    FooterBar,
    HeaderBar,
    MainMenu
  }
}
</script>

<style>
@font-face {
	font-family: 'Rubik';
	src: url('assets/font/Rubik-Regular.eot');
	src: url('assets/font/Rubik-Regular.eot?#iefix') format('embedded-opentype'),
		url('assets/font/Rubik-Regular.woff') format('woff'),
		url('assets/font/Rubik-Regular.ttf') format('truetype');
	font-weight: normal;
	font-style: normal;
}

.authenticated-user-box {
  float: right;
  position: relative;
  top: -3px;
  margin-top: -38px;
}

html, body, #application {
  height: 100%;
  margin: 0;
  padding: 0;
}

#main-container {
  /*
  header-bar: 100px
  main-menu: 45px
  breadcrumb: 25px
  footer-bar: 25px
  total: 195px
  */
  min-height: calc(100% - 195px);
  overflow: hidden;
}
</style>
