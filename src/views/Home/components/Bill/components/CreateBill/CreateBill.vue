<template>
  <div>
    <v-dialog v-model="create_bill" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" fixed dark fab right bottom class="primary--bg">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card class="secondary--bg" dark>
        <v-card-title class="headline secondary--bg">Crear un pago nuevo.</v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="user"
            :items="users_list"
            :search-input.sync="search_user"
            prepend-icon="person"
            label="Usuario"
          ></v-autocomplete>

          <v-text-field v-model="amount" label="Monto" type="number"></v-text-field>
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
              <v-btn text color="primary" @click="date_modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red" text @click="create">Añadir Pago</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      search_user: "",

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
    async create() {
      try {
        await firebase.firestore().collection("payments").add({
          user: this.user,
          amount: this.amount,
          description: this.description,
          date: this.date,
        });

        this.user = "null";
        this.amount = "";
        this.description = "";
        this.date = "";

        alert("Creado Correctamente");
        this.$emit("getBills");

        this.create_bill = false;
      } catch (error) {
        alert(error);
        console.error(error);
      }
    },
  },
};
</script>

<style>
</style>