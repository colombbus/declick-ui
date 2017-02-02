<template>
    <iframe id="declick-client-create" class="fullscreen-iframe" :src="urlCreate" v-show="this.$route.path == '/create'"></iframe>
</template>

<script>
import declickConfig from '../assets/config/declick.js'

export default {
  data () {
    return {
      transitionName: '',
      projectId: ''
    }
  },
  computed: {
    urlCreate () {
      return declickConfig.url.client + 'index.html#token=' + this.$store.state.authorizations
    }
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
</style>
