<template>
  <!--
  <div>
    <step-tree-item
      :node="tree"
      @select-node="selectNode"
      id="root-node"
    ></step-tree-item>
    <ul class="list-group">
    </ul>
  </div>
  -->
  <div>
    <step-editor
      v-if="currentNode"
      :node="currentNode.data"
      @create-child="createChildNode"
      @save="saveNode"
      id="node-editor"
    ></step-editor><br>
    <div id="tree"></div>
    <button class="btn btn-secondary" type="button" @click="selectNode">modifier le noeud</button>
  </div>
</template>

<script>
// TOCO: use store

import 'assets/css/bootstrap-treeview.min.css'
import 'assets/js/bootstrap-treeview.min.js'

import config from 'assets/config/declick'

import StepEditor from './StepEditor'

let tree = []

export default {
  data () {
    return {
      id: null,
      name: null,
      short_description: null,
      description: null,
      nodes: [],
      currentNode: null
    }
  },
  created () {
    tree = []
    this.id = this.$route.params.id
    this.loadCircuit()
  },
  mounted () {
    $('#tree').treeview({data: tree})
    $('#tree').on('nodeSelected', function (event, data) {
      console.log('?...')
    });
  },
  methods: {
    loadCircuit () {
      let circuitPath = config.url.api + 'circuits/' + this.id
      this.$http.get(circuitPath).then((response) => {
        this.name = response.body.name
        this.short_description = response.body.name
        this.description = response.body.description

        let rootNodePath = config.url.api +
          'circuits/' + this.id + '/' +
          'nodes/' + response.body.root_node_id + '/' +
          'children'
        this.$http.get(rootNodePath).then((response) => {
          let children = response.body.sort((a, b) => a.position - b.position)
          for (let child of children) {
            let node = {text: child.name}
            node.data = child
            tree.push(node)
            this.loadNodeChildren(child.id, node)
          }
        })
      })
    },
    loadNodeChildren (id, node) {
      let nodeChildrenPath = config.url.api +
        'circuits/' + this.id + '/' +
        'nodes/' + id + '/' +
        'children'
      this.$http.get(nodeChildrenPath).then((response) => {
        let children = response.body.sort((a, b) => a.position - b.position)
        for (let child of children) {
          let childNode = {text: child.name}
          childNode.data = child
          if (!node.nodes) {
            node.nodes = []
          }
          node.nodes.push(childNode)
          this.loadNodeChildren(child.id, childNode)
        }
        $('#tree').treeview({data: tree})
      })
    },
    createChildNode () {
      let nodePath = config.url.api +
        'circuits/' + this.id + '/' +
        'nodes'

      let position = 0
      if (this.currentNode.nodes) {
        position = this.currentNode.nodes.length
      }

      let newNode = {
        name: 'nouveau noeud',
        link: '',
        parent_id: this.currentNode.data.id,
        position
      }

      console.log(newNode)

      this.$http.post(nodePath, newNode).then((response) => {

        let azaz = {
          text: response.body.name,
          data: response.body
        }

        console.log(azaz)

        if (!this.currentNode.nodes) {
          this.currentNode.nodes = []
        }
        $('#tree').treeview('addNode', [[azaz], this.currentNode])
        // this.currentNode.nodes.push(azaz)
        // $('#tree').treeview({data: tree})
        console.log('node created')
      })
    },
    saveNode () {
      let nodePath = config.url.api +
        'circuits/' + this.id + '/' +
        'nodes/' + this.currentNode.data.id

      this.$http.patch(nodePath, this.currentNode.data).then(() => {
        console.log('node updated')
      })
    },
    selectNode () {
      this.currentNode = $('#tree').treeview('getSelected')[0]
    }
  },
  components: {
    StepEditor
  }
}

/*
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
*/
</script>
