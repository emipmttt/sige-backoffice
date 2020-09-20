<template>
  <div class="pa-5">
    <h1 class="text-h6">Grupos</h1>
    <form class="d-flex align-center" @submit.prevent="create_group">
      <div class="pa-1">
        <v-text-field v-model="title" label="Título"></v-text-field>
      </div>
      <div class="pa-1">
        <v-select v-model="teacher" :items="teachers_list" label="Profesor"></v-select>
      </div>
      <div class="pa-1">
        <v-btn type="submit">Añadir</v-btn>
      </div>
    </form>
    <v-row v-for="(group, index) in groups_course" :key="index">
      <v-col>{{group.title}}</v-col>
      <v-col
        v-if="teachers.length"
      >{{find_teacher(group.teacher).user.name}} {{find_teacher(group.teacher).user.lastname1 || ""}}</v-col>
      <v-col>
        <v-btn @click="delete_group(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
export default {
  props: {
    groups: Array,
    teachers: Array,
  },
  data() {
    return {
      groups_course: [],
      title: "",
      teacher: "",
    };
  },
  computed: {
    teachers_list() {
      return this.teachers.map((teacher) => ({
        text: teacher.user.name + " " + (teacher.user.lastname1 || ""),
        value: teacher.id,
      }));
    },
  },
  methods: {
    find_teacher(id) {
      return this.teachers.find((teacher) => teacher.id == id);
    },
    create_group() {
      let groups = this.groups_course;
      groups.push({
        id: uuidv4(),
        title: this.title,
        teacher: this.teacher,
      });
      this.title = "";
      this.teacher = "";
      this.groups_course = groups;
      this.$emit("update_course", this.groups_course);
    },
    delete_group(index) {
      let groups = this.groups_course;
      groups.splice(index, 1);
      this.groups_course = groups;
      this.$emit("update_course", this.groups_course);
    },
  },
  created() {
    this.groups_course = this.groups || [];
  },
};
</script>

<style>
</style>