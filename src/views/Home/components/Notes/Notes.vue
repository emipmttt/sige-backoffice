<template>
  <div class="pa-2">
    <h1 class="white--text">Calificaciones</h1>
    <template v-for="(course, index) in currentCourses">
      <v-card
        class="secondary--bg"
        v-show="currentCourses[index].show"
        :key="course.id"
      >
        <v-card-text>
          <div>
            <h2 class="white--text">
              {{ course.title }}
            </h2>
          </div>

          <div class="white--text">
            <CourseItem @show="showCourse(index)" :course="course" />
          </div>
        </v-card-text>
      </v-card>
    </template>

    <v-row>
      <v-col xm="6"> </v-col>
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

  data() {
    return { currentCourses: [] };
  },
  computed: {
    ...mapState(["courses", "users"]),
  },
  methods: {
    ...mapActions(["get_courses"]),
    showCourse(index) {
      this.currentCourses[index].show = true;
      this.$forceUpdate();
    },
  },
  watch: {
    courses(value) {
      this.currentCourses = value;
    },
  },
  async created() {
    await this.get_courses();
  },
};
</script>

<style>
</style>