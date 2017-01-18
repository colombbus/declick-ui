<template>
  <div class="authenticated-user-box">
    <router-link
      to="/me"
    >{{authenticatedUser.username}}</router-link>
    <router-link to="/administration">
      <span
        class="glyphicon glyphicon-wrench"
        aria-hidden="true"
      ></span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['authenticatedUser'])
}
</script>

<style>
.authenticated-user-box {
  height: 38px;
  width: 150px;
  text-align: center;
  line-height: 35px;
  background-color: #642D46;
}

.authenticated-user-box a {
  padding: 0;
  font-family: Rubik, sans-serif;
  font-size: 18.6667px;
  color: white;
  outline: 0;
  cursor: pointer;
}

.authenticated-user-box .glyphicon {
  position: relative;
  top: 3px;
}
</style>
