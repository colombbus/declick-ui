<template>
  <ul id="breadcrumb">
    <li v-for="(level, index) in route">
      <router-link
        v-if="index !== route.length - 1"
        :to="level.path"
        :class="'level-' + (index + 1)"
      >{{level.meta.title}}</router-link>
      <span
        v-else
        :class="['level-' + (index + 1), 'current']"
      >{{level.meta.title}}</span>
    </li>
  </div>
</template>

<script>
export default {
  computed: {
    route () {
      return this.$route.matched.slice()
    }
  }
}
</script>

<style>
#breadcrumb{
  height: 25px;
  margin-bottom: 0;
  padding-left: 0px;
  background-color: #480A2A;
}

#breadcrumb ul {
  margin-bottom: 10px;
}

#breadcrumb li {
  float: left;
  height: 25px;
  margin-left: 0px;
  margin-right: 5px;
  list-style-type: none;
}

#breadcrumb a,
#breadcrumb span {
  display: inline-block;
  padding: 0 5px;
  border-left: 5px solid;
  border-color: #E42C20;
  line-height: 25px;
  font-size: 12pt;
  font-weight: bold;
  color: white;
}

#breadcrumb .level-1 {
  border-color: #0FAC8E;
}

#breadcrumb .level-2 {
  border-color: #E11782;
}

#breadcrumb .current {
  color: #D1D718;
}
</style>
