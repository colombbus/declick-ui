<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
var activePath = null

export default {
  beforeRouteEnter (to, from, next) {
    if (activePath && activePath !== to.path) {
      next(activePath)
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    activePath = from.path
    next()
  }
}
</script>
