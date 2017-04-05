<template lang="pug">
div
  h3
    | Mes projets > {{project.name}}
    button.close-button(@click="$emit('close')")
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
dt
  display: inline-block
  padding: 5px
  width: 33%
  font-weight: bold
  text-align: right

dd
  display: inline-block
  width: 66%
  padding: 5px

.close-button
  float: right
  width: 26px
  height: 26px
  background-color: transparent
  background-image: url(~assets/image/close-small.png)
  border: none

</style>
