<template>
  <div class="pa-2">
    <h1 class="white--text">Grupos</h1>
    <v-card class="secondary--bg pa-4">
      <form @submit.prevent="createGroup" class="d-flex">
        <v-text-field
          v-model="newGroupName"
          dark
          label="Nuevo Grupo"
          outlined
          required
          dense
        ></v-text-field>
        <v-btn type="submit" color="primary" class="ml-2">Añadir Grupo</v-btn>
      </form>

      <v-simple-table dark class="secondary--bg">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Grupo</th>
              <th class="text-left">Materias y Profesores</th>
              <th class="text-left">Editar Grupo</th>
            </tr>
          </thead>
          <tbody>
            <GroupItem
              v-for="group in groups"
              :key="group.id"
              :group="group"
              :course="$route.params.courseId"
              @getGroups="getGroups"
            />
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import GroupItem from "./components/GroupItem";
export default {
  components: {
    GroupItem,
  },
  data() {
    return {
      newGroupName: "",
      groups: [],
    };
  },
  methods: {
    async createGroup() {
      const name = this.newGroupName.trim();

      if (name) {
        await firebase
          .firestore()
          .collection("groups")
          .add({
            course: this.$route.params.courseId,
            title: this.newGroupName,
            createdAt: Date.now(),
          });

        await this.getGroups();
      } else {
        alert("Escribe un nombre para el grupo");
      }
    },
    async getGroups() {
      const groupsQuery = await firebase
        .firestore()
        .collection("groups")
        .where("course", "==", this.$route.params.courseId)
        .orderBy("createdAt", "desc")
        .get();

      var groups = [];

      groupsQuery.forEach((group) => {
        groups.push({ id: group.id, ...group.data() });
      });

      this.groups = groups;
    },
  },
  async mounted() {
    await this.getGroups();
  },
};
</script>

<style></style>
