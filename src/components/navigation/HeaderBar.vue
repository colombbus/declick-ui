<template lang="pug">
div
  slogan-bar
  authenticated-user-box.user-box(v-if='user&&!offline')
  main-menu
  breadcrumb
</template>

<script>
import AuthenticatedUserBox from 'components/user/AuthenticatedUserBox'
import Breadcrumb from 'components/navigation/Breadcrumb'
import MainMenu from 'components/navigation/MainMenu'
import SloganBar from 'components/navigation/SloganBar'
import {mapState} from 'vuex'
import config from 'assets/config/declick'

export default {
  data () {
    return {
      offline: config.offline
    }
  },
  computed: mapState(['user']),
  components: {
    AuthenticatedUserBox,
    Breadcrumb,
    MainMenu,
    SloganBar
  }
}
</script>

<style lang="sass" scoped>
.user-box
  float: right
  position: relative
  top: -3px
  margin-top: -38px
</style>
