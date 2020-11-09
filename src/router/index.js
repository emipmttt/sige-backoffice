import Vue from 'vue'
import VueRouter from 'vue-router'

// auth
import Auth from '../views/Auth/Auth.vue'
import SignIn from '../views/Auth/components/SignIn.vue'
import SignUp from '../views/Auth/components/SignUp.vue'

// home
import Home from "../views/Home/Home.vue"
import Courses from "../views/Home/components/Courses/Courses.vue"
import Users from "../views/Home/components/Users/Users.vue"
import Bill from "../views/Home/components/Bill/Bill.vue"
import Notes from "../views/Home/components/Notes/Notes.vue"
import Privacy from "../views/Home/components/Privacy/Privacy.vue"
import Call from "../views/Home/components/Call/Call.vue"
import Course from "../views/Home/components/Course/Course.vue"

Vue.use(VueRouter)

const routes = [{
    path: "/politica-de-privacidad",
    component: Privacy
  },
  {
    path: '/',
    component: Auth,
    redirect: "/iniciar-sesion",
    children: [{
        path: "iniciar-sesion",
        component: SignIn
      },
      {
        path: "registrate",
        component: SignUp
      }
    ]
  },
  {
    path: '/h',
    component: Home,
    children: [{
        path: "usuarios",
        component: Users
      },
      {
        path: "cursos",
        component: Courses
      },
      {
        path: "pagos-estudiantes",
        name: "payment-student",
        component: Bill
      },
      {
        path: "pagos-externos",
        name: "payment-external",
        component: Bill
      },
      {
        path: "calificaciones",
        component: Notes
      },
      {
        path: "llamados",
        component: Call
      },
      {
        path: "curso/:courseId",
        component: Course
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router