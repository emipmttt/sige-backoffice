<template>
  <div class="pa-5">
    <h1 class="text-h6">Pagos</h1>
    <form class="d-flex align-center" @submit.prevent="create_bill">
      <div class="pa-1">
        <v-text-field
          v-model="amount"
          label="Monto"
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
              label="Fecha"
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
        <v-btn type="submit">Añadir</v-btn>
      </div>
    </form>
    <v-row v-for="(bill, index) in bills_course" :key="index">
      <v-col>{{ bill.amount }}</v-col>
      <v-col>{{ bill.date }}</v-col>
      <v-col>
        <v-btn @click="delete_bill(index)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    bills: Array,
  },
  data() {
    return {
      bills_course: [],
      amount: 0,

      date_modal: false,
      date: "",
    };
  },

  methods: {
    create_bill() {
      let bills = this.bills_course;
      bills.push({
        amount: this.amount,
        date: this.date,
      });
      this.title = "";
      this.teacher = "";
      this.bills_course = bills;
      this.$emit("update_bills", this.bills_course);
    },
    delete_bill(index) {
      let bills = this.bills_course;
      bills.splice(index, 1);
      this.bills_course = bills;
      this.$emit("update_bills", this.bills_course);
    },
  },
  created() {
    this.bills_course = this.bills || [];
  },
};
</script>

<style>
</style>