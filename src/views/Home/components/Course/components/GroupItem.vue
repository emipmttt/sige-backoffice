<template>
  <tr>
    <td>{{ group.title }}</td>
    <td>
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="secondary--bg" v-bind="attrs" v-on="on"
            ><v-icon>article</v-icon></v-btn
          >
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2">
            Materias
          </v-card-title>

          <v-card-text>
            <br />
            <div class="d-flex">
              <v-text-field
                v-model="matterName"
                class="mr-2"
                label="Nuevo Grupo"
                outlined
                dense
              ></v-text-field>

              <v-select
                v-model="teacher"
                :items="teachers"
                label="Profesor"
                dense
                outlined
              ></v-select>

              <v-btn @click="createGroup" color="primary" class="ml-2"
                >Añadir Grupo</v-btn
              >
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              I accept
            </v-btn>
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
    group: Object,
  },
  data() {
    return {
      dialog: false,
      matterName: "",
      teachers: [],
    };
  },
  methods: {
    createGroup() {},

    async get_teachers() {
      const teachers_query = await firebase
        .firestore()
        .collection("users")
        .where("permissions.notes", "==", true)
        .get();

      var teachers = [];
      teachers_query.forEach((teacher) => {
        teachers.push({
          id: teacher.id,
          ...teacher.data(),
        });
      });
      this.teachers = teachers;
    },
  },
  async mounted() {
    await this.get_teachers();
  },
};
</script>

<style>
</style>  