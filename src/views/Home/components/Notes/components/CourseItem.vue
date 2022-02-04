<template>
  <div v-if="isMyCourse" class="secondary--bg">
    <v-simple-table dark class="secondary--bg ">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Materia</th>
            <th class="text-left">Calificar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in myGroups" :key="index">
            <td>{{ group.title }}</td>
            <td>
              <MatterNotes
                :group="group"
                :matters="matters"
                :students="students"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- <pre>
      {{ course }}
    </pre> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "@/config/firebase";
import MatterNotes from "./MatterNotes";
export default {
  props: {
    course: Object,
  },
  components: { MatterNotes },
  data() {
    return {
      groups: [],
      students: [],
      matters: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    isMyCourse() {
      var groups = {};
      this.matters.forEach((matter) => {
        groups[matter.group] = true;
      });

      var course = "";

      Object.keys(groups).forEach((group) => {
        const groupFind = this.groups.find((groupObjectFind) => {
          return groupObjectFind.id == group;
        });
        if (groupFind) course = groupFind.course;
      });

      return course == this.course.id;
    },
    myGroups() {
      return this.groups;
    },
  },
  methods: {
    async getStudents() {
      const studentsQuery = await firebase
        .firestore()
        .collection("users")
        .where("courses", "array-contains", this.course.id)
        .get();

      var students = [];

      studentsQuery.forEach((student) => {
        students.push({
          id: student.id,
          ...student.data(),
        });
      });

      this.students = students;
    },
    async getGroups() {
      const groupsQuery = await firebase
        .firestore()
        .collection("groups")
        .where("course", "==", this.course.id)
        .orderBy("createdAt", "desc")
        .get();

      var groups = [];

      groupsQuery.forEach((group) => {
        groups.push({
          id: group.id,
          ...group.data(),
        });
      });

      this.groups = groups;
    },
    async getMyMatters() {
      const mattersQuery = await firebase
        .firestore()
        .collection("matters")
        .where("teacher", "==", this.user.id)
        .get();

      var matters = [];

      mattersQuery.forEach((matter) => {
        matters.push({
          id: matter.id,
          ...matter.data(),
        });
      });

      this.matters = matters;
    },
  },
  watch: {
    isMyCourse(value) {
      if (value) this.$emit("show");
    },
  },
  async mounted() {
    await this.getGroups();
    await this.getMyMatters();
    await this.getStudents();
  },
};
</script>

<style></style>
