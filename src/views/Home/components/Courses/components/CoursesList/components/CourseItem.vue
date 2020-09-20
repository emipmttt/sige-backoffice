<template>
  <tr>
    <td>
      <img :src="course.photo" />
    </td>
    <td>{{ course.title }}</td>
    <td>{{ course.date }}</td>
    <td>
      <v-dialog v-model="dialog_edit" scrollable dark width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on" class="primary--text">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Editar</v-card-title>

          <v-card-text>
            <v-text-field v-model="course.title" label="Título"></v-text-field>
            <v-text-field v-model="course.date" label="Fecha"></v-text-field>
            <v-switch v-model="course.public" label="Curso Publico"></v-switch>
            <v-divider></v-divider>
            <GroupsConfig
              @update_course="update_groups($event)"
              :teachers="teachers"
              :groups="course.groups"
            />
            <v-divider></v-divider>

            <BillsConfig @update_bills="update_bills($event)" :bills="course.bills" />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="update_course();finish()">Actualizar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </td>
  </tr>
</template>

<script>
import firebase from "@/config/firebase";
import GroupsConfig from "./GroupsConfig";
import BillsConfig from "./BillsConfig";

export default {
  components: {
    GroupsConfig,
    BillsConfig,
  },
  props: {
    course: Object,
    teachers: Array,
  },
  data() {
    return {
      dialog_edit: false,
    };
  },
  methods: {
    async update_course() {
      await firebase
        .firestore()
        .collection("courses")
        .doc(this.course.id)
        .update({
          ...this.course,
        });
    },
    finish() {
      alert("Curso actualizado correctamente");
      this.dialog_edit = false;
    },
    update_groups(groups) {
      this.course.groups = groups;
      this.update_course();
    },
    update_bills(bills) {
      this.course.bills = bills;
      this.update_course();
    },
  },
};
</script>

<style>
</style>