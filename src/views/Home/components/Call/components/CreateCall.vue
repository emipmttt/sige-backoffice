<template>
  <v-dialog v-model="create_call" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        fixed
        dark
        fab
        right
        bottom
        class="primary--bg"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card class="secondary--bg" dark>
      <v-card-title class="headline secondary--bg">Crear llamado.</v-card-title>
      <v-card-text>
        <v-autocomplete
          :disabled="loading"
          v-model="userSelected"
          :items="users_list"
          :search-input.sync="search_user"
          prepend-icon="person"
          label="Usuario"
        ></v-autocomplete>

        <v-text-field
          :disabled="loading"
          label="Proyecto"
          dense
          outline
          v-model="project"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          label="Director"
          dense
          outline
          v-model="director"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          label="Sala"
          dense
          outline
          v-model="room"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          label="Tiempo de Grabación"
          dense
          outline
          v-model="recordTime"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          label="Loops"
          dense
          outline
          v-model="loops"
        ></v-text-field>
        <v-text-field
          :disabled="loading"
          label="Horario"
          dense
          outline
          v-model="schedule"
        ></v-text-field>

        <v-text-field
          :disabled="loading"
          v-model="description"
          label="Descripción"
        ></v-text-field>
        <v-dialog
          ref="dialog"
          v-model="date_modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :disabled="loading"
              v-model="date"
              label="Fecha de grabación"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="date_modal = false"
              >Cancelar</v-btn
            >
            <v-btn text color="primary" @click="$refs.dialog.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="loading" class="red" text @click="create"
          >Añadir Llamado</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/config/firebase";
import api from "@/services/api.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      search_user: "",

      userSelected: "",
      description: "",
      date: "",
      project: "",
      director: "",
      room: "",
      loops: "",
      recordTime: "",
      schedule: "",

      create_call: false,
      date_modal: false,
      loading: false,
    };
  },
  computed: {
    ...mapState(["users", "user"]),
    users_list() {
      return this.users.map((user) => ({
        text: `${user.user.name} ${user.user.lastname1 || ""}`,
        value: user.id,
      }));
    },
  },
  methods: {
    async create() {
      if (this.loading) return;
      this.loading = true;

      try {
        var data = {
          user: this.userSelected,
          description: this.description,
          date: this.date,

          project: this.project,
          director: this.director,
          room: this.room,
          loops: this.loops,
          recordTime: this.recordTime,
          schedule: this.schedule,

          createdAt: Date.now(),
          createdBy: this.user.id,
          createdByEmail: this.user.user.email,
        };
        console.log(this.user);
        await firebase.firestore().collection("calls").add(data);

        const user = this.users.find((user) => {
          return user.id == this.userSelected;
        });

        await api.post("/mail/call", { email: user.user.email, data });

        this.userSelected = "null";
        this.description = "";
        this.date = "";
        this.project = "";
        this.director = "";
        this.room = "";
        this.loops = "";
        this.recordTime = "";
        this.schedule = "";

        alert("Creado Correctamente");
        this.$emit("getCalls");

        this.create_call = false;
        this.loading = false;
      } catch (error) {
        alert(error);
        console.error(error);
        this.loading = false;
      }
    },
  },
};
</script>