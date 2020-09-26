<template>
  <ion-page>
    <ion-content class="ion-padding" color="tertiary">
      <h1 class="ion-tertiary" color="tertiary">Iniciar Sesion</h1>
      <ion-list class="tertiary">
        <ion-item color="tertiary">
          <ion-label position="floating" color="primary"
            >Correo Electrónico</ion-label
          >
          <ion-input
            @ionChange="emailLogin = $event.target.value"
            :value="emailLogin"
          ></ion-input>
        </ion-item>
        <ion-item color="tertiary">
          <ion-label position="floating" color="primary">Contraseña</ion-label>
          <ion-input
            @ionChange="passwordLogin = $event.target.value"
            :value="passwordLogin"
            type="password"
          ></ion-input>
        </ion-item>
      </ion-list>
      <ion-button @click="validateForm()" expand="block">ENTRAR</ion-button>
      <ion-button fill="clear" @click="$router.go(-1)" expand="block"
        >VOLVER</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import firebase from "@/config/firebase";
export default {
  data() {
    return {
      emailLogin: "emipmttt@gmail.com",
      passwordLogin: "",
      password: "",
    };
  },
  computed: {
    ...mapState({
      emailLoginState: (state) => state.auth.emailLogin,
      passwordLoginState: (state) => state.auth.passwordLogin,
      passwordState: (state) => state.auth.password,
    }),
  },
  methods: {
    ...mapMutations({
      update_state: "auth/update_state",
    }),
    validateForm() {
      var v = this;
      if (!this.emailLogin || !this.passwordLogin) {
        this.$ionic.alertController
          .create({
            header: "Completa los campos",
            message: "Todos los campos de este formulario son obligatios",
            buttons: ["OK"],
          })
          .then((a) => a.present());
      } else {
        this.update_state({
          propertie: "emailLogin",
          value: this.emailLogin,
        });
        this.update_state({
          propertie: "passwordLogin",
          value: this.passwordLogin,
        });
        firebase
          .auth()
          .signInWithEmailAndPassword(v.emailLogin, v.passwordLogin)
          .then((response) => {
            firebase
              .firestore()
              .collection("users")
              .doc(response.user.uid)
              .get()
              .then((response) => {
                var user_data = { id: response.id, ...response.data() };

                if (user_data.active) {
                  if (user_data.type == 0 || user_data.type == 3) {
                    v.update_state({
                      propertie: "current_user",
                      value: user_data,
                    });

                    localStorage.setItem(
                      "sige_current_user",
                      JSON.stringify(user_data)
                    );
                    v.$router.push("/home");
                  } else {
                    v.$ionic.alertController
                      .create({
                        header: "No tienes permisos suficientes para acceder",
                        buttons: ["OK"],
                      })
                      .then((a) => a.present());
                  }
                } else {
                  v.$ionic.alertController
                    .create({
                      header:
                        "Tu cuenta no está activa, contacta con un administrador para activar tu cuenta",
                      buttons: ["OK"],
                    })
                    .then((a) => a.present());
                }
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

            v.$ionic.alertController
              .create({
                header: "",
                message: message,
                buttons: ["OK"],
              })
              .then((a) => a.present());
          });
      }
    },
  },
  mounted() {
    this.emailLogin = this.emailState;
    this.passwordLogin = this.passwordLoginState;
    this.password = this.passwordState;
  },
};
</script>

<style>
</style>