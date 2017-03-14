<template>
  <div class="panel panel-default" id="circuit-creator">
    <div class="panel-heading">nouveau parcours</div>
    <div class="panel-body">
      <div class="form-group">
        <label for="name">nom :</label>
        <input type="text" name="name" class="form-control" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="shortDescription">description courte :</label>
        <textarea name="shortDescription" class="form-control" id="shortDescription" v-model="shortDescription"></textarea>
      </div>
      <div class="form-group">
        <label for="description">description :</label>
        <textarea name="description" class="form-control" id="description" v-model="description"></textarea>
      </div>
      <button class="btn btn-success" type="button" @click="create">créer</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import config from 'assets/config/declick.js'

export default {
  data () {
    return {
      name: '',
      shortDescription: '',
      description: ''
    }
  },
  methods: {
    create () {
      let endpoint = `${config.url.api}circuits`
      let circuit = {
        name: this.name,
        short_description: this.shortDescription,
        description: this.description
      }
      Vue.http.post(endpoint, circuit).then(() =>
        this.$emit('circuit-created')
      )
    }
  }
}
</script>

<style>
#circuit-creator {
  width: 100%;
}
</style>
