<template>
  <div>
    <form @submit.prevent="searchBills" class="d-flex align-center mb-6">
      <v-text-field
        v-model="searchText"
        dense
        dark
        outlined
        filled
        hide-details
        label="Busqueda"
        class="mr-2"
      ></v-text-field>

      <v-btn type="submit" color="primary"> Buscar </v-btn>
      <v-btn
        @click="(searchText = ''), get_bills()"
        class="ml-1"
        color="primary"
        text
      >
        Cancelar
      </v-btn>
    </form>

    <v-simple-table class="secondary--bg" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <th class="text-left">id</th> -->
            <th class="text-left">Usuario</th>
            <th class="text-left">Monto</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Concepto</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(bill, index) in bills" :key="bill._id + index">
            <!-- <th class="text-left">{{ bill.id }}</th> -->
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
            <th class="text-left">
              <v-btn @click="deleteItem(bill.id)" color="primary"
                ><v-icon>delete</v-icon></v-btn
              >
            </th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <v-btn
      @click="showMore"
      v-if="bills.length % 2 == 0"
      block
      color="red"
      class="white--text"
      >Mostrar Más</v-btn
    >
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      search: false,
      searchedBills: [],

      bills: [],
      limit: 20,
      offset: 20,

      searchText: "",
    };
  },
  computed: {
    ...mapState(["users"]),

    usersAutocomplete() {
      return this.users.map((user) => {
        console.log(user);

        return {
          value: user.id,
          text: user.user.name,
        };
      });
    },
  },
  methods: {
    ...mapActions({
      getBills: "bills/getBills",
      searchBillsAction: "bills/searchBills",
    }),
    async searchBills() {
      this.search = true;

      const responseSearch = await this.searchBillsAction(this.searchText);

      // await getBills({});

      this.bills = responseSearch.data.data;

      // const bills_query = await firebase
      //   .firestore()
      //   .collection("payments")
      //   .orderBy("createdAt")
      //   // .where("")
      //   .get();
      // var bills = [];
      // bills_query.forEach((bill) => {
      //   bills.push({ id: bill.id, ...bill.data() });
      // });
      // this.bills = bills;
    },
    async deleteItem(id) {
      await firebase.firestore().collection("payments").doc(id).delete();
      this.get_bills();
    },
    async showMore() {
      const bills_query = await firebase
        .firestore()
        .collection("payments")
        .orderBy("createdAt")
        .startAfter(this.bills[this.bills.length - 1].createdAt)
        .limit(this.limit)
        .get();

      var bills = [...this.bills];
      bills_query.forEach((bill) => {
        bills.push({ id: bill.id, ...bill.data() });
      });

      this.bills = [];
      this.bills = bills;

      this.offset += this.limit;

      console.log(this.offset, this.limit);
    },
    find_user(id) {
      return this.users.find((user) => user.id == id);
    },
    async get_bills() {
      const bills_query = await this.getBills({
        limit: this.limit,
      });

      this.bills = bills_query.data.data;
    },
  },
  async created() {
    await this.get_bills();
  },
};
</script>

<style>
</style>