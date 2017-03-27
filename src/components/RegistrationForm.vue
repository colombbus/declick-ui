<template lang="pug">
div
  .input-group
    .input-group-addon: span.glyphicon.glyphicon-user
    input(
      @keyup.enter='register'
      v-model='username'
      type='text'
      class='form-control'
      placeholder="nom d'utilisateur"
    )
  .input-group
    .input-group-addon: span.glyphicon.glyphicon-envelope
    input(
      @keyup.enter='register'
      v-model='email'
      type='text'
      class='form-control'
      placeholder="adresse email"
    )
  .input-group
    .input-group-addon: span.glyphicon.glyphicon-lock
    input(
      @keyup.enter='register'
      v-model='password'
      type='password'
      class='form-control'
      placeholder='mot de passe'
    )
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
export default {
  data () {
    return {
      username: '',
      email: '',
      password: ''
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
