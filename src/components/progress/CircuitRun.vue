<template lang="html">
    <iframe id="declick-client-learn" class="fullscreen-iframe" :src="urlLearn"></iframe>
</template>
<script>
import declickConfig from '../../assets/config/declick.js'

export default {
  computed: {
        urlLearn () {
        return declickConfig.url.client + 'learn.html#id=4&token=' + this.$store.state.authorizations
        }
    }
}
</script>
<style lang="css">
.fullscreen-iframe {
  height: calc(100vh - 60px);
  width: 100%;
  border: none;
  overflow:hidden;
}
</style>