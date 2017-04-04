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
  .form-group.has-feedback
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-envelope
      input(
        @keyup.enter='register'
        v-model='email'
        type='text'
        class='form-control'
        placeholder="adresse email"
      )
  .form-group.has-feedback
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-lock
      input(
        @keyup.enter='register'
        v-model='password'
        type='password'
        class='form-control'
        placeholder='mot de passe'
      )
  .form-group.has-feedback
    .input-group
      .input-group-addon: span.glyphicon.glyphicon-lock
      input(
        @keyup.enter='register'
        type='password'
        class='form-control'
        placeholder='confirmation du mot de passe'
        disabled
      )
  button(
    @click='register'
    type='button'
    class='btn btn-block btn-primary'
  ) valider l'inscription
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
      lastUsernameTest: 0
    }
  },
  watch: {
    async username (value) {
      let endpoint = `${config.apiUrl}v1/test/username`
      let {body: response} = await Vue.http.post(endpoint, {username: this.username})
      if (response.result === false) {
        console.log('rekt')
        this.errors.username = ['USERNAME_ALREADY_TAKEN']
      } else {
        this.errors.username = null
      }
    }
  },
  methods: {
    async register () {
      await this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      await this.$store.dispatch('logIn', {
        username: this.username,
        password: this.password
      })
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass" scoped>
.input-group
  margin-bottom: 6px
</style>
