<template>
  <div>
    <!-- <pre class="white--text">
      {{ bills }}
   </pre
    > -->
    <v-simple-table class="secondary--bg" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Usuario</th>
            <th class="text-left">Monto</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Concepto</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bill, index) in bills" :key="bill.id + index">
            <th class="text-left">
              {{
                find_user(bill.user)
                  ? find_user(bill.user).user.name +
                    " " +
                    find_user(bill.user).user.lastname1
                  : bill.name
              }}
            </th>

            <th class="text-left">{{ bill.amount }}</th>
            <th class="text-left">{{ bill.date }}</th>
            <th class="text-left">{{ bill.description }}</th>
            <th class="text-left"><v-btn @click="deleteItem(bill.id)"><v-icon>delete</v-icon></v-btn></th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <v-btn @click="showMore" v-if='bills.length == 20' block color="red" class="white--text"
      >Mostrar Más</v-btn
    >
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  data() {
    return {
      bills: [],
      limit: 20,
      offset: 20,
    };
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    async deleteItem(id) {
      await firebase.firestore().collection("payments").doc(id).delete();
      this.get_bills()
    },
    async showMore() {
      const bills_query = await firebase
        .firestore()
        .collection("payments")
        .orderBy("createdAt")
        .limit(this.limit)
        .startAfter(this.offset + 1)

        .get();
      var bills = [];
      bills_query.forEach((bill) => {
        bills.push({ id: bill.id, ...bill.data() });
      });

      const newBills = [...this.bills, ...bills];

      this.bills = [];
      this.bills = newBills;

      this.offset += this.limit;
    },
    find_user(id) {
      return this.users.find((user) => user.id == id);
    },
    async get_bills() {
      const bills_query = await firebase
        .firestore()
        .collection("payments")
        .limit(this.limit)
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