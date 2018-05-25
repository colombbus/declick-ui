<template lang="pug">
.application(:class="fullscreenMode ? 'application--fullscreen': null")
  header-bar
  main-menu
  //- .content
  //-   course-run(v-show="this.$route.name === 'step'")
  //-   create-view(v-show="this.$route.name === 'create'")
  //-   execute(v-show="this.$route.name === 'execute'")
  //-   keep-alive
    //-   router-view(
    //-     v-if='$route.meta.keepAlive === undefined || $route.meta.keepAlive',
    //-     :key='viewId',
    //-     :id='viewId'
    //-   )
    //- router-view(
    //-   v-if='$route.meta.keepAlive !== undefined && !$route.meta.keepAlive',
    //-   :key='viewId',
    //-   :id='viewId'
    //- )
  router-view
  footer-bar(v-show='!viewUseFullscreen')
</template>

<script>
import R from 'ramda'
import courseRun from 'components/learn/CourseRun'
import CreateView from 'components/create/CreateView'
import FooterBar from 'components/navigation/FooterBar'
import MainMenu from 'components/navigation/MainMenu'
import HeaderBar from 'components/navigation/HeaderBar'
import Execute from 'components/execute/Execute'

export default {
  computed: {
    viewId () {
      if (this.$route.matched) {
        var last = R.last(this.$route.matched)
        if (last && last.meta && last.meta.id) {
          return last.meta.id
        }
      }
      return null
    },
    fullscreenMode () {
      return this.$route.matched.some(match => match.meta.useFullscreen)
    }
  },
  components: {
    courseRun,
    CreateView,
    FooterBar,
    HeaderBar,
    MainMenu,
    Execute
  }
}
</script>

<style lang="sass">
.application
  display: grid
  height: 100%
  margin: 0
  padding: 0
  grid-template-rows: auto 1fr auto

.application--fullscreen
  &__header-bar, &__footer-bar
    display: none
</style>
