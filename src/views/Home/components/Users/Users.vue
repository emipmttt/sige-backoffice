<template>
  <div class="pa-2">
    <h1 class="white--text">Usuarios</h1>
    <v-simple-table class="secondary--bg" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nombre</th>
            <th class="text-left">Apellido</th>
            <th class="text-left">Correo Electrónico</th>
            <th class="text-left">Tipo</th>
            <th class="text-left">Activo</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="user in users">
            <UserItem :user="user" :key="user.id" />
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import UserItem from "./components/UserItem/UserItem";
export default {
  components: { UserItem },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async get_users() {
      const users_query = await firebase.firestore().collection("users").get();
      var users = [];
      users_query.forEach((user) => {
        users.push({ id: user.id, ...user.data() });
      });
      this.users = users;
    },
  },
  async created() {
    await this.get_users();
  },
};
</script>

<style>
</style>