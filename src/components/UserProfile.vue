<template>
  <div>
    <h1>{{ username }}</h1>
    <p>Moi, ma vie, mon histoire.</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState(['username'])
}
</script>
