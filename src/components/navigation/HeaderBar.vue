<template lang="pug">
div
  slogan-bar
  authenticated-user-box.user-box(v-if='authenticatedUser')
  main-menu
  breadcrumb
</template>

<script>
import AuthenticatedUserBox from 'components/user/AuthenticatedUserBox'
import Breadcrumb from 'components/navigation/Breadcrumb'
import MainMenu from 'components/navigation/MainMenu'
import SloganBar from 'components/navigation/SloganBar'
import {mapState} from 'vuex'

export default {
  computed: mapState(['authenticatedUser']),
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
