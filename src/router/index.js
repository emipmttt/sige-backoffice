import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/Auth/Auth.vue'
import SignIn from '../views/Auth/components/SignIn.vue'
import SignUp from '../views/Auth/components/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Auth,
    redirect: "/iniciar-sesion",
    children: [
      { path: "iniciar-sesion", component: SignIn },
      { path: "registrate", component: SignUp }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
