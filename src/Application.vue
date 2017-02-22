<template>
  <div id="application">
    <!--header -->
    <div v-show="!minimized & !progressIframe">

      <header-bar></header-bar>
      <authenticated-user-box
        v-if="authenticatedUser"
      ></authenticated-user-box>
      <navigation-bar
        @show-authentication-modal="isAuthenticationModalVisible = true"
      ></navigation-bar>
      <breadcrumb></breadcrumb>
      <authentication-modal
        v-if="isAuthenticationModalVisible"
        @close="isAuthenticationModalVisible = false"
      ></authentication-modal>
    </div>
    <div v-show="minimized">
      <SmallNavigationBar></SmallNavigationBar>
      <CreateNavigationBar></CreateNavigationBar>
    </div>
    <div v-show="progressIframe">
      <ProgressSmallNavBar></ProgressSmallNavBar>
    </div>

    <!-- end header -->

    <!-- main -->
    <div id="mainContainer">
      <CircuitRun></CircuitRun>
      <Create></Create>
      <keep-alive>
        <router-view></router-view>
      <keep-alive>
    </div>

    <!-- end main -->

    <footer-bar v-show="!minimized"></footer-bar>
  </div>
</template>

<script>
import NavigationBar from './components/navigation/MainMenuBar'
import SmallNavigationBar from './components/SmallNavigationBar'
import CreateNavigationBar from './components/CreateNavigationBar'

import declickConfig from './assets/config/declick.js'

import AuthenticatedUserBox from 'components/AuthenticatedUserBox'
import AuthenticationModal from 'components/AuthenticationModal'
import Breadcrumb from 'components/navigation/Breadcrumb'
import HeaderBar from 'components/navigation/HeaderBar'
import FooterBar from 'components/navigation/FooterBar'

import ProgressSmallNavBar from 'components/ProgressSmallNavBar'
import CircuitRun from 'components/progress/CircuitRun'
import Create from 'components/Create'


import { mapState } from 'vuex'
export default {
  data () {
    return {
      isAuthenticationModalVisible: false
    }
  },
  components: {
    AuthenticatedUserBox,
    AuthenticationModal,
    Breadcrumb,
    FooterBar,
    HeaderBar,
    NavigationBar,
    SmallNavigationBar,
    ProgressSmallNavBar,
    CircuitRun,
    Create,
    CreateNavigationBar
  },
  computed: {
    minimized () {
        return this.$route.path==='/create'
    },

    displayCreate(){
      if(this.$route.path.match(/\/create/) != null){
        return true
      }
    },
    progressIframe(){
      return this.$route.path==='/progress/circuit/run'
    },
    ...mapState(['authenticatedUser', 'current_circuit'])
  },
  updated () {
    console.log(this.$route.name)
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

#mainContainer {
  /*
  header-bar: 100px
  main-menu: 45px
  breadcrumb: 25px
  footer-bar: 25px
  total: 195px
  */
  /*height: calc(100% - 195px);*/
}

.right-aligned {
  float: right;
}

  .displayNone {
    display:none;
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
