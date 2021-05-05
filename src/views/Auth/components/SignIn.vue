<template>
  <form @submit.prevent="sing_in">
    <h2 class="white--text">Iniciar Sesión</h2>
    <br />
    <v-text-field
      v-model="email"
      color="white"
      dark
      label="Correo Electrónico"
      :disabled="loading"
      dense
      outlined
    ></v-text-field>
    <v-text-field
      v-model="password"
      color="white"
      dark
      label="Contraseña"
      type="password"
      :disabled="loading"
      dense
      outlined
    ></v-text-field>
    <v-btn
      :disabled="loading"
      type="submit"
      block
      class="mt-2 primary--bg white--text"
      >Iniciar Sesión</v-btn
    >
    <v-btn
      @click="$router.push('/registrate')"
      block
      :disabled="loading"
      class="mt-2 white--text"
      text
      >Regístrate</v-btn
    >
    <v-btn
      :disabled="loading"
      @click="recoverPassword"
      block
      class="mt-2 white--text"
      text
      >¿Olvidaste tu contraseña?</v-btn
    >
    <v-btn
      :disabled="loading"
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
import api from "@/services/api";
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
    recoverPassword() {
      var emailAddress = prompt("Escribe tu dirección de correo electrónico");

      if (!emailAddress) {
        return alert(
          "Escribe la dirección de correo electrónico con la que registraste tu cuenta."
        );
      }

      firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then(function () {
          alert("hemos enviado un correo para recuperar tu contraseña.");
        });
    },
    sing_in() {
      if (this.loading) return;
      this.loading = true;

      if (!this.email || !this.password) {
        return alert("Completa todos los campos");
      }

      var v = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email.trim(), this.password)
        .then((user) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.user.uid)
            .get()
            .then((response) => {
              if (!response.data().confirmed) {
                alert("confirma tu correo para continuar");
                api.post("/mail/confirm-account", {
                  email: this.email,
                  uid: user.user.uid,
                });

                this.loading = false;
              } else if (
                response.data().permissions &&
                response.data().permissions.admin
              ) {
                if (response.data().active) {
                  v.loading = false;
                  alert("Bienvenido");

                  const userdata = { id: response.id, ...response.data() };

                  this.update_state(["user", userdata]);

                  localStorage.setItem("sige_user", JSON.stringify(userdata));

                  v.$router.push("/h/");
                } else {
                  alert(
                    "Tu cuenta no está activa, contacta a un administrador para activarla"
                  );
                  this.loading = false;
                }
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
          var message = "";
          if (error.code == "auth/wrong-password") {
            message =
              "La contraseña no es valida o el usuario no tiene contraseña";
          }
          if (error.code == "auth/too-many-requests") {
            message = "Demasiadas Solicitudes";
          }
          if (error.code == "auth/invalid-email") {
            message = "La direccion de correo esta mal formateada";
          }
          if (error.code == "auth/user-not-found") {
            message = "Usuario no encontrado";
          }

          v.loading = false;
          var errorMessage = message;
          alert(errorMessage);
          // ...
        });
    },
  },
};
</script>

<style>
</style>