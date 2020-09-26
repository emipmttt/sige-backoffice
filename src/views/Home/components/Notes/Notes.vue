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
import { mapActions, mapState } from "vuex";
import CourseItem from "./components/CourseItem";
export default {
  components: {
    CourseItem,
  },
  computed: {
    ...mapState(["courses", "users"]),
  },
  methods: {
    ...mapActions(["get_courses"]),
  },
  async created() {
    await this.get_courses();
  },
};
</script>

<style>
</style>