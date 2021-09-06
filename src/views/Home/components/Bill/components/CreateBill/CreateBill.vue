<template>
  <v-dialog v-model="create_bill" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="editData"
        v-bind="attrs"
        v-on="on"
        color="primary"
        class="mr-2"
        ><v-icon>create</v-icon></v-btn
      >
      <v-btn
        v-else
        v-bind="attrs"
        v-on="on"
        fixed
        dark
        fab
        right
        bottom
        class="primary--bg"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card class="secondary--bg" dark>
      <v-card-title class="headline secondary--bg"
        >Crear un pago nuevo.</v-card-title
      >
      <v-card-text>
        <v-autocomplete
          v-model="user"
          :items="users_list"
          :search-input.sync="search_user"
          prepend-icon="person"
          label="Usuario"
        ></v-autocomplete>

        <v-text-field
          v-model="amount"
          label="Monto"
          type="number"
        ></v-text-field>
        <v-text-field v-model="description" label="Concepto"></v-text-field>
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
            <v-btn text color="primary" @click="date_modal = false"
              >Cancelar</v-btn
            >
            <v-btn text color="primary" @click="$refs.dialog.save(date)"
              >OK</v-btn
            >
          </v-date-picker>
        </v-dialog>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="editData" class="red" text @click="updateBill">
          Guardar Cambios
        </v-btn>
        <v-btn v-else class="red" text @click="create"> Añadir Pago </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    billType: String,
    editData: Object,
  },
  data() {
    return {
      search_user: "",

      // id, just use for edit
      id: "",

      user: "",
      amount: 0,
      date: "",
      description: "",

      create_bill: false,
      date_modal: false,
    };
  },
  computed: {
    ...mapState(["users"]),
    users_list() {
      return this.users.map((user) => ({
        text: `${user.user.name} ${user.user.lastname1 || ""}`,
        value: user.id,
      }));
    },
  },
  methods: {
    ...mapActions({
      addBills: "bills/addBills",
      updateBills: "bills/updateBills",
    }),
    async updateBill() {
      try {
        const userObject = this.users.find((user) => user.id == this.user);
        const response = await this.updateBills({
          id: this.id,
          user: this.user,
          email: userObject.user.email,
          name: `${userObject.user.name} ${userObject.user.lastname1 || ""}`,
          amount: this.amount,
          description: this.description,
          date: this.date,
        });

        this.user = "null";
        this.amount = "";
        this.description = "";
        this.date = "";
        alert(response.data.message);
        this.$emit("getBills");

        this.create_bill = false;
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
    async create() {
      try {
        const userObject = this.users.find((user) => user.id == this.user);
        const response = await this.addBills([
          {
            user: this.user,
            email: userObject.user.email,
            name: `${userObject.user.name} ${userObject.user.lastname1 || ""}`,
            amount: this.amount,
            description: this.description,
            date: this.date,
            createdAt: Date.now(),
            type: this.billType == "estudiantes" ? "student" : "external",
          },
        ]);

        this.user = "null";
        this.amount = "";
        this.description = "";
        this.date = "";
        alert(response.data.message);
        this.$emit("getBills");

        this.create_bill = false;
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
    verifyEditData() {
      if (this.editData) {
        this.id = this.editData._id;
        this.user = this.editData.user;
        this.amount = this.editData.amount;
        this.description = this.editData.description;
        this.date = this.editData.date;
      }
    },
  },
  mounted() {
    this.verifyEditData();
  },
};
</script>

<style>
</style>