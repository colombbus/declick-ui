<template lang="pug">
div
  h3
    | Mes projets
    button.close-button(@click="$emit('close')")
  ul.list-group
    li(v-for='project in projects')
      a.list-group-item(
        @click="$emit('showView', {view: 'ProjectDetails', params: {project}})"
      )
        h4 {{project.name}}
  button.btn.btn-default(@click="$emit('showView', 'ProjectCreator')")
    | démarrer un nouveau projet
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState({projects: 'currentUserProjects'})
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
