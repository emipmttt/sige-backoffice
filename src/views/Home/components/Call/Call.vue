<template>
  <div class="pa-2">
    <h1 class="white--text">Llamados</h1>
    <Calls/>
    <CreateCall />
  </div>
</template>

<script>
import CreateCall from "./components/CreateCall";
import Calls from "./components/Calls"
import { mapActions } from "vuex";
export default {
  components: {
    CreateCall,
    Calls
  },
  data() {
    return { bills: true };
  },
  methods: {
    ...mapActions(["get_users"]),
    getBills() {
      this.bills = false;
      var v = this;
      setTimeout(() => {
        v.bills = true;
      }, 500);
    },
  },
  created() {
    this.get_users();
  },
};
</script>

<style>
</style>