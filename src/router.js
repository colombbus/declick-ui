import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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

import MyList from 'components/MyList'
import CurrentProjectInformations from 'components/CurrentProjectInformations'
import declickConfig from 'assets/config/declick.js'
import PageDeclick from 'components/PageDeclick'

import AdministrationCircuitList from 'components/administration/CircuitList'
import CircuitEditor from 'components/administration/CircuitEditor'

var routes = [
  {
    path: '/',
    name: 'home',
    component: PageDeclick,
    meta: { title: 'Accueil' }
  },
  {
    path: '/explore',
    component: CommunityGameList,
    meta: { title: 'Découvrir' }
  },
  {
    path: '/progress',
    component: Progress,
    meta: { title: 'Progresser' },
    children: [
      {
        path: '',
        component: CircuitList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'circuit/:id',
        component: Circuit,
        children: [
          {
            path: '',
            name: 'map',
            component: DeclickMap,
            meta: { title: 'Parcours' }
          },
          {
            name: 'step',
            path: 'run',
            meta: {
              title: 'Étape',
              useFullscreen: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/users/me',
    component: UserProfile,
    meta: { title: 'Mon Profil' }
  },
  {
    path: '/resources/new',
    component: ResourceCreation,
    meta: { title: 'Création de ressource' }
  },
  {
    path: '/create',
    name: 'Créer',
    meta: {
      title: 'Créer',
      useFullscreen: true
    }
  },
  {
    path: '/administration',
    component: Administration,
    meta: { title: 'Administration' },
    children: [
      {
        path: 'circuits',
        component: AdministrationCircuitList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'circuits/:id',
        component: CircuitEditor,
        meta: { title: 'Modification de parcours' }
      },
      {
        path: 'lists/:type',
        component: ListAdmin,
        meta: { title: 'liste' }
      },
      {
        path: 'current',
        component: CurrentProjectInformations,
        meta: { title: 'Panneau d\'exemple' }
      },
      {
        path: 'edit/:id',
        component: EditProject,
        meta: { title: 'Edition' }
      },
      {
        path: 'list/:type',
        component: MyList,
        meta: { title: 'list' }
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  routes,
  base: declickConfig.basePath
})
