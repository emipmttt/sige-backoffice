<template>
  <div>
    <CreateBill @getBills="getBills" />
    <Bills v-if="bills" />
  </div>
</template>

<script>
import CreateBill from "./components/CreateBill/CreateBill";
import Bills from "./components/Bills/Bills";
export default {
  components: {
    CreateBill,
    Bills,
  },
  data() {
    return { bills: true };
  },
  methods: {
    getBills() {
      this.bills = false;
      var v = this;
      setTimeout(() => {
        v.bills = true;
      }, 500);
    },
  },
};
</script>

<style>
</style>