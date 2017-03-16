<template lang="pug">
.self
  | Réalisé par
  |
  a(target='_blank' href='http://www.colombbus.org/') Colombbus
  a(href='mailto:declick@colombbus.org' class='right-aligned')
    | Contactez-nous !
    |
    span.glyphicon.glyphicon-envelope
</template>

<style lang="sass" scoped>
a
  color: #D1D718
  text-decoration: none

.self
  clear: both
  height: 25px
  padding: 0 5px
  font-size: 12pt
  color: #D1D718
  background-color: #480A2A
  border-top: 1px solid #D1D718

.right-aligned
  float: right

.glyphicon
  position: relative
  top: 2px
</style>
