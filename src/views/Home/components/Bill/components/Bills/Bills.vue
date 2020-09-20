<template>
  <div class="pa-3">
    <v-simple-table class="secondary--bg" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Usuario</th>
            <th class="text-left">Monto</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Concepto</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in bills" :key="bill.id">
            <th
              class="text-left"
              v-if="users.length"
            >{{find_user(bill.user).user.name}} {{find_user(bill.user).user.lastname1 || ""}}</th>
            <th class="text-left">{{bill.amount}}</th>
            <th class="text-left">{{bill.date}}</th>
            <th class="text-left">{{bill.description}}</th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      bills: [],
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    find_user(id) {
      return this.users.find((user) => user.id == id);
    },
    async get_bills() {
      const bills_query = await firebase
        .firestore()
        .collection("payments")
        .get();
      var bills = [];
      bills_query.forEach((bill) => {
        bills.push({ id: bill.id, ...bill.data() });
      });
      this.bills = bills;
    },
  },
  async created() {
    await this.get_bills();
  },
};
</script>

<style>
</style>