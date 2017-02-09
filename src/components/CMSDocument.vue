<template>
  <div>
    <div class="cms-document-loading-message">
      <img src="assets/img/spinner.gif">
      <p>Chargement...</p>
    </div>
    <div class="cms-document-content"></div>
  </div>
</template>

<script>
import config from 'assets/config/declick'

export default {
  props: [
    'id'
  ],
  created () {
    let url = config.url.cms +
      'api/1/tables/pages/rows/' +
      this.id +
      '?access_token=jWNoVhWCng6odNLK'
    this.$http.get(url).then((response) => {
      $(this.$el).find('.cms-document-loading-message').fadeOut()
      $(this.$el).find('.cms-document-content').append(
        $.parseHTML(response.body.content)
      ).fadeIn()
    })
  }
}
</script>

<style>
.cms-document-loading-message img {
  height: 50px;
}

.cms-document-loading-message p {
  font-weight: bold;
}
</style>
