<template>
  <div>
    <div class="container">
      <h2>
        Projet > {{current_project.name}}
      </h2>
      <router-link to="/create" id="closeAdminPanel"  v-show="displayCreate"></router-link>
      <div class="panel panel-default">
        <div class="pull-right">
          <small><span class="label label-default">Privé</span></small>
        </div>
        <table class="data-display">
          <tbody>
            <tr>
              <td class="data-title">Nom du projet</td>
              <td>{{current_project.name}}</td>
            </tr>
            <tr>
              <td class="data-title">Responsable</td>
              <td>
                <a href="/declick-server/web/app.php/profile/1"
                   class="content-link" data-active="profile"
                >{{authenticatedUser.username}}</a>
              </td>
            </tr>
            <tr>
              <td class="data-title">Visible par tous</td>
              <td>{{current_project.is_public == true ? 'oui' : 'non'}}</td>
            </tr>
            <tr>
              <td class="data-title">Adresse du projet</td>
              <td>
                  <a href="/declick-server/web/app.php/project/execute/1"
                     target="declick_execution"
                  >{{current_project.project_link}}</a>
              </td>
            </tr>
            <tr>
              <td class="data-title">Programme principal</td>
              <td><i>{{current_project.entry_point_id}}</i></td>
            </tr>
            <tr>
              <td class="data-title">Largeur de la fenêtre (pixels)</td>
              <td>{{current_project.scene_width}}</td>
            </tr>
            <tr>
              <td class="data-title">Hauteur de la fenêtre (pixels)</td>
              <td>{{current_project.scene_height}}</td>
            </tr>
            <tr>
              <td class="data-title">Description</td>
              <td>{{current_project.description}}</td>
            </tr>
            <tr>
              <td class="data-title">Instructions</td>
              <td>{{current_project.instructions}}</td>
            </tr>
            <tr>
              <td class="data-title">Date de création</td>
              <td>{{current_project.created_at}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="well"> Ce projet est le projet par défaut, il ne peut pas être supprimé</div>
      <router-link to="edit/1" class="btn btn-default content-link">Modifier les informations</router-link>
      <a class="btn btn-default content-link" data-active="create" href="/declick-server/web/app.php/project/select/1">Travailler sur ce projet</a>
      <a class="btn btn-default" href="/declick-server/web/app.php/project/execute/1" target="declick_execution">Exécuter</a>
    </div>
  </div>

</template>



<script>
  import {mapState} from 'vuex'
  export default{
    computed: {
      ...mapState(['current_project', 'authenticatedUser']),
      displayCreate () {
        if (this.$route.path.match(/\/create/) != null) {
          return true
        }
      }
    },
    beforeCreate () {
      this.$store.dispatch('get_project', this.$store.state.authenticatedUser.default_project_id)
    }
  }
</script>

<style>
.main-create-container {
  height: 100%;
}
table.data-display td {
    padding: 5px 8px;
}

td.data-title {
    font-weight: bold;
    text-align: right;
}
</style>
