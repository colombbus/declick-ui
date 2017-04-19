<template lang="pug">
div
  h3
    | Mes projets > {{project.name}}
  .panel.panel-default
    dl
      dt nom du projet
      dd {{project.name}}
      dt public
      dd {{project.is_public ? 'oui' : 'non'}}
      dt largeur de la scène
      dd {{project.scene_width}}
      dt hauteur de la scène
      dd {{project.scene_height}}
      dt description
      dd {{project.description}}
      dt instructions
      dd {{project.instructions}}
  button.btn.btn-default(
    @click="$emit('showView', {view: 'ProjectEditor', params: {project}})"
    type='button'
  ) modifier les informations
  |
  |
  button.btn.btn-default(
    @click="selectAsCurrentProject"
    type='button'
  ) travailler sur ce projet
</template>

<script>
import {SET_CURRENT_PROJECT} from 'store/mutation-types'

export default {
  props: ['params'],
  computed: {
    project () {
      return this.params.project
    }
  },
  methods: {
    selectAsCurrentProject () {
      this.$store.commit(SET_CURRENT_PROJECT, {project: this.project})
      this.$emit('close')
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
