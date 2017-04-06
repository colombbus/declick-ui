<template lang="pug">
.self
  ul
    li
      router-link(
        to='/explore'
        class='illustrated-link explore-link'
      ) Découvrir
    li
      router-link(
        to='/progress'
        class='illustrated-link progress-link'
      ) Progresser
    li
      router-link(
        to='/create'
        class='illustrated-link create-link'
      ) Créer
    //- TO REMOVE WHEN FORUM READY
    //-li
      a(
        :href='forumLink'
        class='illustrated-link discuss-link'
        target='forum'
      ) Discuter
    li(v-if='!authenticatedUser')
      a(
        @click='isAuthenticationModalVisible = true'
        class="illustrated-link log-in-link"
      ) Se connecter
    li(v-else)
      a(@click='logOut') Se déconnecter
  authentication-modal(
    @close='isAuthenticationModalVisible = false'
    v-if='isAuthenticationModalVisible'
  )
</template>

<script>
import AuthenticationModal from 'components/user/AuthenticationModal'
import {mapState, mapActions} from 'vuex'
import config from 'assets/config/declick'

export default {
  data () {
    return {
      isAuthenticationModalVisible: false
    }
  },
  computed: {
    forumLink () {
      return config.forumUrl
    },
    ...mapState(['authenticatedUser'])
  },
  methods: mapActions(['logOut']),
  components: {
    AuthenticationModal
  }
}
</script>

<style lang="sass" scoped>
ul
  float: right
  margin-bottom: 0
  padding-left: 0

li
  float: left
  height: 38px
  width: 150px
  margin: 0
  text-align: center
  list-style-type: none

a
  display: block
  padding: 0
  font-family: Rubik, sans-serif
  line-height: 38px
  font-size: 18.6667px
  color: white
  text-decoration: none
  outline: 0
  cursor: pointer

.self
  height: 45px
  border-top: 7px solid #6F3B51
  background-color: #642D46
  background-image: url(~assets/image/waves.png)
  background-repeat: repeat-x

.router-link-active
  color: #D1D718
  background-color: #480A2A

.illustrated-link:after
  content: ""
  position: relative
  display: block
  float: left
  height: 100px
  width: 150px
  margin-top: -138px
  opacity: 0
  background-repeat: no-repeat
  background-position: bottom 10px center
  transition: opacity 0.8s ease-in-out

.illustrated-link.router-link-active:after,
a.illustrated-link:hover:after
  opacity: 100

.explore-link:after
  background-image: url(~assets/image/explore-robot.png)

.progress-link:after
  background-image: url(~assets/image/progress-robot.png)

.create-link:after
  background-image: url(~assets/image/create-robot.png)

.discuss-link:after
  background-image: url(~assets/image/discuss-robot.png)

.log-in-link:after
  background-image: url(~assets/image/log-in-robot.png)
</style>
