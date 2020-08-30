<template>
  <div>
    <v-card style="width:70%; overflow: hidden" class="secondary--bg mx-auto mt-10">
      <v-row style="max-width:100%; margin auto 0 ">
        <v-col class="pa-5">
          <h1 class="white--text">SIGE</h1>
        </v-col>
        <v-col class="pa-5 white" style="box-sizing: border-box">
          <h2>Iniciar Sesión</h2>
          <br />
          <v-text-field label="Correo Electrónico" dense outlined></v-text-field>
          <v-text-field label="Contraseña" dense outlined></v-text-field>
          <div class="d-flex">
            <v-btn class="primary--text" text>Regístrate</v-btn>
            <v-btn class="primary--bg white--text">Iniciar Sesión</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>