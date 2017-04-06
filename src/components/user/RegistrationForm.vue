<template lang="pug">
div
  .form-group.has-feedback(:class="{'has-error': errors.username}")
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-user
      input(
        @keyup.enter='logIn'
        v-model='username'
        type='text'
        class='form-control'
        placeholder="nom d'utilisateur"
      )
    span.help-block(v-if='errors.username')
      span(v-if="errors.username.includes('USERNAME_ALREADY_TAKEN')")
        | Ce nom d'utilisateur est déjà pris.
  .form-group.has-feedback(:class="{'has-error': errors.email}")
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-envelope
      input(
        @keyup.enter='register'
        v-model='email'
        type='text'
        class='form-control'
        placeholder="adresse email"
      )
    span.help-block(v-if='errors.email')
      | {{errors.email[0]}}
  .form-group.has-feedback(:class="{'has-error': errors.password}")
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-lock
      input(
        @keyup.enter='register'
        v-model='password'
        type='password'
        class='form-control'
        placeholder='mot de passe'
      )
    span.help-block(v-if='errors.password')
      | {{errors.password[0]}}
  .form-group.has-feedback(:class="{'has-error': errors.passwordConfirmation}")
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-lock
      input(
        @keyup.enter='register'
        v-model='passwordConfirmation'
        type='password'
        class='form-control'
        placeholder='confirmation mot de passe'
      )
    span.help-block(v-if='errors.passwordConfirmation')
      | Les mots de passe ne correspondent pas
  button(
    @click='register'
    type='button'
    class='btn btn-block btn-primary'
  ) valider l'inscription
  span.help-block(v-if='errors.server')
    | {{errors.server}}
  button(
    @click="$emit('switch-to-connection')"
    type='button'
    class='btn btn-block btn-link'
  ) retourner à la connexion
</template>

<script>
import Vue from 'vue'
import config from 'assets/config/declick'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      errors: {
        username: null,
        email: null,
        password: null,
        passwordConfirmation: null
      },
      passwordConfirmation: '',
      lastUsernameTest: 0
    }
  },
  watch: {
    username (value) {
      this.errors.username = null
      if (this.checkTimeout) {
        window.clearTimeout(this.checkTimeout)
      }
      this.checkTimeout = window.setTimeout(async () => {
        let endpoint = `${config.apiUrl}v1/test/username`
        let {body: response} = await Vue.http.post(endpoint, {username: this.username})
        if (response.result === false) {
          this.errors.username = ['USERNAME_ALREADY_TAKEN']
        }
      }, 500)
    },
    password () {
      this.comparePasswords()
    },
    passwordConfirmation () {
      this.comparePasswords()
    }
  },
  methods: {
    async register () {
      this.errors.server = null
      try {
        if (this.comparePasswords()) {
          var data = {          
            username: this.username,
            password: this.password
          }
          if (this.email.trim().length > 0) {
            data.email = this.email
          }
          await this.$store.dispatch('register', data)
          await this.$store.dispatch('logIn', {
            username: this.username,
            password: this.password
          })
          this.$emit('close')
        }
      } catch (e) {
        if (e.body) {
          for (var field in e.body) {
            this.errors[field] = e.body[field] 
          }
        } else {
          this.errors.server = "Erreur du serveur"
        }
      }
    },
    comparePasswords () {
      this.errors.passwordConfirmation = null
      if ((this.password && this.password.trim().length > 0) || (this.passwordConfirmation && this.passwordConfirmation.trim().length > 0)) {
        if (this.password == this.passwordConfirmation) {
          return true
        } else {
          this.errors.passwordConfirmation = true
        }
      }
      return false
    }    
  },
  checkTimeout: false
}
</script>

<style lang="sass" scoped>
.input-group
  margin-bottom: 6px
</style>
