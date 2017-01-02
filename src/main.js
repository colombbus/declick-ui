import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import router from './router'
import store from './store/store'

import Application from './Application'

/* eslint-disable no-new */
new Vue({
  el: '#application',
  template: '<application/>',
  store,
  router,
  components: {
    Application
  }
})
