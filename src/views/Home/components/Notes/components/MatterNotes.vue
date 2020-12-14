<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon>article</v-icon>
      </v-btn>
    </template>

    <v-card dark>
      <v-card-title class="headline white--text secondary--bg lighten-2">
        Calificar
      </v-card-title>

      <v-card-text class="secondary--bg">
        <br />
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
              <td
                style="text-align: left"
                v-for="matter in mattersGroup"
                :key="matter.id"
              >
                <v-text-field
                  hide-details
                  :data-student="student.id"
                  :data-matter="matter.id"
                  data-type-input="value"
                  label="Calificación"
                  dense
                  outlined
                ></v-text-field>
                <v-text-field
                  hide-details
                  :data-student="student.id"
                  :data-matter="matter.id"
                  data-type-input="observations"
                  label="Observaciones"
                  dense
                  outlined
                  type="test"
                ></v-text-field>
              </td>
              <td style="text-align: right">
                <v-btn color="primary" @click="saveNote(student)">
                  <v-icon>check</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="secondary--bg">
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
      return this.matters.filter((matter) => matter.group == this.group.id);
    },
  },
  methods: {
    async saveNote(student) {
      var elements = document.querySelectorAll(
        `[data-student='${student.id}']`
      );

      elements = Array.from(elements);

      var sortElements = {};

      for (const matter of elements) {
        if (typeof sortElements[matter.dataset.matter] == "object") {
          sortElements[matter.dataset.matter][matter.dataset.typeInput] =
            matter.value;
        } else {
          sortElements[matter.dataset.matter] = {};
          sortElements[matter.dataset.matter][matter.dataset.typeInput] =
            matter.value;
        }
      }

      const arrayElements = Object.keys(sortElements);

      for (const arrayElement of arrayElements) {
        const data = {
          matter: arrayElement,
          user: student.id,
          ...sortElements[arrayElement],
          course: this.group.course,
        };

        await firebase
          .firestore()
          .collection("notes")
          .doc(data.user + data.matter)
          .set(data);
      }

      alert("Calificación actualizada correctamente");
    },
  },
};
</script>

<style>
</style>