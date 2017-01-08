<template lang="html">
  <div id="contentContainerAcceuil">
  </div>
</template>

<script>
export default {
  created(){
    this.$http.get('http://localhost/directus/api/1/tables/testTable/rows/1?access_token=DY641vbi1aNV9Dyd').then((responce) => {
      $('#contentContainerAcceuil').append($.parseHTML(responce.body.longTextTest))
    })
  }
}
</script>

<style lang="css">
</style>
