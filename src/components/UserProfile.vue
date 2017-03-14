<template>
  <div id="userProfile">
    <p>
      tu peux modifier t'est information personnelle depuis cette page
    </p>
    <div class="form-group row">
      <label for="name" class="col-2 col-form-label">Nom d'utilisateur</label>
      <div class="col-10">
        <input type="text" name="name" class="form-control" v-model="authenticatedUser.username" disabled>
      </div>
    </div>
    <div class="form-group row">
      <label for="mail" class="col-2 col-form-label">email</label>
      <div class="col-10">
        <input type="email" name="mail" class="form-control" v-model="authenticatedUser.email">
        <p class="error">
          adresse mail deja existante
        </p>
      </div>
    </div>
    <div class="form-group row">
      <label for="password" class="col-2 col-form-label">changé de mot de passe</label>
      <div class="col-10">
        <input type="password" name="password" class="form-control"  v-model="password">
      </div>
    </div>
      <input type="button" name="submit" value="valider" @click="updateUser()" class="btn btn-default" v-show="haveUpdate()">
      <p class="confirmation">
        votre compte a bien eté mis a jours
      </p>
  </div>
</template>

<script>
/* global $ */

import { mapState } from 'vuex'
import declickConfig from '../assets/config/declick.js'

export default {
  data () {
    return {
      password: '',
      saveMail: ''
    }
  },
  computed: mapState(['authenticatedUser', 'authorizations']),
  created () {
    this.saveMail = this.authenticatedUser.email
  },
  methods: {
    haveUpdate () {
      return this.saveMail !== this.authenticatedUser.email ||
        this.password !== ''
    },
    updateUser () {
      var userUpdate = {}

      if (this.password !== '') {
        userUpdate.password = this.password
      }

      if (this.saveMail !== this.authenticatedUser.email) {
        userUpdate.email = this.authenticatedUser.email
      }

      if (userUpdate.email || userUpdate.password) {
        this.$http.patch(
          declickConfig.url.api + 'users/' +
          this.authenticatedUser.id,
          userUpdate,
          {headers:
            {Authorization: 'Token ' + this.authorizations}
          }).then(responce => {
            this.$store.commit('SET_USER', responce.body)
            this.saveMail = this.authenticatedUser.email
            this.password = ''
            $('.confirmation').css('display', 'block').delay(2500).fadeOut()
          }, (error) => {
            if (error.body.email) {
              $('.error').css('display', 'block').delay(2500).fadeOut()
            }
          })
      } else {
        console.log('tu a merdé')
      }
    }
  }
}
</script>
<style media="screen">
  #userProfile{
    margin: 20px auto;
    width: 900px;
  }
  #userProfile .row{
    margin: 0
  }
  .error,
  .confirmation{
    display: none
  }
</style>
