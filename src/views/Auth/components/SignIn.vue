<template>
  <form @submit.prevent="sing_in">
    <h2 class="white--text">Iniciar Sesión</h2>
    <br />
    <v-text-field v-model="email" color="white" dark label="Correo Electrónico" dense outlined></v-text-field>
    <v-text-field
      v-model="password"
      color="white"
      dark
      label="Contraseña"
      type="password"
      dense
      outlined
    ></v-text-field>
    <v-btn type="submit" block class="mt-2 primary--bg white--text">Iniciar Sesión</v-btn>
    <v-btn @click="$router.push('/registrate')" block class="mt-2 white--text" text>Regístrate</v-btn>
    <v-btn block class="mt-2 white--text" text>¿Olvidaste tu contraseña?</v-btn>
    <v-btn block class="white--text mt-10" text>Aviso de Privacidad</v-btn>
  </form>
</template>

<script>
import firebase from "@/config/firebase";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
    };
  },
  methods: {
    ...mapMutations(["update_state"]),
    sing_in() {
      if (this.loading) return;
      this.loading = true;

      if (!this.email || !this.password) {
        return alert("Completa todos los campos");
      }

      var v = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .get()
            .then((response) => {
              if (response.data().type == 2 || response.data().type == 1) {
                v.loading = false;
                alert("Bienvenido");
                this.update_state([
                  "user",
                  { id: response.id, ...response.data() },
                ]);
                localStorage.setItem(
                  "sige_user",
                  JSON.stringify({ id: response.id, ...response.data() })
                );
                v.$router.push("/h/");
              } else {
                v.loading = false;
                alert(
                  "No tienes permisos suficientes para acceder a esta página"
                );
              }
            })
            .catch((error) => {
              alert(error.message);
            });
        })
        .catch(function (error) {
          // Handle Errors here.
          v.loading = false;
          var errorMessage = error.message;
          alert(errorMessage);
          // ...
        });
    },
  },
};
</script>

<style>
</style>