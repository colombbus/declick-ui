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
        <tr v-for="course in courses" class="list-group">
          <td>{{ course.id }}</td>
          <td>{{ course.name }}</td>
          <td>{{ course.short_description }}</td>
          <td>
            <router-link
              :to="'/administration/courses/' + course.id"
              class="btn btn-default"
            >modifier</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <router-link
        v-if="currentPage && currentPage > 1"
        :to="'/administration/courses?page=' + (currentPage - 1)"
        class="btn btn-default"
      >page précédente</router-link>
      <router-link
        v-if="
          !lastPage ||
          (currentPage && lastPage && currentPage < lastPage)"
        :to="'/administration/courses?page=' + (currentPage + 1)"
        class="btn btn-default"
      >page suivante</router-link>
    </div>
    <course-creator @course-created="loadcourseList"></course-creator>
  </div>
</template>

<script>
// TODO: use store

import courseCreator from './courseCreator'
import config from 'assets/config/declick'

export default {
  data () {
    return {
      courses: [],
      currentPage: null,
      lastPage: null
    }
  },
  created () {
    this.currentPage = Number(this.$route.query.page) || 1
    this.loadcourseList()
  },
  watch: {
    '$route.query' () {
      this.currentPage = Number(this.$route.query.page) || this.currentPage
      this.loadcourseList()
    }
  },
  methods: {
    loadcourseList () {
      let options = {params: {page: this.currentPage}}
      this.$http.get(config.apiUrl + 'v1/courses', options).then((response) => {
        this.lastPage = response.body.last_page
        this.courses = response.body.data
      })
    }
  },
  components: {
    courseCreator
  }
}
</script>
