<template>
  <div class="pa-2">
    <h1 class="white--text">Llamados</h1>
    <Calls v-if="calls" />
    <CreateCall @getCalls="getCalls" />
  </div>
</template>

<script>
import CreateCall from "./components/CreateCall";
import Calls from "./components/Calls";
import { mapActions } from "vuex";
export default {
  components: {
    CreateCall,
    Calls,
  },
  data() {
    return { calls: true };
  },
  methods: {
    ...mapActions(["get_users"]),
    getCalls() {
      this.calls = false;
      var v = this;
      setTimeout(() => {
        v.calls = true;
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