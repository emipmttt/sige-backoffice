<template>
  <div class="pa-2">
    <v-simple-table dark class="secondary--bg">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Nombre</th>
            <th class="text-left">Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="course in courses">
            <CourseItem
              @getCourses="$emit('getCourses')"
              :teachers="teachers"
              :course="course"
              :key="course.id"
            />
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import CourseItem from "./components/CourseItem";
export default {
  props: {
    courses: Array,
  },
  data() {
    return {
      teachers: [],
    };
  },
  components: {
    CourseItem,
  },
  methods: {
    async get_teachers() {
      const teachers_query = await firebase
        .firestore()
        .collection("users")
        .where("permissions.notes", "==", true)
        .get();

      var teachers = [];
      teachers_query.forEach((teacher) => {
        teachers.push({
          id: teacher.id,
          ...teacher.data(),
        });
      });
      this.teachers = teachers;

      console.log(this.teachers);
    },
  },
  async mounted() {
    await this.get_teachers();
  },
};
</script>

<style>
</style>