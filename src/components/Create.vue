<template>
  <div id="create-screen">
    <create-navigation-bar></create-navigation-bar>
    <transition :name="transitionName">
      <div id="AdminContentContainer">
        <router-view id="slideFromTop"></router-view>
      </div>
    </transition>
    <iframe :src="iframeUrl"
            id="declick-client-frame"></iframe>
  </div>
</template>

<script>
import CreateNavigationBar from 'components/CreateNavigationBar'
import declickConfig from '../assets/config/declick.js'

export default {
  data () {
    return {
      transitionName: '',
      projectId: ''
    }
  },
  computed: {
    iframeUrl () {
      return declickConfig.url.client
        + '#projectId=' + this.projectId
        + '&token=' + this.$store.state.authorizations
    }
  },
  components: {
    CreateNavigationBar
  }
}
</script>

<style>

.slideDown-enter-active{
  animation: slideDown .5s ease
}
.slideDown-leave,
.slideDown-leave-active,
.slideUp-enter-active,
.slideUp-leave{
  animation: slideUp .5s ease
}

@keyframes slideDown{
  from{
    top: -600px
  }to{
    top: 0
  }
}

@keyframes slideUp{
  from{
    top: 0
  }to{
    top: -600px
  }
}
#create-screen {
  position: relative;
  height: calc(100vh - 55px);
}
#create-screen iframe{
  position: absolute;
  top: 55px;
  z-index: -2
}
#declick-client-frame {
  height: 100%;
  min-height: 100%;
  width: 100%;
  border: none;
}

</style>
