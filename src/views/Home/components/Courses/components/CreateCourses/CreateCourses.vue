<template>
  <div>
    <v-dialog v-model="create_course" width="500">
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
        <v-card-title class="headline secondary--bg"
          >Crear un curso nuevo.</v-card-title
        >
        <v-card-text>
          <v-file-input
            v-model="photo"
            accept="image/*"
            label="Foto de portada"
          ></v-file-input>
          <v-text-field v-model="title" label="Título"></v-text-field>
          <v-textarea v-model="description" label="Descripción"></v-textarea>
          <v-dialog
            ref="dialog"
            v-model="date_modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha de inicio"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker locale="es-mx" v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="date_modal = false"
                >Cancelar</v-btn
              >
              <v-btn text color="primary" @click="$refs.dialog.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
          <v-switch v-model="public_course" label="Curso Publico"></v-switch>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red" text @click="create">Añadir Curso</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import upload_file from "@/config/files";
import firebase from "@/config/firebase";

export default {
  data() {
    return {
      photo: null,
      title: "",
      description: "",
      date: null,
      public_course: false,

      // ui vars

      create_course: false,
      date_modal: false,
    };
  },
  methods: {
    async create() {
      try {
        let photo = await upload_file(this.photo);
        await firebase.firestore().collection("courses").add({
          photo,
          title: this.title,
          description: this.description,
          date: this.date,
          groups: [],
          bills: [],
          public: this.public_course,
          createdAt: Date.now(),
        });

        alert("Creado Correctamente");

        this.photo = null;
        this.title = "";
        this.description = "";
        this.date = "";

        this.$emit("createdCourse");

        this.create_course = false;
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
  },
};
</script>

<style>
</style>