import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchEvents from '@/views/SearchEvents.vue'
import SearchGroups from '@/views/SearchGroups.vue'
import Group from '@/views/Group.vue'
import Event from '@/views/Event.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search-events',
    component: SearchEvents
  },
  {
    path: '/groups',
    name: 'search-groups',
    component: SearchGroups
  },
  {
    path: '/group/:id',
    name: 'group',
    component: Group,
    props: true
  },
  {
    path: '/event/:id',
    name: 'event',
    component: Event,
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  //base: 'http://localhost:8080',
  routes,
})

// very basic "setup" of a global guard
router.beforeEach((to, from, next) => {
  if(to.name == 'login' || to.name == 'search-events') { // check if "to"-route is "login" and allow access
    next()
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next()
  } else { // trigger auth0 login
    router.app.$auth.login()
  }
})

export default router
