<template lang="pug">
div
  h3
    | Utilisateurs > {{username}}
  form
    .form-group
      label(for='user-edition-project-name')
        | email
      input#user-edition-project-name.form-control(
        v-model='email'
        type='text'
      )
    button.btn.btn-default(
      @click="showUserProfile"
      type='button'
    )
      | annuler
    | &nbsp;
    button.btn.btn-primary(@click='updateUser' type='button')
      | enregistrer les modifications
</template>

<script>
export default {
  props: ['params'],
  data () {
    return {
      username: '',
      email: ''
    }
  },
  created () {
    this.username = this.params.user.username
    this.email = this.params.user.email
  },
  methods: {
    async updateUser () {
      let data = {
        email: this.email
      }
      await this.$store.dispatch('updateUser', {
        id: this.params.user.id,
        data
      })
      this.params.user.email = this.email
      this.showUserProfile()
    },
    showUserProfile () {
      this.$emit('showView', {
        view: 'UserProfile',
        params: {user: this.params.user}
      })
    }
  }
}
</script>
