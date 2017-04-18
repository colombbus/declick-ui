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
  iframe.wikiFrame(:src='wikiUrl', ref='wiki')
  iframe.frame(:src='frameUrl', ref='create')
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
      params: null,
      wikiUrl: config.wikiUrl,
      wiki: false
    }
  },
  computed: {
    frameUrl () {
      return `${config.clientUrl}index.html` +
        `#editor=${this.editor}` +
        `&token=${this.authorizations}` +
        (this.currentProject ? `&id=${this.currentProject.id}` : '') +
        `&wiki=${this.wiki}`
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
        case 'toggleWiki':
          this.toggleWiki()
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
    toggleWiki () {
      let wikiFrame = $(this.$refs.wiki)
      let createFrame = $(this.$refs.create)
      wikiFrame.stop()
      createFrame.stop()
      this.wiki = !(this.wiki)
      if (this.wiki) {
        wikiFrame.css("left", "-365px").show().animate({left: "0"}, 500)
        createFrame.animate({"padding-left": "365px"}, 500)
      } else {
        wikiFrame.animate({left: "-365px"}, 500, function () { this.hide() })
        createFrame.animate({"padding-left": "8px"}, 500, function () { this.css("padding-left", "") })
      }
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
.create-view
  position:relative

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

.wikiFrame
  position: absolute
  height: calc(100vh - 112px)
  width: 365px
  display: none
  border: none
</style>
