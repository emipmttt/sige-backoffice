<template>
  <tr>
    <td>
      <img class="image-item" :src="course.photo" />
    </td>
    <td>{{ course.title }}</td>
    <td>{{ course.date }}</td>
    <td class="text-right">
      <v-dialog v-model="dialog_edit" scrollable dark width="700">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
            class="light--text mr-2"
          >
            <v-icon>create</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline">Editar</v-card-title>
          <v-card-text>
            <v-text-field v-model="course.title" label="Título"></v-text-field>
            <v-textarea
              v-model="course.description"
              label="Descripción"
            ></v-textarea>
            <v-text-field
              v-model="course.date"
              label="Fecha de inicio"
            ></v-text-field>
            <v-switch v-model="course.public" label="Curso Publico"></v-switch>
            <v-divider></v-divider>

            <BillsConfig
              @getCourses="$emit('getCourses')"
              :course="course"
              :payment="course.payment"
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
        color="primary"
        class="light--text mr-2"
      >
        <v-icon>groups</v-icon>
      </v-btn>
      <v-btn @click="deleteItem" color="primary" class="light--text">
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
    update_bills(bill) {
      this.course.bill = bill;
      this.update_course();
    },
  },
};
</script>

<style>
.image-item {
  max-width: 100px;
  max-height: 100px;
  border-radius: 5px;
}
</style>
