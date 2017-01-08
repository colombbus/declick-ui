import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//import Create from 'components/Create'
import CircuitManager from 'components/CircuitManager'
import UserProfile from 'components/UserProfile'
import ResourceCreation from 'components/ResourceCreation'
import CircuitList from 'components/CircuitList'
import CommunityGameList from 'components/CommunityGameList'
import Administration from 'components/Administration'
import EditProject from 'components/EditProject'
import ListAdmin from 'components/ListAdmin'
import DeclickMap from 'components/DeclickMap'
import MyList from 'components/MyList'
import CurrentProjectInformations from 'components/CurrentProjectInformations'
import declickConfig from 'assets/config/declick.js'
import PageDeclick from 'components/PageDeclick'


var routes = [
  {
    path:'/',
    name:'Acceuil',
    component:PageDeclick
  },
  {
    path: '/explore',
    name: 'Découvrir',
    component: CommunityGameList
  },
  {
    path: '/progress',
    component: CircuitList,
    name: 'Parcours'
  },
  {
    path: '/users/me',
    component: UserProfile,
    name: 'Mon Profil'
  },
  { path: '/resources/new', component: ResourceCreation, name: 'Création de ressource' },
  { path: '/circuits/edit', component: CircuitManager, name: 'Éditeur de circuit' },
  /*{ path: '/create', component: Create, name: 'Créer'/*, children: [
      { path: 'current', component: CurrentProjectInformations, name: 'Panneau d\'exemple'},
      { path: 'administration', component: Administration, name: 'Administration', children: [
          { path: 'lists/:type', component: ListAdmin, name :'liste'}/*,
          { path: 'projects', component: ProjectList, name :'liste des projets'},
          { path: 'exercices', component: ExercicesList, name :'liste des exercices'}
        ]
      },
      { path: 'edit/:id', component: EditProject, name: 'Edition'},
      { path: 'list/:type', component: MyList, name: 'list'}
  ]},*/
  { path: '/create', name: 'Créer' },
  { path: '/DeclickMap', component: DeclickMap, name: 'DeclickMap' },
  { path: '/administration', component: Administration, name: 'Administration', children: [
      { path: 'lists/:type', component: ListAdmin, name :'liste'},
      { path: 'current', component: CurrentProjectInformations, name: 'Panneau d\'exemple'},
      { path: 'edit/:id', component: EditProject, name: 'Edition'},
      { path: 'list/:type', component: MyList, name: 'list'}
    ]}
]

export default new VueRouter({
  mode: 'history',
  routes,
  base: declickConfig.basePath
})
