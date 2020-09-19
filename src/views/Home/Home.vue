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
        <v-list-item
          v-for="(route, index) in routerList"
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
export default {
  data() {
    return {
      drawer: true,
      routerList: [
        { path: "/h/usuarios", icon: "people", title: "Usuarios" },
        { path: "/h/cursos", icon: "book", title: "Cursos" },
      ],
    };
  },
  methods: {
    changeDrawerState() {
      this.drawer = !this.drawer;
    },
    logout() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>