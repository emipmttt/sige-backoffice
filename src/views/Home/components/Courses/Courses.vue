<template>
  <div>
    <h1 class="white--text ml-2">Cursos</h1>
    <v-text-field
      dark
      outlined
      label="Busqueda"
      v-model="search"
    ></v-text-field>
    <CoursesList @getCourses="getCourses" :courses="courses_filtered" />
    <CreateCourses @createdCourse="getCourses" />
  </div>
</template>

<script>
import CreateCourses from "./components/CreateCourses/CreateCourses";
import CoursesList from "./components/CoursesList/CoursesList";

import firebase from "@/config/firebase";
export default {
  components: { CreateCourses, CoursesList },
  data() {
    return {
      courses: [],
      search: "",
    };
  },
  computed: {
    courses_filtered() {
      return this.courses.filter((course) => {
        if (course.title.toLowerCase().includes(this.search)) return true;
        return false;
      });
    },
  },
  methods: {
    async getCourses() {
      const courses_query = await firebase
        .firestore()
        .collection("courses")
        .orderBy("createdAt", "desc")
        .get();
      const courses = [];
      courses_query.forEach((el) => {
        courses.push({ id: el.id, ...el.data() });
      });
      this.courses = courses;
    },
  },
  created() {
    this.getCourses();
  },
};
</script>

<style>
</style>