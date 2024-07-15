import { createRouter, createWebHistory } from 'vue-router'
//todo publico
import auth from '../views/Users/login.vue'
import Main from '../views/main.vue'


//administracion
import AD_login from '../views/Administracion/login_ad.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: Main
    },
    {
      path: '/login_ad',
      name:'AD_login',
      component: AD_login
    },
    {
      path: '/login',
      name:'login',
      component: auth,
    }

  ]
})

export default router
