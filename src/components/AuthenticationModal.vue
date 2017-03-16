<template lang="pug">
transition(name='modal')
  .mask(@click="$emit('close')")
    .wrapper
      .container(@click.stop='')
        .input-group
          .input-group-addon: span.glyphicon.glyphicon-user
          input(
            @keyup.enter='logIn'
            v-model='username'
            type='text'
            class='form-control'
            placeholder="nom d'utilisateur"
          )
        .input-group
          .input-group-addon: span.glyphicon.glyphicon-lock
          input(
            @keyup.enter='logIn'
            v-model='password'
            type='password'
            class='form-control'
            placeholder='mot de passe'
          )
        button(
          @click='logIn'
          type='button'
          class='btn btn-block btn-primary'
        ) se connecter
        button(
          type='button'
          class='btn btn-block btn-social btn-google'
        )
          span.fa.fa-google
          | connexion via Google
        button(
          type='button'
          class='btn btn-block btn-social btn-facebook'
        )
          span.fa.fa-facebook
          | connexion via Facebook
</template>

<script>
import 'bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    logIn () {
      this.$store.dispatch('logIn', {
        username: this.username,
        password: this.password
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass" scoped>
.mask
  position: fixed
  z-index: 9999
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, .5)
  display: table
  transition: opacity .3s ease

.wrapper
  display: table-cell
  vertical-align: middle

.container
  width: 300px
  margin: 0px auto
  padding: 20px
  background-color: #F8F8F8
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
  transition: all .3s ease

.modal-enter,
.modal-leave-active
  opacity: 0

.modal-enter .container,
.modal-leave-active .container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)

.input-group
  margin-bottom: 6px
</style>
