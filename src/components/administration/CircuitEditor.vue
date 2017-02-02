<template>
  <div v-if="tree">
    <step-tree-item
      :node="tree"
      @select-node="selectNode"
      id="root-node"
    ></step-tree-item>
    <step-editor
      v-if="selectedNode"
      :node="selectedNode"
      @create-child-node="createChildNode"
      @save-node="saveNode"
      id="node-editor"
    ></step-editor>
  </div>
</template>

<script>
import StepEditor from './StepEditor'
import StepTreeItem from './StepTreeItem'

import config from 'assets/config/declick'

export default {
  data: function () {
    return {
      circuitId: null,
      circuit: null,
      tree: null,
      selectedNode: null
    }
  },
  created () {
    this.circuitId = this.$route.params.id
    this.retrieveCircuit()
  },
  methods: {
    retrieveCircuit () {
      $.ajax({
        method: 'GET',
        url: `${config.url.api}circuits/${this.circuitId}`,
        success: circuit => {
          this.circuit = circuit
          this.retrieveRootNode(this.circuit.root_node_id)
        }
      })
    },
    retrieveRootNode (id) {
      $.ajax({
        method: 'GET',
        url: `${config.url.api}circuits/${this.circuitId}/nodes/${id}`,
        success: node => {
          node.children = []
          this.tree = node
          this.retrieveNodeChildren(this.tree)
        }
      })
    },
    retrieveNodeChildren (parent) {
      $.ajax({
        method: 'GET',
        url: `${config.url.api}circuits/${this.circuitId}/nodes/${parent.id}/children`,
        success: nodes => {
          for (let node of nodes) {
            node.children = []
            parent.children.push(node)
            this.retrieveNodeChildren(parent.children[parent.children.length - 1])
          }
        }
      })
    },
    createNode () {
      return {
        name: 'nouveau nœud',
        url: null,
        children: []
      }
    },
    selectNode (node) {
      this.selectedNode = node
    },
    createChildNode (parent) {
      parent.children.push(this.createNode())
    },
    saveNode () {}
  },
  components: {
    StepEditor,
    StepTreeItem
  }
}
</script>

<style>
#root-node { float: left; }
#node-editor { float: left; margin-left: 20px; }
</style>
