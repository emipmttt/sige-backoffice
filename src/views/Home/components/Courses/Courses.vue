<template>
  <div>
    <CoursesList :courses="courses" />
    <CreateCourses />
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