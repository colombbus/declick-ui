<template lang="pug">
.self
  .circuit(v-for='circuit in circuits')
    .image-area
      img(v-if='circuit.imageUrl', :src='circuit.imageUrl')
    p.fields-area
      router-link.name(:to="'/progress/circuit/' + circuit.id") {{circuit.name}}
      br
      span.summary {{circuit.summary}}
      br
      span(v-if='!circuit.showDetails')
        a.toggle-details-link(@click='circuit.showDetails = true')
          span.glyphicon.glyphicon-triangle-right
          |
          | afficher les détails
      span(v-else)
        a.toggle-details-link(@click='circuit.showDetails = false')
          span.glyphicon.glyphicon-triangle-bottom
          |
          | masquer les détails
        br
        span.details {{circuit.details}}
</template>

<script>
import Api from '../../api'

export default {
  data () {
    return {
      circuits: []
    }
  },
  async created () {
    this.circuits = await Api.getCircuits()
  }
}
</script>

<style lang="sass" scoped>
*
  font-size: 14pt

.self
  max-width: 750px
  // @todo Find a workaround to override a property in Vue scoped CSS mode.
  margin: 0 auto !important

.circuit
  margin-top: 20px
  padding-left: 150px
  border: 2px solid #E7E6E6

.circuit:after
  content: ''
  display: block
  clear: both

.image-area
  float: left
  width: 150px
  margin-left: -150px

.fields-area
  padding: 10px

.name
  font-size: 18pt
  font-weight: 700

.summary
  color: #2E75B6

.toggle-details-link, .details
  color: #A6A6A6

.toggle-details-link
  text-decoration: none
  cursor: pointer

.details
  display: block
  margin-left: 25px
  white-space: pre-wrap

.glyphicon
  position: relative
  top: 3px
</style>
