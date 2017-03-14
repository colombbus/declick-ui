<template>
  <div>
    <SmallNavigationBar></SmallNavigationBar>
    <CreateNavigationBar></CreateNavigationBar>
    <iframe
      id="declick-client-create"
      class="fullscreen-iframe"
      :src="urlCreate"
    ></iframe>
  </div>
</template>

<script>
import declickConfig from '../assets/config/declick.js'
import { mapState, mapMutations } from 'vuex'
import * as mutations from '../store/mutation-types.js'

import SmallNavigationBar from './SmallNavigationBar'
import CreateNavigationBar from './CreateNavigationBar'

export default {
  data () {
    return {
      transitionName: '',
      projectId: ''
    }
  },
  computed: {
    urlCreate () {
      return declickConfig.url.client + 'index.html#editor=' + this.editor + '&token=' + this.authorizations
    },
    ...mapState(['editor', 'authorizations'])
  },
  methods: {
    ...mapMutations({
      setEditor: mutations.SET_EDITOR
    })
  },
  mounted () {
    window.addEventListener('message', e => {
      if (e.data === 'switchEditor') {
        this.setEditor(true)
      } else if (e.data === 'switchView') {
        this.setEditor(false)
      }
    }, false)
  },
  components: {
    CreateNavigationBar,
    SmallNavigationBar
  }
}
</script>

<style>
.fullscreen-iframe {
  height: calc(100vh - 105px);
  padding: 8px;
  width: 100%;
  border: none;
  overflow:hidden;
}
</style>
