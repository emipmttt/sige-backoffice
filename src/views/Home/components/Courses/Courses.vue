<template>
  <div>
    <CoursesList />
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
      await firebase.firestore().collection("courses").limit(10).get();
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>

<style>
</style>