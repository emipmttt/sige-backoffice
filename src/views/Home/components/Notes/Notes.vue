<template>
  <div class="pa-2">
    <h1 class="white--text">Calificaciones</h1>
    <div v-if="!IHaveCourses">
      <v-card class="secondary--bg">
        <v-card-text>
          <h2 class="white--text">No tienes materias asignadas</h2>
        </v-card-text>
      </v-card>
    </div>
    <div>
      <div v-for="(course, index) in currentCourses" :key="course.id">
        <v-card class="secondary--bg" v-show="currentCourses[index].show">
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
        <br />
      </div>
    </div>

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
    return { currentCourses: [], IHaveCourses: false };
  },
  computed: {
    ...mapState(["courses", "users", "user"]),
  },
  methods: {
    ...mapActions(["get_courses"]),
    showCourse(index) {
      this.IHaveCourses = true;
      this.currentCourses[index].show = true;
      this.$forceUpdate();
    },
    setCourses() {
      if (
        this.user &&
        this.user.permissions &&
        (this.user.permissions.viewNotes == "true" ||
          this.user.permissions.viewNotes == true)
      ) {
        this.currentCourses = this.courses.map((e) => {
          e.show = true;
          return e;
        });
      } else {
        this.currentCourses = this.courses;
      }
    },
  },
  watch: {
    courses() {
      this.setCourses();
    },
    user() {
      this.setCourses();
    },
  },
  async created() {
    await this.get_courses();
  },
};
</script>

<style></style>
