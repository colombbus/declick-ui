<template>
  <div>
    <nav>
      <header-bar></header-bar>
      <authenticated-user-box
        v-if="authenticatedUser"
      ></authenticated-user-box>
      <div id="main-menu">
        <ul>
          <li>
            <router-link
              to="/explore"
              id="main-menu-explore-link"
              class="menu-link menu-illustrated-link"
            >Découvrir</router-link>
          </li>
          <li>
            <router-link
              to="/progress"
              id="main-menu-progress-link"
              class="menu-link menu-illustrated-link"
            >Progresser</router-link>
          </li>
          <li>
            <router-link
              to="/create"
              id="main-menu-create-link"
              class="menu-link menu-illustrated-link"
            >Créer</router-link>
          </li>
          <li v-if="!authenticatedUser">
            <a
              @click="isAuthenticationModalVisible = true"
              id="main-menu-log-in-link"
              class="menu-link menu-illustrated-link"
            >Se connecter</a>
          </li>
          <li v-else>
            <a
              @click="logOut"
              class="menu-link"
            >Se déconnecter</a>
          </li>
        </ul>
      </div>
      <breadcrumb></breadcrumb>
    </nav>
    <authentication-modal
      v-if="isAuthenticationModalVisible"
      @close="isAuthenticationModalVisible = false"
    ></authentication-modal>
  <div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import AuthenticatedUserBox from './AuthenticatedUserBox'
import AuthenticationModal from '../AuthenticationModal'
import Breadcrumb from './Breadcrumb'
import HeaderBar from './HeaderBar'

export default {
  data () {
    return {
      isAuthenticationModalVisible: false
    }
  },
  computed: mapState(['authenticatedUser']),
  methods: mapActions(['logOut']),
  components: {
    AuthenticatedUserBox,
    AuthenticationModal,
    Breadcrumb,
    HeaderBar
  }
}
</script>

<style>
#main-menu ul {
  float: right;
}

#main-menu li {
  float: left;
  height: 38px;
  width: 150px;
  margin: 0;
  text-align: center;
  list-style-type: none;
}

#main-menu {
  min-height: 45px;
  height: 45px;
  margin: 0;
  border-radius: 0;
  border-top: 7px solid #6F3B51;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  background-color: #642D46;
  background-image: url(~assets/image/waves.png);
  background-repeat: repeat-x;
}

#main-menu a {
  padding: 0;
  font-family: Rubik, sans-serif;
  font-size: 18.6667px;
  color: white;
  outline: 0;
  cursor: pointer;
}

#main-menu .menu-link {
  display: block;
  line-height: 38px;
  text-decoration: none;
}

#main-menu li .menu-link.router-link-active {
  color: #D1D718;
  background-color: #480A2A;
}

#main-menu .menu-illustrated-link:after {
  float: left;
  content: "";
  display: block;
  height: 100px;
  width: 150px;
  position: relative;
  margin-top: -138px;
  opacity: 0;
  background-repeat: no-repeat;
  background-position: bottom 10px center;
  transition: opacity 0.8s ease-in-out;
}

#main-menu .menu-illustrated-link.router-link-active:after,
#main-menu .menu-link:hover:after {
  opacity: 100;
}

#main-menu-explore-link:after {
  background-image: url(~assets/image/explore-robot.png);
}

#main-menu-progress-link:after {
  background-image: url(~assets/image/progress-robot.png);
}

#main-menu-create-link:after {
  background-image: url(~assets/image/create-robot.png);
}

#main-menu-log-in-link:after {
  background-image: url(~assets/image/log-in-robot.png);
}
</style>
