<template lang="pug">
.home
  .home__presentation
    h4 Declick est un outil clé en main !
    p.
      En classe, en atelier ou à la maison, il permet d'aborder les bases du
      code informatique et de les appliquer à travers des projets, individuels
      ou collectifs, d'applications ou de jeux vidéo.
  .home__box
    h3 les parcours
    p.
      La section « APPRENDRE » regroupe des parcours qui vous permettent
      d'assimiler progressivement des notions de programmation.
  .home__box
    h3 l'espace créatif
    p.
      La section « CRÉER » vous propose un environnement de travail où vous
      pouvez composer avec les notions acquises pour créer vos propres jeux et
      applications.
  .home__box
    h3 l'espace découverte
    p.
      Dans la section « JOUER » retrouvez et testez les jeux ou les
      applications créés par la communauté Declick.
  h2 declick en vidéo
  .home__video
    iframe(
      src='https://player.vimeo.com/video/211507001?title=0&byline=0&portrait=0'
      frameborder='0'
      webkitallowfullscreen
      mozallowfullscreen
      allowfullscreen
    )
  h2 notre approche
  .home__box
    h3 notre mission
    p.
      Declick a été conçu pour initier les 8-15 ans au code et à la création
      numérique, à travers la programmation écrite. La plateforme constitue
      ainsi une étape intermédiaire entre les éditeurs visuels (type Scratch)
      et les vrais environnements de programmation.
  .home__box
    h3 notre pédagogie
    p.
      Declick est le fruit de plus de 10 ans d'expérience de l'enseignement de
      la programmation auprès des jeunes, notamment en zone d'éduction
      prioritaire : la plateforme est utilisée quotidiennement pour l'animation
      d'ateliers dans les collèges les écoles élémentaires et les centres
      d'animation.
  .home__box
    h3 un logiciel libre
    p.
      Declick est gratuit et libre : le code source de la plateforme est
      hébergé sur GitHub et diffusé sous license GPL 3.0. Si vous voulez
      contribuer au développement, n'hésitez pas à nous contacter !
  .home__about-us
    h3 l'association Colombbus
    p.
      Depuis 18 ans nous agissons pour l'éducation la formation, l'insertion
      sociale et professionnelle grâce à l'informatique et à internet. À
      travers nos activités nous facilitons l'usage et l'appropriation des
      outils numériques qui deviennent alors vecteurs d'inclusion, de
      développement personnel et de lien social.
    a(href='https://www.colombbus.org/' target='_blank') en savoir plus
  .home__partners
    .home__box
      h3 nos partenaires éducatifs
      .home__logo-group
    .home__box
      h3 nos partenaires publics
      .home__logo-group
    .home__box
      h3 nos partenaires privés
      .home__logo-group
</template>

<style lang="sass">
@import '~@/styles/mixins'

.home
  display: grid
  max-width: 992px
  margin: auto
  padding: 40px 10px 0 10px
  grid-template-columns: repeat(12, 1fr)
  grid-gap: 30px
  text-align: center
  color: #531937

.home h2, .home h3
  margin-bottom: 5px
  font-weight: bold
  text-transform: uppercase
  letter-spacing: 2px
  &:after
    content: ''
    display: block
    width: 100px
    margin: auto
    margin-top: 7px
    border-bottom: 1px solid #e32c20

.home h3
  font-size: 11pt
  text-align: center
  color: #e32c20

.home h2
  font-size: 18pt

.home__presentation
  width: 66%
  margin: auto
  font-size: 12pt

.home__presentation h4
  margin-bottom: 5px
  font-size: 14pt
  font-weight: bold

.home > *
  grid-column: 1 / -1

.home__box
  margin-bottom: 30px
  grid-column: span 4

.home__video
  +ratio-container(16, 9)
  margin-bottom: 35px

.home .home__about-us
  +full-width-background(#de1580)
  width: 66%
  margin: auto
  padding: 50px 0
  *
    color: #fff
  h3
    font-weight: inherit
  h3:after
    border-color: white
  p
    margin-bottom: 20px
  & > a
    padding: 5px
    border: 1px solid white
    font-size: 8pt
    text-decoration: none
    text-transform: uppercase

.home .home__partners
  +full-width-background(#480a2a)
  display: grid
  margin-top: -30px
  grid-template-columns: repeat(12, 1fr)
  *
    color: #fff
  h3
    font-weight: normal
  h3:after
    display: none

.home__partners .home__box
  position: relative
  & + *:before
    position: absolute
    left: 0
    top: 50px
    content: ''
    height: 140px
    border-left: 1px solid #fff

.home__logo-group
  height: 150px
</style>
