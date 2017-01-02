<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('closeRegister')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="form-group">
            <input v-model="username" type="text" placeholder="nom d'utilisateur" id="username" class="form-control">
            <p class="messageErreur" v-show="!checkUsername()">choisi un autre nom d'utilisateur ! </p>
          </div>
          <div class="form-group">
            <input v-model="email" type="text" placeholder="adresse électronique" :class="{ validEmail : isValidMail(),errorMail : !isValidMail() }" id="email" class="form-control">
            <p  class="messageErreur" v-show="!isValidMail()">adresse email invalide ! </p>
          </div>
          <div class="form-group">
            <input v-model="password" type="password" placeholder="mot de passe" id="password" class="form-control">
          </div>
          <div class="form-group">
            <input class="form-control" type="password" name="password2" placeholder="confirme ton mot de passe"
              id="password2" v-model="password2" :class="{ errorPassword : !checkPassword(), passOk : checkPassword() }">
            <p class="messageErreur" v-show="!checkPassword()">les deux mots de passe ne corresponde pas ! </p>
          </div>
          <button @click="createUser" class="btn btn-success" :disabled="!checkAll()">créer</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      password2:''
    }
  },
  methods: {
    createUser () {
      this.$emit('closeRegister')
      // this.$http.post(this.$root.$data.end_point + 'users', this.$data)
    },
    isValidMail () {
      var re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      return re.test(this.email)
    },
    checkUsername () {
      return this.username.length < 20 && this.username.length > 4
    },
    checkPassword () {
      return this.password === this.password2 && this.password !== ''
    },
    checkAll () {
      return this.isValidMail() && this.checkUsername() && this.checkPassword()
    }
  }
}
</script>


<style>
  .errorPassword,
  .errorPassword:focus,
  .errorMail,
  .errorMail:focus{
    border: 1px solid red
  }
  .passOk,
  .passOk:focus,
  .validEmail,
  .validEmail:focus{
    border: 1px solid green
  }
  .messageErreur{
    color: red
  }
</style>
