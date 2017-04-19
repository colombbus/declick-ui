<template lang="pug">
div
  h3
    | Utilisateurs > {{user.username}}
  .panel.panel-default
    dl
      dt email
      dd {{user.email}}
  button.btn.btn-default(
    @click="$emit('showView', {view: 'UserEditor', params: {user}})"
    type='button'
  ) modifier les informations
</template>

<script>
export default {
  props: ['params'],
  computed: {
    user () {
      return this.params.user
    }
  }
}
</script>

<style lang="sass" scoped>
.panel
  padding-top: 20px

dt
  display: inline-block
  padding: 5px
  width: 25%
  font-weight: bold
  text-align: right

dd
  display: inline-block
  width: 75%
  padding: 5px
</style>
