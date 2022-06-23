<template>
  <div class="pa-5">
    <h1 class="text-h6">Pagos</h1>
    <form class="d-flex align-center" @submit.prevent="saveBill">
      <div class="pa-1">
        <v-text-field
          v-model="amount"
          label="Monto mensual"
          type="number"
        ></v-text-field>
      </div>
      <div class="pa-1">
        <v-text-field
          v-model="latePayment"
          label="recargo"
          type="number"
        ></v-text-field>
      </div>
      <div class="pa-1">
        <v-dialog
          ref="dialog"
          v-model="date_modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha de finalización"
              prepend-icon="event"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="date_modal = false">
              Cancelar
            </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </div>

      <div class="pa-1">
        <v-btn type="submit">Guardar</v-btn>
      </div>
    </form>
    
  </div>
</template>

<script>
import firebase from "@/config/firebase";

export default {
  props: {
    payment: Object,
    course: Object,
  },
  data() {
    return {
      amount: this.payment?.amount || 0,
      latePayment: this.payment?.latePayment || 0,
      date_modal: false,
      date: this.payment?.finishDate,
    };
  },

  methods: {
    async saveBill() {
      await firebase
        .firestore()
        .collection("courses")
        .doc(this.course.id)
        .update({
          ...this.course,
          payment: {
            amount: this.amount,
            latePayment: this.latePayment,
            finishDate: this.date,
          },
        });
      this.$emit("getCourses");
      alert("Pagos actualizados")
    },
    // create_bill() {
    //   let bills = this.bills_course;
    //   bills.push({
    //     amount: this.amount,
    //     date: this.date,
    //   });
    //   this.amount = "";
    //   this.date = "";
    //   this.bills_course = bills;
    //   this.$emit("update_bills", this.bills_course);
    // },
    // delete_bill(index) {
    //   let bills = this.bills_course;
    //   bills.splice(index, 1);
    //   this.bills_course = bills;
    //   this.$emit("update_bills", this.bills_course);
    // },
  },
  mounted(){
    console.log(this.date);
  }
};
</script>

<style></style>
