<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon>article</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2"> Materias </v-card-title>

      <v-card-text>
        <table width="100%">
          <thead>
            <tr>
              <th style="text-align: left">Estudiante</th>
              <th
                style="text-align: left"
                v-for="matter in mattersGroup"
                :key="matter.id"
              >
                {{ matter.name }}
              </th>
              <th style="text-align: left"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id">
              <td style="text-align: left">{{ student.user.name }}</td>
              <th
                style="text-align: left"
                v-for="matter in mattersGroup"
                :key="matter.id"
              >
                <v-text-field
                  hide-details
                  :data-student="student.id"
                  :data-matter="matter.id"
                  dense
                  outlined
                  type="number"
                ></v-text-field>
              </th>
              <td style="text-align: left">
                <v-btn @click="saveNote(student)">
                  <v-icon>check</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false"> Cerrar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/config/firebase";

export default {
  props: {
    group: Object,
    matters: Array,
    students: Array,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    mattersGroup() {
      console.log(this.students);
      return this.matters.filter((matter) => matter.group == this.group.id);
    },
  },
  methods: {
    async saveNote(student) {
      var elements = document.querySelectorAll(
        `[data-student='${student.id}']`
      );

      elements = Array.from(elements);

      for (const matter of elements) {
        await firebase.firestore().collection("notes").add({
          matter: matter.dataset.matter,
          value: matter.value,
          user: matter.dataset.student,
        });
      }

      alert("Calificación actualizada correctamente");
    },
  },
};
</script>

<style>
</style>