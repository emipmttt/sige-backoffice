<template>
  <v-card dark class="pa-2 secondary--bg">
    <h1 class="pl-4">{{course.title}}</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Estudiante</th>
            <template v-for="(group, index) in course.groups">
              <th v-if="group.teacher == user.id " :key="index" class="text-left">{{group.title}}</th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user_item in users_filtered" :key="user_item.id">
            <td>{{ user_item.user.name }} {{user_item.user.lastname || ""}}</td>
            <template v-for="(group, index) in course.groups">
              <td v-if="group.teacher == user.id " :key="index" class="text-left">
                <v-text-field
                  :class="'user_' + user_item.id + ' group_'+ group.id"
                  label="Calificación"
                  type="number"
                  autocomplete="off"
                  :value="notes[user_item.id + '_' + course.id + '_' + group.id] ? notes[user_item.id + '_' + course.id + '_' + group.id].value :''"
                ></v-text-field>
              </td>
            </template>
            <td>
              <v-icon @click="set_note(user_item.id)">check</v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  props: {
    course: Object,
  },
  data() {
    return {
      notes: {},
    };
  },
  computed: {
    ...mapState(["users", "user"]),
    users_filtered() {
      return this.users.filter((user) => {
        return user.courses && user.courses.includes(this.course.id);
      });
    },
  },
  methods: {
    set_note(id) {
      var v = this;
      let notes = document.querySelectorAll(".user_" + id);
      notes.forEach(async (note) => {
        await note.classList.forEach(async (el) => {
          if (el.includes("group_")) {
            let value = note.querySelector("input").value;
            let group = el.split("_")[1];
            await firebase
              .firestore()
              .collection("notes")
              .doc(id + "_" + v.course.id + "_" + group)
              .set({
                group,
                user: id,
                value,
                course: v.course.id,
              });
          }
        });
        alert("Calificación Actualizada");
      });
    },
    async get_notes() {
      const notes_query = await firebase
        .firestore()
        .collection("notes")
        .where("course", "==", this.course.id)
        .get();

      var notes = {};

      notes_query.forEach((note) => {
        notes[note.id] = { id: note.id, ...note.data() };
      });

      this.notes = notes;
    },
  },
  async mounted() {
    await this.get_notes();
  },
};
</script>

<style>
</style>