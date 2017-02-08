<template>
  <div v-if="rootNode">
    <tree-view
      :node="rootNode"
      @select-node="selectNode"
      id="circuit-tree-view"
    ></tree-view>
    <step-editor
      v-if="selectedNode"
      :node="selectedNode"
      @create-child="createChildStep"
      @save="saveStep"
      @remove="removeStep"
      id="circuit-step-editor"
    ></step-editor>
  </div>
</template>

<script>
import StepEditor from './StepEditor'
import TreeView from './TreeView'

import config from 'assets/config/declick'
var apiUrl = config.url.api.slice(0, -1)

export default {
  data: function () {
    return {
      circuitId: null,
      circuit: null,
      rootNode: null,
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
        url: `${apiUrl}/circuits/${this.circuitId}`,
        success: circuit => {
          this.circuit = circuit
          this.retrieveRootStep(this.circuit.root_node_id)
        }
      })
    },
    retrieveRootStep (stepId) {
      $.ajax({
        method: 'GET',
        url: `${apiUrl}/circuits/${this.circuitId}/nodes/${stepId}`,
        success: rootStep => {
          this.rootNode = this.makeNode(rootStep)
          this.rootNode.name = 'nœud racine'
          this.rootNode.editable = false
          this.retrieveStepChildren(this.rootNode)
        }
      })
    },
    retrieveStepChildren (parentNode) {
      $.ajax({
        method: 'GET',
        url: `${apiUrl}` +
          `/circuits/${this.circuitId}` +
          `/nodes/${parentNode.data.id}` +
          `/children`,
        success: childSteps => {
          for (let childStep of childSteps) {
            let childNode = this.makeNode(childStep)
            parentNode.children.push(childNode)
            this.retrieveStepChildren(childNode)
          }
        }
      })
    },
    createChildStep (parentNode) {
      let newStep = this.makeStep()
      newStep.parent_id = parentNode.data.id
      newStep.position = parentNode.children.length
      $.ajax({
        method: 'POST',
        url: `${apiUrl}/circuits/${this.circuitId}/nodes`,
        data: newStep,
        success: createdStep => {
          let createdNode = this.makeNode(createdStep)
          parentNode.children.push(createdNode)
        }
      })
    },
    saveStep (node) {
      $.ajax({
        method: 'PATCH',
        url: `${config.url.api}circuits/${this.circuitId}/nodes/${node.data.id}`,
        data: node.data,
        success: step => {
          node.data = step
        }
      })
    },
    removeStep (node) {
      $.ajax({
        method: 'DELETE',
        url: `${config.url.api}circuits/${this.circuitId}/nodes/${node.data.id}`,
        success: () => {
          this.retrieveCircuit()
        }
      })
    },
    makeStep () {
      return {
        name: 'nouveau nœud',
        url: null,
        parent_id: null,
        position: null,
      }
    },
    makeNode (step) {
      if (!step) {
        step = this.makeStep()
      }
      return {
        name: step.name,
        children: [],
        data: step,
        editable: true
      }
    },
    selectNode (node) {
      this.selectedNode = node
    }
  },
  components: {
    StepEditor,
    TreeView
  }
}
</script>

<style>
#circuit-tree-view {
  float: left;
}

#circuit-step-editor {
  float: left;
  margin-left: 20px;
}

#circuit-tree-view, #circuit-tree-view ol {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

#circuit-tree-view li {
  margin: 0px;
}

#circuit-tree-view a {
  text-decoration: none;
}

#circuit-tree-view .glyphicon {
  color: #2A6698;
}

#circuit-tree-view .node-control {
  display: inline-block;
  width: 25px;
  padding: 0 5px;
  text-align: center;
}
</style>
