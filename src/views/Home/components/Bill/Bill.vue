<template>
  <div class="pa-2">
    <h1 class="white--text">Pagos {{ billType }}</h1>

    <p class="white--text">
      {{
        billType == "estudiantes"
          ? "Esta sección está destinada a subir pagos de colegiatura de estudiantes"
          : ""
      }}
    </p>

    <BillCSV
      :billType="billType"
      v-if="billType == 'externos'"
      @getBills="getBills"
    />
    <br />
    <CreateBill :billType="billType" @getBills="getBills" />
    <Bills v-if="bills" :billType="billType" @getBills="getBills" />
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
  computed: {
    billType() {
      return this.$route.path.split("pagos-")[1];
    },
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

<style scoped>
h1 {
  text-transform: capitalize;
}
</style>
