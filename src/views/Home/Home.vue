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
          <v-list-item-subtitle v-if="user.user">{{
            user.user.name
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list dense nav>
        <template v-for="(route, index) in routerList">
          <v-list-item
            v-if="user.permissions && user.permissions[route.permissions]"
            :key="index"
            link
            @click="$router.push(route.path)"
          >
            <v-list-item-icon>
              <v-icon>{{ route.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ route.title }}</v-list-item-title>
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
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      routerList: [
        {
          path: "/h/usuarios",
          icon: "people",
          title: "Usuarios",
          permissions: "users",
        },
        {
          path: "/h/cursos",
          icon: "book",
          title: "Cursos",
          permissions: "courses",
        },
        {
          path: "/h/pagos-estudiantes",
          icon: "receipt_long",
          title: "Pagos Estudiantes",
          permissions: "paymentsStudents",
        },
        {
          path: "/h/pagos-externos",
          icon: "receipt_long",
          title: "Pagos Externos",
          permissions: "paymentsExternal",
        },
        {
          path: "/h/llamados",
          icon: "campaign",
          title: "Llamados",
          permissions: "call",
        },
        {
          path: "/h/calificaciones",
          icon: "school",
          title: "Calificaciones",
          permissions: "notes",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["update_state"]),
    ...mapActions(["get_courses", "get_users"]),

    changeDrawerState() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.$router.push("/");
      localStorage.removeItem("");
    },
  },
  async created() {
    await this.get_users();
    await this.get_courses();
    console.log(this.user);
  },
};
</script>

<style>
</style>