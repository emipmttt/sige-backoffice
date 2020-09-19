<template>
  <tr>
    <td>{{ user.name }}</td>
    <td>{{ user.lastname }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.type }}</td>
    <td>
      <v-switch v-model="active"></v-switch>
    </td>
    <td>
      <v-dialog dark v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on" class="primary--text">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Editar</v-card-title>

          <v-card-text>
            <v-text-field v-model="user.name" label="Nombre"></v-text-field>
            <v-text-field v-model="user.name" label="Nombre"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </td>
  </tr>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    active: {
      get() {
        return this.user.active;
      },
      async set(value) {
        this.user.active = value;
        await firebase
          .firestore()
          .collection("users")
          .doc(this.user.id)
          .update(this.user);

        alert("Actualización completada");
      },
    },
  },
  methods: {},
};
</script>

<style>
</style>