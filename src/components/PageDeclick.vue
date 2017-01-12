<template lang="html">
  <div id="contentContainerHome">
  </div>
</template>

<script>
import declickConfig from '../assets/config/declick.js'
export default {
  created(){
    this.$http.get( declickConfig.url.cms+'pages/rows/1?access_token=jWNoVhWCng6odNLK').then((responce) => {
      console.log(responce);
      $('#contentContainerHome').append($.parseHTML(responce.body.content))
    })
  }
}
</script>

<style lang="css">
</style>
