<template lang="pug">
div
  create-header-bar
  create-menu-bar
  iframe.frame(:src='frameUrl')
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import CreateHeaderBar from './CreateHeaderBar'
import CreateMenuBar from './CreateMenuBar'
import * as mutations from 'store/mutation-types'
import config from 'assets/config/declick'

export default {
  computed: {
    frameUrl () {
      return `${config.clientUrl}index.html` +
        `#editor=${this.editor}` +
        `&token=${this.authorizations}`
    },
    ...mapState(['authorizations', 'editor'])
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
  methods: mapMutations({
    setEditor: mutations.SET_EDITOR
  }),
  components: {
    CreateHeaderBar,
    CreateMenuBar
  }
}
</script>

<style lang="sass" scoped>
.frame
  height: calc(100vh - 112px)
  width: 100%
  padding: 0 8px 8px 8px
  border: none
  overflow: hidden
</style>
