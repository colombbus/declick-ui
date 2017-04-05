<template lang="pug">
div
  h3
    | Nouveau projet
    button.close-button(@click="$emit('close')")
  form
    .form-group
      label(for='project-creation-project-name')
        | nom du projet
      input#project-creation-project-name.form-control(
        v-model='name'
        type='text'
      )
    .checkbox
      label
        input(v-model='isPublic' type='checkbox')
        | rendre le projet public
    .form-group
      label(for='project-creation-scene-width')
        | largeur de la scène (pixels)
      input#project-creation-scene-width.form-control(
        v-model='sceneWidth'
        type='text'
      )
    .form-group
      label(for='project-creation-scene-height')
        | hauteur de la scène (pixels)
      input#project-creation-scene-height.form-control(
        v-model='sceneHeight'
        type='text'
      )
    .form-group
      label(for='project-creation-description')
        | description
      textarea#project-creation-description.form-control(
        v-model='description'
        rows='3'
      )
    .form-group
      label(for='project-creation-instructions')
        | instructions
      textarea#project-creation-instructions.form-control(
        v-model='instructions'
        rows='3'
      )
    button.btn.btn-primary(@click='createProject' type='button')
      | créer
</template>

<script>
export default {
  data () {
    return {
      name: '',
      isPublic: false,
      sceneWidth: '',
      sceneHeight: '',
      description: '',
      instructions: ''
    }
  },
  methods: {
    async createProject () {
      let data = {
        name: this.name,
        isPublic: this.isPublic,
        sceneWidth: this.sceneWidth,
        sceneHeight: this.sceneHeight,
        description: this.description,
        instructions: this.instructions
      }
      await this.$store.dispatch('createProject', {data})
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass">
.close-button
  float: right
  width: 26px
  height: 26px
  background-color: transparent
  background-image: url(~assets/image/close-small.png)
  border: none
</style>
