<template>
  <div>
    <div class="form-group">
      <label for="name">nom :</label>
      <input type="text" name="name" class="form-control" id="name" v-model="node.name">
    </div>
    <div class="form-group">
      <label for="link">lien :</label>
      <input type="text" name="link" class="form-control" id="link" v-model="node.link">
    </div>
    <button class="btn btn-success" type="button" @click="save">enregistrer</button>
    <button class="btn btn-success" type="button" @click="createChild">ajouter élément enfant</button>
  </div>
</template>

<script>
export default {
  props: [
    'node'
  ],
  methods: {
    createChild: function () {
      this.$emit('create-child', this.node)
    },
    save: function () {
      this.$emit('save', this.node)
    }
  }
}
</script>
