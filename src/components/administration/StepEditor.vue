<template>
  <div>
    <div class="form-group">
      <label for="name">nom</label>
      <input type="text" name="name" class="form-control" id="name" v-model="node.data.name" :disabled="!node.editable">
    </div>
    <div class="form-group">
      <label for="link">lien</label>
      <input type="text" name="link" class="form-control" id="link" v-model="node.data.link" :disabled="!node.editable">
    </div>
    <button class="btn btn-success" type="button" @click="save" :disabled="!node.editable">enregistrer</button>
    <button class="btn btn-success" type="button" @click="createChild">ajouter étape enfant</button>
    <button class="btn btn-danger" type="button" @click="remove" :disabled="!node.editable">supprimer</button>
  </div>
</template>

<script>
export default {
  props: [
    'node'
  ],
  watch: {
    ['node.data.name'] () {
      this.node.name = this.node.data.name
    }
  },
  methods: {
    createChild () {
      this.$emit('create-child', this.node)
    },
    save () {
      this.$emit('save', this.node)
    },
    remove () {
      this.$emit('remove', this.node)
    }
  }
}
</script>
