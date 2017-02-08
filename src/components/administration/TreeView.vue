<template>
  <ol>
    <span
      class="list-group-item"
      :style="`padding-left: ${depth * 20}px`"
    >
      <span class="node-control">
        <span
          v-show="node.children.length > 0 && !open"
          @click="openChildren"
          class="glyphicon glyphicon-plus"
        ></span>
        <span
          v-show="node.children.length > 0 && open"
          @click="closeChildren"
          class="glyphicon glyphicon-minus"
        ></span>
      </span><!-- no space fix
      --><a
        @click="selectNode"
      >{{ node.name }}</a>
    </span>
    <transition name="grow">
      <li v-show="node.children.length > 0 && open">
        <step-tree-item
          v-for="child in node.children"
          :depth="depth + 1"
          :node="child"
          @select-node="transmitEvent"
        ></step-tree-item>
      </li>
    </transition>
  </ol>
</template>

<script>
export default {
  name: 'StepTreeItem',
  props: {
    'depth': {
      default: 0
    },
    'node': {}
  },
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

.grow-enter-active, .grow-enter-active {
  transition: max-height 1.5s;
  max-height: 126px;
}

.grow-enter, .grow-leave-active {
  max-height: 0;
}

/*
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
*/
</style>
