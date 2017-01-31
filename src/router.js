import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Create from 'components/Create'
import UserProfile from 'components/UserProfile'
import ResourceCreation from 'components/ResourceCreation'
import CommunityGameList from 'components/CommunityGameList'
import Administration from 'components/Administration'
import EditProject from 'components/EditProject'
import ListAdmin from 'components/ListAdmin'
import Circuit from 'components/progress/Circuit'
import CircuitList from 'components/progress/CircuitList'
import Progress from 'components/progress/Progress'
import DeclickMap from 'components/progress/DeclickMap'
import CircuitRun from 'components/progress/CircuitRun'
import MyList from 'components/MyList'
import CurrentProjectInformations from 'components/CurrentProjectInformations'
import declickConfig from 'assets/config/declick.js'
import PageDeclick from 'components/PageDeclick'

import AdministrationCircuitList from 'components/administration/CircuitList'
import CircuitEditor from 'components/administration/CircuitEditor'

var routes = [
  {
    path:'/',
    name:'Accueil',
    component:PageDeclick
  },
  {
    path: '/explore',
    name: 'Découvrir',
    component: CommunityGameList
  },
  {
    path: '/progress', component: Progress, name: 'Progresser', children: [
      {path: '', component: CircuitList, name: 'Liste des parcours '},
      {path: 'circuit', component: Circuit, children: [
        {path: '', component: DeclickMap, name: 'Parcours'},
        {path: 'run', component: CircuitRun, name:'Etape'}
      ]}
    ]
  },
  {
    path: '/users/me',
    component: UserProfile,
    name: 'Mon Profil'
  },
  { path: '/resources/new', component: ResourceCreation, name: 'Création de ressource' },
   { path: '/create', component: Create, name: 'Créer', children: [
      { path: 'current', component: CurrentProjectInformations, name: 'Panneau d\'exemple '},
      { path: 'administration', component: Administration, name: 'Administration ', children: [
          { path: 'lists/:type', component: ListAdmin, name :'liste '},
          // { path: 'projects', component: ProjectList, name :'liste des projets'},
          // { path: 'exercices', component: ExercicesList, name :'liste des exercices'}
        ]
      },
      { path: 'edit/:id', component: EditProject, name: 'Edition '},
      { path: 'list/:type', component: MyList, name: 'list '}
  ]},
  { path: '/administration', component: Administration, name: 'Administration', children: [
    {
      path: 'circuits',
      component: AdministrationCircuitList,
      name: 'Liste des parcours'
    },
    {
      path: 'circuits/:id',
      component: CircuitEditor,
      name: 'Modification de parcours'
    },
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
