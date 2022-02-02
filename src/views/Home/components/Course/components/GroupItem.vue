<template>
  <tr>
    <td>{{ group.title }}</td>
    <td>
      <v-dialog class="secondary--bg" v-model="dialogMatter" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="secondary--bg" v-bind="attrs" v-on="on">
            <v-icon>article</v-icon>
          </v-btn>
        </template>

        <v-card dark class="secondary--bg">
          <v-card-title dark class="headline secondary--bg lighten-2">
            Materias
          </v-card-title>

          <v-card-text>
            <br />
            <form @submit.prevent="createMatter" class="d-flex">
              <v-text-field
                v-model="matterName"
                class="mr-2"
                label="Nueva Materia"
                outlined
                dense
                required
              ></v-text-field>

              <v-select
                v-model="teacherSelected"
                :items="teachers"
                label="Profesor"
                dense
                outlined
                required
              ></v-select>

              <v-btn type="submit" color="primary" class="ml-2">
                Añadir Materia
              </v-btn>
            </form>

            <table style="width: 100%">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Profesor</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="matter in matters" :key="matter.id">
                  <td>{{ matter.name }}</td>
                  <td v-if="teachers.length && getTeacher(matter.teacher)">
                    {{ getTeacher(matter.teacher).text }}
                  </td>
                  <td style="text-align: right">
                    <v-btn
                      @click="deleteMatter(matter.id)"
                      color="primary"
                      class="ml-2"
                    >
                      <v-icon> delete </v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogMatter = false">
              Cerrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </td>
    <td>
      <v-dialog class="secondary--bg" v-model="dialogName" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="secondary--bg" v-bind="attrs" v-on="on">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card dark class="secondary--bg">
          <v-card-title dark class="headline secondary--bg lighten-2">
            Editar Grupo
          </v-card-title>

          <v-card-text>
            <br />

            <v-text-field
              v-model="groupName"
              class="mr-2"
              label="Nombre del grupo"
              outlined
              dense
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogName = false">
              Cerrar
            </v-btn>
            <v-btn color="primary" @click="updateGroup">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </td>
    <td>
      <v-btn @click="deleteGroup" class="secondary--bg ml-2">
        <v-icon>delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  props: {
    group: Object,
    course: String,
  },
  data() {
    return {
      dialogMatter: false,
      dialogName: false,
      matterName: "",
      teachers: [],
      teacherSelected: "",
      groupName: "",
      matters: [],
    };
  },
  methods: {
    async updateGroup() {
      await firebase
        .firestore()
        .collection("groups")
        .doc(this.group.id)
        .update({
          title: this.groupName,
        });

      this.$emit("getGroups");
      this.dialogName = false;
    },
    getTeacher(findTeacher) {
      return this.teachers.find((teacher) => {
        return teacher.value == findTeacher;
      });
    },

    async deleteMatter(id) {
      await firebase
        .firestore()
        .collection("matters")
        .doc(id)
        .delete();
      await this.get_matters();
    },

    async deleteGroup() {
      await firebase
        .firestore()
        .collection("groups")
        .doc(this.group.id)
        .delete();

      this.$emit("getGroups");
    },

    async createMatter() {
      if (this.teacherSelected) {
        await firebase
          .firestore()
          .collection("matters")
          .add({
            group: this.group.id,
            course: this.course,
            name: this.matterName,
            teacher: this.teacherSelected,
          });

        await this.get_matters();
      } else {
        alert("Selecciona un profesor o profesora");
      }
    },

    async get_matters() {
      const mattersQuery = await firebase
        .firestore()
        .collection("matters")
        .where("group", "==", this.group.id)
        .get();

      var matters = [];

      mattersQuery.forEach((el) => {
        matters.push({
          id: el.id,
          ...el.data(),
        });
      });

      this.matters = matters;
    },

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

      teachers = teachers.map((teacher) => {
        return {
          text: teacher.user.name,
          value: teacher.id,
        };
      });
      this.teachers = teachers;
    },
  },
  async mounted() {
    await this.get_teachers();
    await this.get_matters();
  },
};
</script>
