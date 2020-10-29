<template>
  <tr>
    <td>
      <img class="image-item" :src="course.photo" />
    </td>
    <td>{{ course.title }}</td>
    <td>{{ course.date }}</td>
    <td>
      <v-dialog v-model="dialog_edit" scrollable dark width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text dark v-bind="attrs" v-on="on" class="light--text">
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Editar</v-card-title>

          <v-card-text>
            <v-text-field v-model="course.title" label="Título"></v-text-field>
            <v-text-field
              v-model="course.date"
              label="Fecha de inicio"
            ></v-text-field>
            <v-switch v-model="course.public" label="Curso Publico"></v-switch>
            <v-divider></v-divider>

            <BillsConfig
              @update_bills="update_bills($event)"
              :bills="course.bills"
            />
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                update_course();
                finish();
              "
              >Actualizar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn
        @click="$router.push('/h/curso/' + course.id)"
        text
        dark
        class="light--text"
      >
        <v-icon>groups</v-icon>
      </v-btn>

      <v-btn @click="deleteItem" text dark class="light--text">
        <v-icon>delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import firebase from "@/config/firebase";
import BillsConfig from "./BillsConfig";

export default {
  components: {
    BillsConfig,
  },
  props: {
    course: Object,
    teachers: Array,
  },
  data() {
    return {
      dialog_edit: false,
      groups_edit: false,
    };
  },
  methods: {
    async deleteItem() {
      if (
        confirm(
          "¿realmente desea eliminar este curso? Sólo debería eliminar el curso cuando lo halla creado de forma equivocada"
        )
      ) {
        await firebase
          .firestore()
          .collection("courses")
          .doc(this.course.id)
          .delete();
        this.$emit("getCourses");

        alert("Curso Eliminado correctamente");
      }
    },
    async update_course() {
      await firebase
        .firestore()
        .collection("courses")
        .doc(this.course.id)
        .update({
          ...this.course,
        });
      this.$emit("getCourses");
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
.image-item {
  max-width: 300px;
  max-height: 300px;
}
</style>