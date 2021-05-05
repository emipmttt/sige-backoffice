<template>
  <form @submit.prevent="sign_up">
    <h2 class="white--text">Regístrate</h2>
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
    <v-btn
      @click="$router.push('/politica-de-privacidad')"
      block
      class="white--text mt-10"
      text
    >
      Aviso de Privacidad
    </v-btn>
  </form>
</template>

<script>
import firebase from "@/config/firebase";
import api from "@/services/api";
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
            .then(async () => {
              v.loading = false;

              await api.post("/mail/confirm-account", {
                email: this.email,
                uid: user.user.uid,
              });

              await api.post("/mail/new-user", {
                email: this.email,
                name: this.name,
                uid: user.user.uid,
                type: "admin",
              });

              alert(
                "Te has registrado correctamente, enviamos un correo para que puedas confirmar tu cuenta"
              );

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