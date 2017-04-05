import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import router from './router'
import store from './store'

import Application from './Application'

import config from 'assets/config/declick'

document.domain = config.domain

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<application/>',
  store,
  router,
  components: {
    Application
  },
  created () {
    if (localStorage.getItem('authorizations') &&
      localStorage.getItem('user')
    ) {
      let auth = localStorage.getItem('authorizations')
      let user = localStorage.getItem('user').split('/')
      this.$store.commit('AUTHENTICATION_SUCCESS', auth)
      this.$store.commit('SET_USER', {
        default_project_id: user[0],
        email: user[1],
        id: user[2],
        username: user[3]})
      this.$store.dispatch('get_project', user[0])
      this.$store.dispatch('getCurrentUserProjects')
    }
  }
})
