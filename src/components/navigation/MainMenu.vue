<template lang="pug">
ul.main-menu
  li.main-menu__item: router-link.main-menu__link(to='/progress') APPRENDRE
  li.main-menu__item: router-link.main-menu__link(to='/create') CRÉER
  li.main-menu__item: router-link.main-menu__link(to='/explore') JOUER
  li.main-menu__item: router-link.main-menu__link(to='/resources') RESSOURCES

// .self
//   ul
//     li
//       router-link(
//         to='/explore'
//         class='illustrated-link explore-link'
//       ) Découvrir
//     li
//       router-link(
//         to='/progress'
//         class='illustrated-link progress-link'
//       ) Progresser
//     li
//       router-link(
//         to='/create'
//         class='illustrated-link create-link'
//       ) Créer
//     //- li
//     //-   router-link(
//     //-     to='/resources'
//     //-   ) Ressources
//     //- TO REMOVE WHEN FORUM READY
//     //-li
//       a(
//         :href='forumLink'
//         class='illustrated-link discuss-link'
//         target='forum'
//       ) Discuter
//     li(v-if='!user')
//       a(
//         @click='isAuthenticationModalVisible = true'
//         class="illustrated-link log-in-link"
//       ) Se connecter
//     li(v-else)
//       a(@click='logOut') Se déconnecter
//   authentication-modal(
//     @close='isAuthenticationModalVisible = false'
//     v-if='isAuthenticationModalVisible'
//   )
</template>

<script>
import AuthenticationModal from '@/components/user/AuthenticationModal'
import {mapState, mapActions} from 'vuex'
import config from '@/config'

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
    ...mapState(['user'])
  },
  methods: mapActions(['logOut']),
  components: {
    AuthenticationModal
  }
}
</script>

<style lang="sass">
.main-menu
  display: flex
  margin: 0
  padding: 0
  border-top: 7px solid #6e3a51
  justify-content: center
  background-color: #652e46
  background-image: url(~@/assets/images/waves.png)

.main-menu__item
  display: inline-block
  padding: 7px

.main-menu__item + .main-menu__item
  margin-left: 15px

.main-menu .main-menu__link
  font-size: 11pt
  font-weight: bold
  color: #fff
  text-decoration: none
</style>
