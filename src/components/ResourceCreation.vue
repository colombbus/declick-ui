<template>
  <div class="container">
    <div class="form-group">
      <input @change="setContent" type="file" id="resource-file-input" class="form-control">
    </div>
    <button @click="createResource" class="btn btn-success">créer</button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      content: null
    }
  },
  methods: {
    setContent (content) {
      this.content = content
    },
    createResource () {
      var file = document.getElementById('resource-file-input').files[0];
      var reader = new FileReader()
      reader.onloadend = function ({ target: { result } }) {
        var buffer = new ArrayBuffer(result.length)
        var writer = new Uint8Array(buffer)
        for (var position = 0; position < result.length; position++) {
            writer[position] = result.charCodeAt(position)
        }
        Vue.http.put('http://localhost:8000/api/v1/projects/1/resources/1/content', null, {
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          before (request) {
            request.body = writer
            console.log(request)
          }
        })
      }
      reader.readAsBinaryString(file)
    }
  }
}
</script>
