<template>
  <div>
    <div id="create-navigation-bar">
      <div class="dropdown">
        <a id="create-menu-dropdown-trigger" type="button" data-toggle="dropdown"><img src="../assets/img/menu.png" alt="" /></a>
        <ul class="dropdown-menu dropdown-menu-left">
          <li><router-link to="/create/current">Informations</router-link></li>
          <li role="separator" class="divider"></li>
          <li><router-link to="/create/list/project">Projets</router-link></li>
          <li role="separator" class="divider"></li>
          <li><router-link to="/create/list/project">Exercises</router-link></li>
          <li><router-link to="/administration">Administration</router-link></li>
        </ul>
      </div>
      <span id="project-name">Mon projet</span>
      <span id="switch-view-button"></span>
    </div>
  </div>
</template>

<style>
#create-navigation-bar {
  height: 50px;
  line-height: 50px;
  padding: 0 5px;
}

.dropdown {
  display: inline-block;
}

#create-menu-dropdown-trigger {
  cursor: pointer;
  display: inline-block;
  height: 8px;
  width: 21px;

}

#project-name {
  font-size: 20pt;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  display: inline-block;
  vertical-align: middle;
  color: #480a2a;
}

#switch-view-button {
  float: right;
  display: inline-block;
  margin-top: 5px;
  height: 36px;
  width: 36px;
  background-color: transparent;
  cursor: pointer;
  background-image: url('../assets/img/view.png');
}
#switch-view-button:hover {
  background-image: url('../assets/img/view_on.png');
}
</style>
