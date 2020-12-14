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
              <v-btn @click="deleteItem(bill._id)" color="primary"
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
import { mapActions, mapState } from "vuex";
export default {
  props: {
    billType: String,
  },
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
      deleteBills: "bills/deleteBills",
      searchBillsAction: "bills/searchBills",
    }),
    async searchBills() {
      this.search = true;
      const responseSearch = await this.searchBillsAction({
        text: this.searchText,
        type: this.billType == "estudiantes" ? "student" : "external",
      });
      this.bills = responseSearch.data.data;
    },
    async deleteItem(id) {
      await this.deleteBills(id);
      await this.get_bills();
    },
    async showMore() {
      const bills_query = await this.getBills({
        limit: this.limit,
        skip: this.offset,
        query: {
          type: this.billType == "estudiantes" ? "student" : "external",
        },
      });

      this.offset = this.offset + this.limit;
      this.bills = [...this.bills, ...bills_query.data.data];
    },
    find_user(id) {
      return this.users.find((user) => user.id == id);
    },
    async get_bills() {
      const bills_query = await this.getBills({
        limit: this.limit,
        query: {
          type: this.billType == "estudiantes" ? "student" : "external",
        },
      });

      this.bills = bills_query.data.data;
    },
  },
  watch: {
    billType() {
      this.get_bills();
    },
  },
  async created() {
    await this.get_bills();
  },
};
</script>

<style>
</style>