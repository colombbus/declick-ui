<template lang="pug">
.self
  .dropdown
    a.dropdown-trigger(type='button' data-toggle='dropdown')
    ul.dropdown-menu
      li: router-link(to='/create/current') informations
      li.divider(role='separator')
      li
        a(
          @click="$emit('showProjectList')"
        ) projets
  span.project-name Projet
  a(
    @click='toggleMode',
    :class="editor ? 'show-view-link' : 'show-editor-link'"
  )
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import * as mutations from 'store/mutation-types'

export default {
  methods: {
    toggleMode () {
      this.setEditor(!this.editor)
    },
    ...mapMutations({
      setEditor: mutations.SET_EDITOR
    })
  },
  computed: mapState(['editor'])
}
</script>

<style lang="sass" scoped>
a
  cursor: pointer

.self
  height: 50px
  padding: 0 5px
  line-height: 50px

.dropdown
  display: inline-block

.dropdown-trigger
  display: inline-block
  width: 21px
  height: 50px
  background-image: url(~assets/image/dropdown-trigger.png)
  background-repeat: no-repeat
  background-position: center
  vertical-align: bottom
  cursor: pointer

.project-name
  display: inline-block
  margin-left: 10px
  font-family: "Rubik", sans-serif
  font-size: 20pt
  font-weight: 700
  color: #480A2A
  vertical-align: middle

.show-editor-link,
.show-view-link
  display: inline-block
  float: right
  width: 36px
  height: 36px
  margin-top: 5px
  cursor: pointer

.show-editor-link
  background-image: url(~assets/image/switch-editor.png)

.show-editor-link:hover
  background-image: url(~assets/image/switch-editor-hover.png)

.show-view-link
  background-image: url(~assets/image/switch-view.png)

.show-view-link:hover
  background-image: url(~assets/image/switch-view-hover.png)
</style>
