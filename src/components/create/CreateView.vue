<template lang="pug">
.create-view
  create-header-bar
  create-menu-bar(
    @showView="showView"
    @toggleEditor="editor = !editor"
    v-bind:editor="editor"
  )
  transition(
    v-on:before-enter="beforeEnter"
    v-on:enter="onEnter"
    v-on:leave="onLeave"
    v-bind:css="false"
  )
    .slider(v-if='view')
      button.close-button(@click='view = null')
      component(
        @showView="showView",
        @close='view = null',
        :is='view',
        :params='params'
        v-if='view'
      )
  iframe.wikiFrame(:src='wikiUrl', ref='wikiFrame' v-if='!offline')
  iframe.frame(:src='frameUrl' ref='createFrame' v-if='!offline')
  webview.frame(v-else :src='frameUrl' nodeintegration disablewebsecurity :data-hash='hashValue' ref='createWebview')
</template>

<script>
/* global $ */
import 'jquery'
import {mapState} from 'vuex'
import CreateHeaderBar from './CreateHeaderBar'
import CreateMenuBar from './CreateMenuBar'
import ProjectCreator from './ProjectCreator'
import ProjectDetails from './ProjectDetails'
import ProjectEditor from './ProjectEditor'
import ProjectList from './ProjectList'
import config from 'assets/config/declick'
import {EventBus} from 'src/eventBus'

let createFrame

export default {
  data () {
    return {
      view: null,
      params: null,
      editor: true,
      wikiUrl: config.wikiUrl,
      wiki: false,
      offline: config.offline
    }
  },
  computed: {
    frameUrl () {
      if (config.offline) {
        return `${config.clientUrl}index_offline.html`
      } else {
        return `${config.clientUrl}index.html` +
        `#editor=${this.editor}` +
        `&token=${this.token}` +
        (this.currentProject ? `&id=${this.currentProject.id}` : '') +
        `&wiki=${this.wiki}`
      }
    },
    hashValue () {
      let value = `#editor=${this.editor}` +
        `&token=${this.token}` +
        (this.currentProject ? `&id=${this.currentProject.id}` : '') +
        `&wiki=${this.wiki}`
      if (createFrame) {
        createFrame.send('updateHash', value)
      }
      return `#editor=${this.editor}` +
        `&token=${this.token}` +
        (this.currentProject ? `&id=${this.currentProject.id}` : '') +
        `&wiki=${this.wiki}`
    },
    ...mapState(['currentProject', 'token'])
  },
  mounted () {
    if (config.offline) {
      let element = this.$refs.createWebview
      element.addEventListener('did-finish-load', () => {
        element.send('updateHash', this.hashValue)
        createFrame = element
      })
      element.addEventListener('ipc-message', (event) => {
        switch (event.channel) {
          case 'switchEditor':
            this.editor = true
            break
          case 'switchView':
            this.editor = false
            break
        }
      })
    } else {
      window.addEventListener('message', ({data}) => {
        switch (data) {
          case 'switchEditor':
            this.editor = true
            break
          case 'switchView':
            this.editor = false
            break
          case 'toggleWiki':
            this.toggleWiki()
            break
        }
      }, false)
      createFrame = this.$refs.createFrame
    }
    EventBus.$on('initCreate', () => {
      if (config.offline) {
        if (createFrame) {
          createFrame.send('init')
        }
      } else {
        createFrame.contentWindow.postMessage('init', '*')
      }
    })
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
      let wikiFrame = $(this.$refs.wikiFrame)
      wikiFrame.stop()
      createFrame.stop()
      this.wiki = !(this.wiki)
      if (this.wiki) {
        wikiFrame.css("left", "-365px").show().animate({left: "0"}, 500)
        createFrame.animate({"padding-left": "365px"}, 500)
      } else {
        wikiFrame.animate({left: "-365px"}, 500, function () { $(this).hide() })
        createFrame.animate({"padding-left": "8px"}, 500, function () { $(this).css("padding-left", "") })
      }
    }
  },
  components: {
    CreateHeaderBar,
    CreateMenuBar,
    ProjectCreator,
    ProjectDetails,
    ProjectEditor,
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

.close-button
  float: right
  width: 26px
  height: 26px
  margin-top: 20px
  background-color: transparent
  background-image: url(~assets/image/close-small.png)
  border: none

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
