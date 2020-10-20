<template>
  <div>
    <h1 class="white--text ml-2">Cursos</h1> 
    <CoursesList @getCourses="getCourses" :courses="courses" />
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
    };
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