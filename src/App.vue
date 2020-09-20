<template>
  <v-app class="tertiary--bg">
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  methods: {
    ...mapMutations(["update_state"]),
  },
  mounted() {
    var user = localStorage.getItem("sige_user");
    if (user) {
      this.update_state(["user", JSON.parse(user)]);
    }
  },
};
</script>

<style lang="scss">
@import "./assets/style.scss";
</style>
