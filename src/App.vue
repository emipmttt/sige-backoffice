<template>
  <v-app class="tertiary--bg">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import firebase from "@/config/firebase";
export default {
  name: "App",
  methods: {
    ...mapMutations(["update_state"]),
  },
  async mounted() {
    var user = localStorage.getItem("sige_user");
    if (user) {
      user = JSON.parse(user);
      const userQuery = await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .get();

      user = { id: userQuery.id, ...userQuery.data() };
      localStorage.setItem("sige_user", JSON.stringify(user));
      this.update_state(["user", user]);
    } else {
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
