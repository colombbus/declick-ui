<template>
  <nav class="navbar navbar-default" id="main-menu">
    <div class="container-fluid">
      <ul class="nav navbar-nav">
        <li>
          <router-link
            to="/explore"
            id="main-menu-explore"
          >Découvrir</router-link>
        </li>
        <li>
          <router-link
            to="/progress"
            id="main-menu-progress"
          >Progresser</router-link>
        </li>
        <li>
          <router-link
            to="/create"
            id="main-menu-create"
          >Créer</router-link>
        </li>
        <li v-if="connected">
          <router-link to="/administration">Administration</router-link>
        </li>
        <li v-if="!connected">
          <a
            @click="showAuthenticationModal = true"
            id="main-menu-log-in"
            class="interactive"
          >Se connecter</a>
          <AuthenticationModal
            v-if="showAuthenticationModal"
            @close="showAuthenticationModal = false"
          ></AuthenticationModal>
        </li>
        <li v-else>
          <a class="interactive" @click="disconnect">Se déconnecter</a>
          <router-link
            to="/me"
            id="main-menu-username"
          >{{current_user.username}}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

import AuthenticationModal from './AuthenticationModal'

export default {
  data () {
    return {
      showAuthenticationModal: false
    }
  },
  computed: mapState(['connected', 'current_user']),
  components: {
    AuthenticationModal
  },
  methods:{
    disconnect(){
      localStorage.removeItem('user')
      localStorage.removeItem('authorizations')
      this.$store.dispatch('disconnectMe','')
    }
  }
}
</script>

<style>
.container-fluid {
  padding: 0
}

.interactive {
  cursor: pointer;
}

#main-menu {
  min-height: 45px;
  height: 45px;
  margin: 0px;
  border-radius: 0px;
  border-top: 7px solid #6F3B51;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  background-color: #642D46;
  background-image: url(../assets/img/waves.png);
  background-repeat: repeat-x;
}

#main-menu a {
  width: 150px;
  padding: 0;
  line-height: 38px;
  vertical-align: middle;
  text-align: center;
  font-family: Rubik, sans-serif;
  font-size: 18.6667px;
  color: white;
}

#main-menu a.router-link-active {
  background-color: #480A2A;
  color: #D1D718;
}

#main-menu ul {
  float: right;
}

#main-menu a:after {
  float: left;
  content: "";
  display: block;
  height: 90px;
  width: 150px;
  position: relative;
  margin-top: -138px;
  opacity: 0;
  background-repeat: no-repeat;
  background-position: bottom center;
  transition: opacity 0.8s ease-in-out;
}

#main-menu a.router-link-active:after,
#main-menu a:hover:after {
  opacity: 100;
}

#main-menu-explore:after {
  background-image: url(../assets/img/explore-robot.png);
}

#main-menu-progress:after {
  background-image: url(../assets/img/progress-robot.png);
}

#main-menu-create:after {
  background-image: url(../assets/img/create-robot.png);
}

#main-menu-log-in:after {
  background-image: url(../assets/img/log-in-robot.png);
}

#main-menu #main-menu-username {
  display: block;
  float: left;
  position: relative;
  top: -83px;
  line-height: 35px;
  background-color: #642D46;
}

#main-menu #main-menu-username.router-link-active {
  color: white;
  background-color: #642D46;
}

#main-menu-username:hover {
  text-decoration: underline;
}
</style>
