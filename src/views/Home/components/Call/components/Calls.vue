<template>
  <div>
    <!-- <pre class="white--text">
      {{ calls }}
   </pre
    > -->

    <v-text-field
      v-model="search"
      dense
      dark
      outlined
      filled
      hide-details
      label="Busqueda"
      class="mr-2"
    ></v-text-field>

    <v-simple-table class="secondary--bg" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Usuario</th>
            <th class="text-left">Fecha</th>
            <th class="text-left">Descripción</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(call, index) in calls_filtered" :key="call.id + index">
            <th class="text-left">
              {{
                find_user(call.user)
                  ? find_user(call.user).user.name +
                    " " +
                    (find_user(call.user).user.lastname1
                      ? find_user(call.user).user.lastname1
                      : "")
                  : ""
              }}
            </th>

            <th class="text-left">{{ call.date }}</th>
            <th class="text-left">{{ call.description }}</th>
            <th class="text-left">
              <v-btn @click="deleteItem(call.id)" color="primary"
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
      v-if="calls.length == 20"
      block
      color="red"
      class="white--text"
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
      calls: [],
      limit: 20,
      offset: 20,
      search: "",
    };
  },
  computed: {
    ...mapState(["users"]),

    calls_filtered() {
      var v = this;
      return this.calls.filter((call) => {
        if (this.search) {
          if (
            v.find_user(call.user) &&
            v
              .find_user(call.user)
              .user.name.toLowerCase()
              .includes(v.search.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
    },
  },

  methods: {
    async deleteItem(id) {
      await firebase.firestore().collection("calls").doc(id).delete();
      this.get_calls();
    },
    async showMore() {
      const calls_query = await firebase
        .firestore()
        .collection("calls")
        .orderBy("createdAt", "desc")
        .limit(this.limit)
        .startAfter(this.offset + 1)

        .get();
      var calls = [];
      calls_query.forEach((bill) => {
        calls.push({ id: bill.id, ...bill.data() });
      });

      const newcalls = [...this.calls, ...calls];

      this.calls = [];
      this.calls = newcalls;

      this.offset += this.limit;
    },
    find_user(id) {
      return this.users.find((user) => user.id == id);
    },
    async get_calls() {
      const calls_query = await firebase
        .firestore()
        .collection("calls")
        .limit(this.limit)
        .get();
      var calls = [];
      calls_query.forEach((bill) => {
        calls.push({ id: bill.id, ...bill.data() });
      });
      this.calls = calls;
    },
  },
  async created() {
    await this.get_calls();
  },
};
</script>

<style>
</style>