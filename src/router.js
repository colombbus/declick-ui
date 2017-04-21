import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CmsDocument from 'components/CmsDocument'
import Administration from 'components/Administration'
import course from 'components/learn/course'
import courseList from 'components/learn/courseList'
import Progress from 'components/learn/Progress'
import DeclickMap from 'components/learn/DeclickMap'

import config from 'assets/config/declick'

import AdministrationcourseList from 'components/administration/courseList'
import courseEditor from 'components/administration/courseEditor'

var routes = [
  {
    path: '/',
    name: 'home',
    component: CmsDocument,
    meta: {
      id: 4,
      title: 'Accueil'
    }
  },
  {
    path: '/explore',
    component: CmsDocument,
    meta: {
      id: 2,
      title: 'Découvrir'
    }
  },
  {
    path: '/progress',
    component: Progress,
    meta: { title: 'Progresser' },
    children: [
      {
        path: '',
        component: courseList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'course/:id',
        component: course,
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
    path: '/create',
    name: 'create',
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
        path: 'courses',
        component: AdministrationcourseList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'courses/:id',
        component: courseEditor,
        meta: { title: 'Modification de parcours' }
      }
    ]
  }
]

export default new VueRouter({
  mode: 'history',
  routes,
  base: config.basePath
})
