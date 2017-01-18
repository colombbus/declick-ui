<template>
  <div id="application">
    <!--header -->
    <div id="headerContainer" :class="minimized || progressIframe ? 'displayNone' : 'displayBlock'">

      <!-- navigation -->
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
      <!-- end navigation -->
    </div>
    <div  :class="minimized ? 'displayBlock' : 'displayNone'">
      <SmallNavigationBar></SmallNavigationBar>
    </div>
    <div  :class="progressIframe ? 'displayBlock' : 'displayNone'">
      <ProgressSmallNavBar></ProgressSmallNavBar>
    </div>
    <!-- end header -->

    <!-- main -->
    <iframe id="declick-client-create" class="fullscreen-iframe"
        :class="this.$route.path == '/create' ? 'displayBlock' : 'displayNone'" :src="urlCreate"
      ></iframe>
    <iframe id="declick-client-learn" class="fullscreen-iframe"
        :class="this.$route.path == '/progress/iframe' ? 'displayBlock' : 'displayNone'" :src="urlLearn"
      ></iframe>
    <div id="mainContainer" :class="this.$route.path == '/create' ? 'displayNone' : 'displayBlock'">
      <keep-alive>
        <router-view></router-view>
      <keep-alive>
    </div>
    <!-- end main -->

    <!-- footer -->
    <footer v-if="!minimized">
      <div id="footerBottom">
        <div id="footerBottomLeft">
          <p>
            Réalisé par
            <a
              target="_blank"
              href="http://www.colombbus.org/"
            >Colombbus</a>
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
import SmallNavigationBar from './components/SmallNavigationBar'
import declickConfig from './assets/config/declick.js'

import AuthenticatedUserBox from 'components/navigation/AuthenticatedUserBox'
import AuthenticationModal from 'components/AuthenticationModal'
import Breadcrumb from 'components/navigation/Breadcrumb'
import HeaderBar from 'components/navigation/HeaderBar'
import ProgressSmallNavBar from 'components/ProgressSmallNavBar'

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
    HeaderBar,
    NavigationBar,
    SmallNavigationBar,
    ProgressSmallNavBar
  },
  computed: {
    minimized () {
      /*return this.$route.matched[0] &&
        this.$route.matched[0].path === '/create'*/
        //return false
        return this.$route.path==='/create'

    },
    progressIframe(){
      return this.$route.path==='/progress/iframe'
    },
    urlCreate () {
      return declickConfig.url.client + 'index.html#token=' + this.$store.state.authorizations
    },
    urlLearn () {
      return declickConfig.url.client + 'learn.html#id=4&token=' + this.$store.state.authorizations
    },
    ...mapState(['authenticatedUser', 'current_circuit'])
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
