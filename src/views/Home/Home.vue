<template>
  <div>
    <v-app-bar app color="secondary--bg" dark elevation="0" rounded="0">
      <v-app-bar-nav-icon @click="changeDrawerState" />
      <v-toolbar-title>Panel</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" color="secondary--bg" dark app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">SIGE</v-list-item-title>
          <v-list-item-subtitle>Administración</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <template v-for="(route, index) in routerList">
          <v-list-item
            v-if="route.permissions.includes(user.type)"
            :key="index"
            link
            @click="$router.push(route.path)"
          >
            <v-list-item-icon>
              <v-icon>{{route.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{route.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "@/config/firebase";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      routerList: [
        {
          path: "/h/usuarios",
          icon: "people",
          title: "Usuarios",
          permissions: [2],
        },
        {
          path: "/h/cursos",
          icon: "book",
          title: "Cursos",
          permissions: [1, 2],
        },
        {
          path: "/h/pagos",
          icon: "receipt_long",
          title: "Pagos",
          permissions: [2],
        },
        {
          path: "/h/calificaciones",
          icon: "school",
          title: "Calificaciones",
          permissions: [1, 2],
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["update_state"]),
    async get_users() {
      const user_query = await firebase.firestore().collection("users").get();
      var users = [];
      user_query.forEach((user) => {
        users.push({ id: user.id, ...user.data() });
      });
      this.update_state(["users", users]);
    },
    async get_courses() {
      const course_query = await firebase
        .firestore()
        .collection("courses")
        .get();

      var courses = [];
      course_query.forEach((course) => {
        courses.push({ id: course.id, ...course.data() });
      });
      this.update_state(["courses", courses]);
    },
    changeDrawerState() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.$router.push("/");
    },
  },
  async created() {
    await this.get_users();
    await this.get_courses();
  },
};
</script>

<style>
</style>