<template>
  <v-dialog scrollable fullscreen v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon>article</v-icon>
      </v-btn>
    </template>

    <v-card dark>
      <v-toolbar dark class="secondary--bg">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Calificar</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text class="secondary--bg">
        <br />
        <v-simple-table black class="secondary--bg">
          <template v-slot:default>
            <thead>
              <tr>
                <th style="text-align: left">Estudiante</th>
                <template v-if="mattersGroup.left > 0">
                  <th
                    style="text-align: left"
                    v-for="matter in mattersGroup"
                    :key="matter.id"
                  >
                    {{ matter.name }}
                  </th>
                </template>
                <template v-else>
                  <th style="text-align: left">
                    No hay materias asignadas
                  </th>
                </template>
                <th style="text-align: left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="student in students" :key="student.id">
                <td style="text-align: left">
                  {{ student.user.name }}
                  {{ student.user.lastname1 }}
                  {{ student.user.lastname2 }}
                </td>
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
                    label="Calificación ( 0 - 10)"
                    max="10"
                    min="0"
                    dense
                    outlined
                    type="number"
                    v-model="valuesIndex[`${student.id}_${matter.id}_value`]"
                  ></v-text-field>
                  <v-textarea
                    hide-details
                    :data-student="student.id"
                    :data-matter="matter.id"
                    data-type-input="observations"
                    label="Observaciones"
                    dense
                    outlined
                    v-model="
                      valuesIndex[`${student.id}_${matter.id}_observations`]
                    "
                  ></v-textarea>
                </td>
                <td style="text-align: right">
                  <template v-if="mattersGroup.length > 0">
                    <v-btn color="primary" @click="saveNote(student)">
                      <v-icon>check</v-icon>
                    </v-btn>
                  </template>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      // values index works to update ui view from init data
      valuesIndex: {},
    };
  },
  computed: {
    mattersGroup() {
      console.log(this.matters);
      console.log(this.group.id);
      return this.matters.filter((matter) => matter.group == this.group.id);
    },
  },
  methods: {
    async getNote() {
      if (this.students.length > 0 && this.mattersGroup.length > 0) {
        // cada estudiante
        this.students.forEach(async (studentItem) => {
          // cada materia
          this.mattersGroup.forEach(async (matterItem) => {
            const data = await firebase
              .firestore()
              .collection("notes")
              .doc(studentItem.id + matterItem.id)
              .get();

            const note = data.data();

            if (note && note.value && note.observations) {
              let valuesIndex = { ...this.valuesIndex };

              valuesIndex[`${studentItem.id}_${matterItem.id}_value`] =
                note.value;
              valuesIndex[`${studentItem.id}_${matterItem.id}_observations`] =
                note.observations;

              this.valuesIndex = valuesIndex;
            }
          });
        });
      } else {
        setTimeout(() => {
          this.getNote();
        }, 500);
      }
    },
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
  watch: {
    dialog(value) {
      if (value) {
        this.getNote();
      }
    },
  },
};
</script>

<style></style>
