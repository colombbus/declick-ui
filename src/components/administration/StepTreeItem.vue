<template>
  <li>
    <a @click="selectNode">{{ node.name }}</a>
    <span v-show="node.children && node.children.length > 0">
      <span
        v-show="!open"
        @click="openChildren"
        class="glyphicon glyphicon-plus"
      ></span>
      <span
        v-show="open"
        @click="closeChildren"
        class="glyphicon glyphicon-minus"
      ></span>
      <transition name="fade">
        <ul v-show="open && node.children.length > 0" class="list-group">
          <step-tree-item
            v-for="child in node.children"
            :node="child"
            @select-node="transmitEvent"
          ></step-tree-item>
        </ul>
      </transition>
    </span>
  </li>
</template>

<script>
export default {
  name: 'StepTreeItem',
  props: [
    'node'
  ],
  data: function () {
    return {
      open: true
    }
  },
  methods: {
    openChildren () {
      this.open = true
    },
    closeChildren () {
      this.open = false
    },
    selectNode () {
      this.transmitEvent(this.node)
    },
    transmitEvent (node) {
      this.$emit('select-node', node)
    }
  }
}
</script>

<style>
li {
  margin-left: 20px;
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
