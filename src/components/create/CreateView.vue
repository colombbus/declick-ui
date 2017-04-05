<template lang="pug">
.create-view
  create-header-bar
  create-menu-bar(
    @showProjectList="view = 'ProjectList'"
  )
  transition(
    v-on:before-enter="beforeEnter"
    v-on:enter="onEnter"
    v-on:leave="onLeave"
    v-bind:css="false"
  )
    .slider(v-if='view')
      keep-alive
        component(
          @showView="showView"
          @close='view = null',
          :is='view',
          :params='params'
          v-if='view'
        )
  iframe.frame(:src='frameUrl')
</template>

<script>
/* global $ */
import 'jquery'
import {mapState, mapMutations} from 'vuex'
import CreateHeaderBar from './CreateHeaderBar'
import CreateMenuBar from './CreateMenuBar'
import ProjectCreator from './ProjectCreator'
import ProjectDetails from './ProjectDetails'
import ProjectList from './ProjectList'
import * as mutations from 'store/mutation-types'
import config from 'assets/config/declick'

export default {
  data () {
    return {
      view: null,
      params: null
    }
  },
  computed: {
    frameUrl () {
      return `${config.clientUrl}index.html` +
        `#editor=${this.editor}` +
        `&token=${this.authorizations}` +
        `&id=${this.currentProject.id}`
    },
    ...mapState(['authorizations', 'currentProject', 'editor'])
  },
  mounted () {
    window.addEventListener('message', ({data}) => {
      switch (data) {
        case 'switchEditor':
          this.setEditor(true)
          break
        case 'switchView':
          this.setEditor(false)
          break
      }
    }, false)
  },
  methods: {
    showView (payload) {
      if (typeof payload === 'string') {
        this.view = payload
      } else {
        this.view = payload.view
        this.params = payload.params
      }
    },
    beforeEnter (element) {
      $(element).hide()
    },
    onEnter (element, done) {
      $(element).slideDown(1000, done)
    },
    onLeave (element, done) {
      $(element).slideUp(1000, done)
    },
    ...mapMutations({
      setEditor: mutations.SET_EDITOR
    })
  },
  components: {
    CreateHeaderBar,
    CreateMenuBar,
    ProjectCreator,
    ProjectDetails,
    ProjectList
  }
}
</script>

<style lang="sass" scoped>
.slider
  position: absolute
  height: calc(100vh - 112px)
  width: 100%
  padding: 10px
  background-color: #FFF
  overflow: auto

.frame
  height: calc(100vh - 112px)
  width: 100%
  padding: 0 8px 8px 8px
  border: none
  overflow: hidden
</style>
