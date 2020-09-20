<template>
  <div class="pa-2">
    <v-row>
      <v-col xm="6" v-for="course in courses" :key="course.id">
        <CourseItem :course="course" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CourseItem from "./components/CourseItem";
export default {
  components: {
    CourseItem,
  },
  computed: {
    ...mapState(["courses", "users"]),
  },
  methods: {},
};
</script>

<style>
</style>