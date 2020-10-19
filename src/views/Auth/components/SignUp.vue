<template>
  <form @submit.prevent="sign_up">
    <h2 class="white--text">Iniciar Sesión</h2>
    <br />
    <v-text-field
      :disabled="loading"
      v-model="name"
      color="white"
      dark
      label="Nombre Completo"
      dense
      outlined
    ></v-text-field>
    <v-text-field
      :disabled="loading"
      v-model="email"
      color="white"
      type="email"
      dark
      label="Correo Electrónico"
      dense
      outlined
    ></v-text-field>
    <v-text-field
      :disabled="loading"
      v-model="password"
      color="white"
      dark
      type="password"
      label="Contraseña"
      dense
      outlined
    ></v-text-field>
    <v-text-field
      :disabled="loading"
      v-model="password_confirm"
      color="white"
      dark
      type="password"
      label="Confirmar Contraseña"
      dense
      outlined
    ></v-text-field>
    <v-btn
      :disabled="loading"
      type="submit"
      block
      class="mt-2 primary--bg white--text"
      >Regístrate</v-btn
    >
    <v-btn
      @click="$router.push('/iniciar-sesion')"
      block
      class="mt-2 white--text"
      text
      >Iniciar Sesión</v-btn
    >
    <v-btn block class="mt-2 white--text" text>¿Olvidaste tu contraseña?</v-btn>
    <v-btn
      @click="$router.push('/politica-de-privacidad')"
      block
      class="white--text mt-10"
      text
      >Aviso de Privacidad</v-btn
    >
  </form>
</template>

<script>
import firebase from "@/config/firebase";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirm: "",

      loading: false,
    };
  },
  methods: {
    sign_up() {
      if (this.loading) return;
      this.loading = true;

      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.password_confirm
      ) {
        this.loading = false;
        return alert("Completa todos los campos");
      }

      if (this.password != this.password_confirm) {
        this.loading = false;
        return alert("Ambas contraseñas deben coincidir");
      }
      var v = this;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email.trim(), this.password)
        .then((user) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .set({
              user: {
                email: this.email,
                name: this.name,
              },
              type: 0,
              active: false,
              created_at: Date.now(),
            })
            .then(() => {
              v.loading = false;
              alert("Te has registrado correctamente");
              v.$router.push("/iniciar-sesion");
            })
            .catch(() => {
              v.loading = false;
            });
        })
        .catch(function (error) {
          v.loading = false;

          alert(error.message);
        });
    },
  },
};
</script>

<style>
</style>