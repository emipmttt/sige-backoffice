<template>
  <v-dialog scrollable v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Permisos </v-btn>
    </template>

    <v-card class="secondary--bg white--text">
      <v-card-title> Permisos </v-card-title>

      <v-card-text class="white--text">
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Aplicación</span>
          <v-switch v-model="permissions.app"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Administrar</span>
          <v-switch v-model="permissions.admin"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Usuarios</span>
          <v-switch v-model="permissions.users"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Cursos</span>
          <v-switch v-model="permissions.courses"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Pagos Estudiantes</span>
          <v-switch v-model="permissions.paymentsStudents"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Pagos Externos</span>
          <v-switch v-model="permissions.paymentsExternal"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Llamados</span>
          <v-switch v-model="permissions.call"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5">Calificiones (profesores)</span>
          <v-switch v-model="permissions.notes"></v-switch>
        </div>
        <div class="d-flex justify-space-between align-center">
          <span class="text-h5"
            >Administrar Calificaciones (Administradores)</span
          >
          <v-switch v-model="permissions.viewNotes"></v-switch>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Cancelar</v-btn>
        <v-btn color="primary" text @click="update"> Actualizar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import firebase from "@/config/firebase";
import { mapMutations, mapState } from "vuex";

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      dialog: false,
      loading: false,

      permissions: {
        app: false,
        admin: false,
        users: false,
        courses: false,
        paymentsStudents: false,
        paymentsExternal: false,
        call: false,
        notes: false,
        viewNotes: false,
      },
    };
  },
  computed: {
    ...mapState({
      currentUser: "user",
    }),
  },
  methods: {
    ...mapMutations(["update_state"]),

    async update() {
      if (this.loading) return;
      this.loading = true;
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.id)
        .update({
          permissions: this.permissions,
        });
      alert("Persmisos actualizados correctamente");
      this.dialog = false;
      this.loading = false;

      if (this.currentUser.id == this.user.id) {
        firebase
          .firestore()
          .collection("users")
          .doc(this.user.id)
          .get()
          .then((response) => {
            const userdata = { id: response.id, ...response.data() };

            this.update_state(["user", userdata]);

            localStorage.setItem("sige_user", JSON.stringify(userdata));
          });
      }
    },
  },
  mounted() {
    if (this.user.permissions) this.permissions = this.user.permissions;
  },
};
</script>
