<template>
  <div class="pa-2">
    <h1 class="white--text">Pagos</h1>
    <BillCSV @getBills="getBills" />
    <br />
    <CreateBill @getBills="getBills" />
    <Bills v-if="bills" />
  </div>
</template>

<script>
import CreateBill from "./components/CreateBill/CreateBill";
import BillCSV from "./components/BillCSV/BillCSV";
import Bills from "./components/Bills/Bills";

import { mapActions } from "vuex";

export default {
  components: {
    CreateBill,
    Bills,
    BillCSV,
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