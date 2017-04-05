<template lang="pug">
div
  h3
    | Mes projets (données d'exemple pour le moment)
    button.close-button(@click="$emit('close')")
  ul.list-group
    li
      a.list-group-item(v-for='project in projects')
        h4 {{project.name}}
  button.btn.btn-default(@click="$emit('createNewProject')")
    | démarrer un nouveau projet
</template>

<script>
export default {
  data () {
    return {
      projects: [
        {
          name: 'Island Ception'
        },
        {
          name: 'Réalisation d\'un clip musical'
        },
        {
          name: 'Réalisation d\'un questionnaire'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
.list-group-item:hover
  background-color: #F5F5F5
  cursor: pointer

.close-button
  float: right
  width: 26px
  height: 26px
  background-color: transparent
  background-image: url(~assets/image/close-small.png)
  border: none
</style>
