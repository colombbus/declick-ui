import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import CmsDocument from 'components/CmsDocument'
import Administration from 'components/Administration'
import Course from 'components/learn/Course'
import CourseList from 'components/learn/CourseList'
import Progress from 'components/learn/Progress'
import DeclickMap from 'components/learn/DeclickMap'

import config from 'assets/config/declick'

import AdministrationCourseList from 'components/administration/CourseList'
import CourseEditor from 'components/administration/CourseEditor'
import UserProfile from 'components/user/UserProfile'
import UserEditor from 'components/user/UserEditor'

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
    path: '/users/:id',
    component: UserProfile,
    meta: {
      title: 'Utilisateurs',
      keepAlive: false
    },
    props: true
  },
  {
    path: '/users/:id/edit',
    component: UserEditor,
    meta: {
      title: 'Modification de profil utilisateur',
      keepAlive: false
    },
    props: true
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
        component: CourseList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'course/:id',
        component: Course,
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
        component: AdministrationCourseList,
        meta: { title: 'Liste des parcours' }
      },
      {
        path: 'courses/:id',
        component: CourseEditor,
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
