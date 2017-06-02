<template lang="pug">
div
  div(v-if='project')
    | hauteur : {{project.sceneHeight}}
    br
    | largeur : {{project.sceneWidth}}
    br
    | programme principal : {{project.mainProgram}}
  div(v-else)
    | chargement en cours...
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: mapState({project: 'executeProject'})
}
</script>
