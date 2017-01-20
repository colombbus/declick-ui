<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div v-if="!inscription">
            <div class="form-group" >
              <input @keyup.enter="authenticate"  v-model="username" type="text" :class="error_code == 422 ? 'alert alert-danger form-control':'form-control' " placeholder="nom d'utilisateur" name="username">
              <p v-if="error_code == 422 " class="modalError bg-warning">
                nom d'utilisateur non trouver !
              </p>
            </div>
            <div class="form-group">
              <input @keyup.enter="authenticate" v-model="password" :class="error_code == 401 ? 'alert alert-danger form-control':'form-control' " type="password" class="form-control" placeholder="mot de passe" name="password">
              <p v-if="error_code == 401 " class="modalError bg-warning">
                erreur de nom de compte ou de mot de passe !
              </p>
            </div>
            <button @click="authenticate" class="btn btn-block btn-primary" type="button">se connecter</button>
            <button class="btn btn-block btn-primary" type="button" @click="regrister">s'inscrire</button>
            <button class="btn btn-block btn-social btn-google" id="g-signin2" data-onsuccess="onSignIn">
              <span class="fa fa-google"></span> Se connecter via Google
            </button>
            <button @click="facebook" class="btn btn-block btn-social btn-facebook">
              <span class="fa fa-facebook"></span> Se connecter via Facebook
            </button>
          </div>


          <div v-else>
            <div class="form-group" >
              <input v-model="userMail" :class="error_code == 401 ? 'alert alert-danger form-control':'form-control'" placeholder="email" name="email" type="email">
              <p v-if="error.email" class="modalError bg-warning">
                adresse deja existante
              </p>
            </div>
            <div class="form-group" >
              <input v-model="username" type="text" :class="error_code == 422 ? 'alert alert-danger form-control':'form-control' " placeholder="nom d'utilisateur" name="username">
              <p v-if="error.username" class="modalError bg-warning">
                utilisateur déja enregistré
              </p>
            </div>
            <div class="form-group">
              <input v-model="password" :class="error_code == 401 ? 'alert alert-danger form-control':'form-control' " type="password" class="form-control" placeholder="mot de passe" name="password">
            </div>
            <div class="form-group">
              <input v-model="confirmPassword" type="password" class="form-control" placeholder="confirmation mot de passe" name="password">
              <p v-if="confirmPassword != password " class="modalError bg-warning">
                les mots de passes ne conrresponde pas
              </p>
            </div>
            <button class="btn btn-block btn-primary" type="button" @click="validation">valide</button>
            <button class="btn btn-block btn-social btn-google" id="g-signin2" data-onsuccess="onSignIn">
              <span class="fa fa-google"></span> insctiption via Google
            </button>
            <button @click="facebook" class="btn btn-block btn-social btn-facebook">
              <span class="fa fa-facebook"></span> insctiption via Facebook
            </button>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import 'bootstrap-social/bootstrap-social.css'
import 'font-awesome/css/font-awesome.css'

import { FACEBOOK_APP_ID, GOOGLE_APP_ID } from '../assets/config/social-services.js'

import '../assets/js/google-platform.js'

import * as type from '../store/mutation-types.js'

import { mapState } from 'vuex'

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());
}


export default {
  data () {
    return {
      inscription:false,
      userMail:'',
      confirmPassword:'',
      username: '',
      password: '',
      error:{}
    }
  },
  computed:mapState(['error_code']),
  mounted () {
    gapi.load('auth2', function() {
      let auth2 = gapi.auth2.init({
        client_id: GOOGLE_APP_ID
      })

      let element = document.getElementById('g-signin2')

      auth2.attachClickHandler(element, {},
        onSignIn,
        function(error) {
          alert(JSON.stringify(error, undefined, 2));
        }
      );
    })

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId      : FACEBOOK_APP_ID,
        version    : 'v2.8' // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });
    }

  },
  methods: {
    authenticate () {
      this.$http.post(type.ENDPOINT + 'authorizations', {
        'username': this.username,
        'password': this.password
      }).then((response) =>{
        this.$emit('close')
        this.$store.commit(type.AUTHENTICATION_SUCCESS, response.body.token);
        this.$store.dispatch('get_user',response.body.owner_id)
      },(error) =>{
        this.$store.commit(type.ERROR,error)
      })


      //
      // this.$store.dispatch('authenticate', {
      //   'username': this.username,
      //   'password': this.password
      // }).then(() => {
      //   if(this.$store.state.error_code == 0)
      //     this.$emit('close')
      // })

    },
    facebook () {
      FB.login( function(response) {
        // console.log(response)
        /*
        FB.api('/me',
            {fields: "id,about,age_range,picture,birthday,context,email,first_name,gender,hometown,link,location,middle_name,name,timezone,website,work"},
            function(response) {
              console.log('API response', response);
            }
        );
        */
      }, { scope: 'email,public_profile' } );
    },
    regrister () {
      this.inscription = !this.inscription
    },
    validation(){
      this.$http.post(type.ENDPOINT + 'users', {'email':this.userMail,'username':this.username,'password':this.password}).then((response) => {
        this.authenticate()
        this.$emit('close')
      },(error) => {
        this.error = error.body
      })
    }
  }
}
</script>

<style lang="css">
.modalError{
  font-size: 13px;
  padding: 5px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
