<template>
  <tr v-if="user">
    <td>{{ user.user.name }}</td>
    <td>{{ user.user.lastname1 }} {{ user.user.lastname2 }}</td>
    <td>{{ user.user.email }}</td>
    <td>
      <Permissions :user="user" />
      <!-- <v-select
        v-model="type"
        :items="typeItems"
        label="Tipo de Cuenta"
      ></v-select> -->
    </td>
    <td>
      <v-switch color="primary" v-model="active"></v-switch>
    </td>
    <td>
      <v-icon color="green" v-if="user.confirmed">check</v-icon>
      <v-icon v-else>close</v-icon>
    </td>
    <td>
      <v-dialog v-model="dialog" scrollable dark width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on" class="primary--text">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Editar</v-card-title>

          <v-card-text>
            <section v-if="user.user">
              <h1 class="py-4 text-h6 primary--text">Datos Personales</h1>

              <v-text-field
                v-model="user.user.name"
                label="Nombre"
              ></v-text-field>
              <v-text-field
                v-model="user.user.lastname1"
                label="Apellido Paterno"
              ></v-text-field>
              <v-text-field
                v-model="user.user.lastname2"
                label="Apellido Materno"
              ></v-text-field>
              <v-text-field
                v-model="user.user.address"
                label="Dirección"
              ></v-text-field>
              <v-text-field
                v-model="user.user.email"
                label="Correo Electrónico"
              ></v-text-field>
              <v-text-field
                v-model="user.user.phone"
                label="Teléfono"
              ></v-text-field>
            </section>
            <section v-if="user.parent">
              <v-divider></v-divider>
              <h1 class="py-4 text-h6 primary--text">Padre Madre o Tutor</h1>

              <v-text-field
                v-model="user.parent.name"
                label="Nombre"
              ></v-text-field>
              <v-text-field
                v-model="user.parent.lastname1"
                label="Apellido Paterno"
              ></v-text-field>
              <v-text-field
                v-model="user.parent.lastname2"
                label="Apellido Materno"
              ></v-text-field>
              <v-text-field
                v-model="user.parent.address"
                label="Dirección"
              ></v-text-field>
              <v-text-field
                v-model="user.parent.phone"
                label="Teléfono"
              ></v-text-field>
              <v-text-field
                v-model="user.parent.relationship"
                label="Relación"
              ></v-text-field>
            </section>
            <section v-if="user.emergency">
              <v-divider></v-divider>
              <h1 class="py-4 text-h6 primary--text">Emergencias</h1>

              <v-text-field
                v-model="user.emergency.name"
                label="Nombre"
              ></v-text-field>
              <v-text-field
                v-model="user.emergency.phone"
                label="Telefono"
              ></v-text-field>
              <v-text-field
                v-model="user.emergency.relationship"
                label="Relación"
              ></v-text-field>
            </section>
            <section v-if="user.health">
              <v-divider></v-divider>
              <h1 class="py-4 text-h6 primary--text">Salud</h1>

              <v-text-field
                v-model="user.health.allergy"
                label="Alergias"
              ></v-text-field>
              <v-text-field
                v-model="user.health.asthmatic"
                label="Asma"
              ></v-text-field>
              <v-text-field
                v-model="user.health.remark"
                label="Anotaciones Importantes"
              ></v-text-field>
            </section>
            <section v-if="user.pickup">
              <v-divider></v-divider>
              <h1 class="py-4 text-h6 primary--text">Recoger al menor</h1>
              <v-text-field
                v-model="user.pickup.name"
                label="Nombre"
              ></v-text-field>
              <v-text-field
                v-model="user.pickup.phones"
                label="Teléfono"
              ></v-text-field>
            </section>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="update_user()"
              >Actualizar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </td>
  </tr>
</template>

<script>
import firebase from "@/config/firebase";
import Permissions from "./Permissions";

export default {
  props: {
    user: Object,
  },
  components: { Permissions },
  data() {
    return {
      dialog: false,
      typeItems: [
        { text: "Estudiante", value: 0 },
        { text: "Profesor", value: 1 },
        { text: "Administrador", value: 2 },
        { text: "Externo", value: 3 },
      ],
    };
  },
  computed: {
    active: {
      get() {
        return this.user.active;
      },
      async set(value) {
        this.user.active = value;
        await this.update_user();
      },
    },
    type: {
      get() {
        return this.user.type;
      },
      async set(value) {
        this.user.type = value;
        await this.update_user();
      },
    },
  },
  methods: {
    async update_user() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.user.id)
        .update(this.user);

      alert("Usuario actualizado correctamente");
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>