<template>
  <div class="pa-2">
    <h1 class="white--text">Grupos</h1>
    <v-card class="secondary--bg pa-4">
      <div class="d-flex">
        <v-text-field
          v-model="newGroupName"
          dark
          label="Nuevo Grupo"
          outlined
          dense
        ></v-text-field>
        <v-btn @click="createGroup" color="primary" class="ml-2"
          >Añadir Grupo</v-btn
        >
      </div>

      <v-simple-table dark class="secondary--bg">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Grupo</th>
              <th class="text-left"></th>
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
      await firebase.firestore().collection("groups").add({
        course: this.$route.params.courseId,
        title: this.newGroupName,
        createdAt: Date.now(),
      });

      await this.getGroups();
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

<style>
</style>