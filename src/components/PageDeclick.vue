<template lang="html">
  <div id="contentContainerHome">
    <div id="onLoadGif">
      <img src="../assets/img/spinner.gif" alt="" />
      <p>Chargement...</p>
    </div>
    <div id="content"></div>
  </div>
</template>

<script>
import declickConfig from '../assets/config/declick.js'
export default {
  created(){
    this.$http.get( declickConfig.url.cms+'api/1/tables/pages/rows/1?access_token=jWNoVhWCng6odNLK').then((responce) => {
      $('#onLoadGif').fadeOut()
      $('#content').append($.parseHTML(responce.body.content)).fadeIn()
    })
  }
}
</script>

<style lang="css">
  #onLoadGif{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #onLoadGif img{
    height: 50px
  }
  #onLoadGif p{
    font-weight: bolder;
  }

</style>
