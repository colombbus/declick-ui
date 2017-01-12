<template lang="html">
  <div id="contentContainerBienvenue">
  </div>
</template>

<script>
import declickConfig from '../assets/config/declick.js'
export default {
  created(){
    this.$http.get(declickConfig.url.cms+'pages/rows/2?access_token=jWNoVhWCng6odNLK').then((responce) => {
      $('#contentContainerBienvenue').append($.parseHTML(responce.body.content))
    })
  }
}
</script>

<style lang="css">
#content{
    font-size: 13px;
    color: #480A2A;
    text-align: center;
}

#content h1 {
    font-size: 24pt;
    line-height: 40px;
    letter-spacing: -2px;
    margin: 30px 0 40px 0;
    text-align: left;
    text-transform: uppercase;
    font-family: "rubik";
    text-align: center;
    font-weight: 500;
}
#content .page-text {
    font-size: 16px;
    line-height: 22px;
}
#sommaire {
  text-align: left;
    margin: 7px;
    box-sizing: border-box;
    border-spacing: 15px;
}
#content table td {
    vertical-align: top;
}

#sommaire td {
    padding-right: 15px;
    position: relative;
}
#content h3 {
    font-family: arial;
    font-size: 18px;
    margin: 20px 0 7px 0;
    text-transform: uppercase;
    font-weight: 600;
}
#content #sommaire td p {
    margin: 0 0 50px 0;
}
</style>
