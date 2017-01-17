<template>
  <div>
    <input
      type="text"
      class="form-control"
      placeholder="recherche par nom"
      disabled="disabled"
    >
    <table class="table table-hover">
      <thead>
        <tr>
          <th>identifiant</th>
          <th>nom</th>
          <th>description courte</th>
          <th><!-- actions --></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="circuit in circuits" class="list-group">
          <td>{{ circuit.id }}</td>
          <td>{{ circuit.name }}</td>
          <td>{{ circuit.short_description }}</td>
          <td>
            <router-link
              :to="'/administration/circuits/' + circuit.id"
              class="btn btn-default"
            >modifier</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <router-link
        v-if="currentPage && currentPage > 1"
        :to="'/administration/circuits?page=' + (currentPage - 1)"
        class="btn btn-default"
      >page précédente</router-link>
      <router-link
        v-if="
          !lastPage ||
          (currentPage && lastPage && currentPage < lastPage)"
        :to="'/administration/circuits?page=' + (currentPage + 1)"
        class="btn btn-default"
      >page suivante</router-link>
    </div>
  </div>
</template>

<script>
// TODO: use store

import config from 'assets/config/declick.js'

export default {
  data () {
    return {
      circuits: [],
      currentPage: null,
      lastPage: null
    }
  },
  created () {
    this.currentPage = Number(this.$route.query.page) || 1
    this.loadCircuitList()
  },
  watch: {
    '$route.query' () {
      this.currentPage = Number(this.$route.query.page) || this.currentPage
      this.loadCircuitList()
    }
  },
  methods: {
    loadCircuitList () {
      let options = {params: {page: this.currentPage}}
      this.$http.get(config.url.api + 'circuits', options).then((response) => {
        this.lastPage = response.body.last_page
        this.circuits = response.body.data
      })
    }
  }
}
</script>
