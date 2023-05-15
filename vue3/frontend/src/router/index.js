import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContasView from '../views/ContasView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'
import UsuariosView from '../views/UsuariosView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contas',
    name: 'contas',
    component: ContasView
  },
  {
    path: '/relatorios',
    name: 'relatorios',
    component: RelatoriosView
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
