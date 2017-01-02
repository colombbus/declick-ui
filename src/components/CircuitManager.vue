<template>
  <div>
    <step-tree-item
      :node="tree"
      @select-node="selectNode"
      id="root-node"
    ></step-tree-item>
    <ul class="list-group">
      <step-editor
        :node="selected"
        @create-child-node="createChildNode"
        @save-node="saveNode"
        id="node-editor"
      ></step-editor>
    </ul>
  </div>
</template>

<script>
import StepEditor from './StepEditor'
import StepTreeItem from './StepTreeItem'

export default {
  name: 'CircuitManager',
  data: function () {
    return {
      circuitId: 3,
      tree: null,
      selected: null
    }
  },
  components: {
    StepEditor,
    StepTreeItem
  },
  created: function () {
    this.tree = this.createNode(1)
    this.selected = this.tree
  },
  methods: {
    createNode (position) {
      return {
        url: '',
        name: 'noeud ' + position,
        parentId: null,
        position,
        children: []
      }
    },
    createChildNode (parent) {
      parent.children.push(this.createNode(parent.children.length + 1))
    },
    saveNode (node) {
      // ???
    },
    selectNode (node) {
      this.selected = node
    }
  }
}
</script>

<style>
#root-node { float: left; }
#node-editor { float: left; margin-left: 20px; }
</style>
