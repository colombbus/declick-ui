<template lang="html">
  <div>
    <div class="container">
      <h2>Modification du projet</h2>
      <router-link to="/create" id="closeAdminPanel" v-show="displayCreate"></router-link>
      <div class="form-group">
        <label for="project_name">Nom du projet</label>
        <input type="text" id="project_name"class="form-control"  v-model="current_project.name">
      </div>
      <div class="form-group">
        <div class="checkbox">
          <label for="project_published">
            <input type="checkbox" id="project_published" v-model="current_project.is_public">
              Visible par tous
          </label>
        </div>
      </div>
      <div class="form-group">
        <label for="project_launcher" class="required">Programme principal</label>
        <select id="project_launcher" name="project[launcher]" class="form-control" v-model="current_project.program">
          <option value="10046">Quiz</option>
          <option value="8089">collision1</option>
          <option value="8090">collision2</option>
          <option value="7008">documentation</option>
          <option value="5150">editeur</option>
          <option value="5527">esquive</option>
          <option value="5345">fin</option>
          <option value="5529">labyrinthe</option>
          <option value="7835">objetsAutoInstanciés</option>
          <option value="5528">plateforme</option>
          <option value="7831">plusieursBugs</option>
          <option value="6393">position</option>
          <option value="5903">son</option>
          <option value="8981">souris</option>
          <option value="5530">voiture</option>
          <option value="6600">écran</option>
        </select>
      </div>
      <div class="form-group">
        <label for="project_width">Largeur de la fenêtre (pixels)</label>
        <input type="number" id="project_width" name="project[width]" class="form-control" v-model="current_project.scene_width">
      </div>
      <div class="form-group">
        <label for="project_height">Hauteur de la fenêtre (pixels)</label>
        <input type="number" id="project_height" name="project[height]" class="form-control" v-model="current_project.scene_height">
      </div>
      <div class="form-group">
        <label for="project_description">Description</label>
        <textarea id="project_description" name="project[description]" class="form-control" v-model="current_project.description"></textarea>
      </div>
      <div class="form-group">
        <label for="project_instructions">Instructions</label>
        <textarea id="project_instructions" name="project[instructions]" class="form-control" v-model="current_project.instructions"></textarea>
      </div>
      <div class="form-group">
        <div class="checkbox">
          <label for="project_readonly">
            <input type="checkbox" id="project_readonly" name="project[readonly]" v-model="current_project.is_public">
              Projet en lecture seule
          </label>
        </div>
      </div>
      <div class="form-group button-group">
        <router-link v-show="!displayCreate" to="/administration/current" class="btn btn-default" ><span class="glyphicon glyphicon-remove"></span>
       Annuler</router-link>
        <router-link v-show="displayCreate" to="/create/current" class="btn btn-default" ><span class="glyphicon glyphicon-remove"></span>
       Annuler</router-link>
       <button type="button" name="button" @click="updateProject()" class="btn  btn-primary">Enregistrer
         <span class="glyphicon glyphicon-ok"></span></button>
      </div>
  </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['current_project','authorizations']),
    displayCreate(){
      if(this.$route.path.match(/\/create/) != null){
        return true
      }
    }
  },
  methods: {
    updateProject () {
      this.$store.dispatch('update_projects', {data:this.current_project,token:this.authorizations}).then(() => {
        this.$store.dispatch('get_project', this.$store.state.current_project.id)
        if(this.$route.path.match(/\/create/) == null){
          this.$router.push('/administration/current')
        }else{
          this.$router.push('/create/current')
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
