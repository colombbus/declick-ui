<template>
  <ul id="breadcrumb">
    <li v-for="(level, index) in route">
      <router-link
        :to="level.path"
        :class="'level-' + (index + 1)"
      >{{level.name}}</router-link>
    </li>
  </div>
</template>

<script>
export default {
  computed: {
    route () {
      return [
        {
          name: 'Accueil',
          path: '/'
        }
      ].concat(this.$route.matched)
    }
  }
}
</script>

<style>
#breadcrumb {
  position: relative;
  margin-bottom:0;
}

#breadcrumb a {
  display: inline-block;
  height: 25px;
  padding: 0 5px;
  border-left: 5px solid;
  line-height: 25px;
  vertical-align: center;
  font-size: 12pt;
  font-weight: bold;
  text-decoration: none;
}

#breadcrumb li {
  display: inline-block;
}

#breadcrumb .level-1 {
  border-color: #0FAC8E;
}

#breadcrumb li a {
  color: white
}
/***
*TODO definire des couleurs pour les bordures suivant le niveau de l'élément 
**/
#breadcrumb #level-2 {
  border-color: #E11782;
}

#breadcrumb #level-3 {
  border-color: #E11782;
}

#breadcrumb #level-4 {
  border-color: #E11782;
}

#breadcrumb li:last-child a{
    color: #D1D718;
    border-color: #D1D718!important;
}

#breadcrumb .level-1 {
  color: white
}

#breadcrumb .level-2 {
  border-color: #E11782;
}

#breadcrumb .level-2 {
  color: #D1D718
}

</style>
