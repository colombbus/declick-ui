<template>
  <table class="table table-striped" id="listAdmin">
    <input type="text" id="search_form_search" name="search" class="form-control" placeholder="Rechercher">
    <tbody>
        <tr v-for="list in lists" class="list-group">
        <td v-for="field in list" v-if="isNaN(field)">
          <tr>{{field}}</tr>
        </td>
        <td><a class="btn btn-default"href="#">modifier</a></td>
      </tr>
    </tbody>
    <div id="pagination">
      <ul class="pagination">
        <li @click="loadPage( this.$store.state.current_page - 1 )"><a href="#">« Precedent</a></li>
        <li v-if="n <  this.$store.state.current_page + 5 && n >  this.$store.state.current_page - 5" v-for="n in this.$store.state.last_page" :class="{active : n ===  this.$store.state.current_page}" @click="loadPage(n)"><a href="#">{{n}}</a></li>
        <li @click="loadPage( this.$store.state.current_page + 1)"><a href="#">Suivant »</a></li>
      </ul>
    </div>
  </table>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data: function () {
    return {
      get_lists : '',
      nextPage : '',
      prevPage: ''
    }
  },
  computed:mapState(['lists','current_page','last_page']),
  beforeCreate() {
    ///console.log(this.$route.params.type);
    if(this.$route.params.type === 'users'){

      this.$store.dispatch('get_users')
    }
    if(this.$route.params.type === 'projects'){

      this.$store.dispatch('get_projects')
    }
  },
  watch:{
    '$route'(to,from){
      if(this.$route.params.type === 'users'){

        this.$store.dispatch('get_users')
      }
      if(this.$route.params.type === 'projects'){

        this.$store.dispatch('get_projects')
      }
    }
  },
  methods: {
    loadList: function () {
      this.$http.get(this.$store.state.endpoint + this.get_lists).then(function(response){
        console.log(response)
        this.current_page = response.body.current_page
        this.lastPage = response.body.last_page
        this.lists = response.body.data.sort((a, b) => a.id < b.id)
      })
    },
    loadPage (page) {
      this.$http.get(this.$store.state.endpoint + this.get_lists +'?page=' + page).then(function(response){
        this.current_page = response.body.current_page
        this.lastPage = response.body.last_page
        this.lists = response.body.data.sort((a, b) => a.id < b.id)
      })
    }
  }
}
</script>

<style media="screen">
  #listAdmin{
    margin-top: 65px;
  }
</style>
