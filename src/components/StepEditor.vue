<template>
  <div>
    <div class="form-group">
      <label for="name">nom :</label>
      <input type="text" name="name" class="form-control" id="name" v-model="node.name">
    </div>
    <div class="form-group">
      <label for="link">lien :</label>
      <input type="text" name="link" class="form-control" id="link" v-model="node.url">
    </div>
    <button class="btn btn-success" type="button" @click="saveNode">enregistrer</button>
    <button class="btn btn-success" type="button" @click="createChildNode">ajouter élément</button>
  </div>
</template>

<script>
export default {
  props: [
    'node'
  ],
  methods: {
    createChildNode: function () {
      this.$emit('create-child-node', this.node)
    },
    saveNode: function () {
      this.$emit('save-node', this.node)
    }
  }
}
</script>
