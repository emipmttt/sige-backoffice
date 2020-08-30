import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Auth
  },

]

const router = new VueRouter({
  routes
})

export default router
