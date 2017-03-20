<template lang="pug">
.self(:style="{overflow: viewUseFullscreen ? 'hidden' : null}")
  header-bar(v-show='!viewUseFullscreen')
  .content
    circuit-run(v-show="this.$route.name === 'step'")
    create(v-show="this.$route.path == '/create'")
    keep-alive
      router-view(:key='viewReuseKey')
  footer-bar(v-show='!viewUseFullscreen')
</template>

<script>
import R from 'ramda'
import CircuitRun from 'components/learn/CircuitRun'
import Create from 'components/Create'
import FooterBar from 'components/navigation/FooterBar'
import HeaderBar from 'components/navigation/HeaderBar'

export default {
  computed: {
    viewReuseKey () {
      return R.last(this.$route.matched).meta.reuseKey || null
    },
    viewUseFullscreen () {
      return this.$route.matched.some(match => match.meta.useFullscreen)
    }
  },
  components: {
    CircuitRun,
    Create,
    FooterBar,
    HeaderBar
  }
}
</script>

<style lang="sass">
@font-face
	font-family: 'Rubik'
	src: url('assets/font/Rubik-Regular.eot')
	src: url('assets/font/Rubik-Regular.eot?#iefix') format('embedded-opentype')
  src: url('assets/font/Rubik-Regular.woff') format('woff')
	src: url('assets/font/Rubik-Regular.ttf') format('truetype')
	font-weight: normal
	font-style: normal

html, body
  height: 100%
  margin: 0
  padding: 0
</style>

<style lang="sass" scoped>
.self
  height: 100%
  margin: 0
  padding: 0

.content
  // header-bar:
  //   slogan-bar: 100px
  //   main-menu: 45px
  //   breadcrumb: 25px
  // footer-bar: 25px
  // total: 195px
  min-height: calc(100% - 195px)
  overflow: hidden
</style>
