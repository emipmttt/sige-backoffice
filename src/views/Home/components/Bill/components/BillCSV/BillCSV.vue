<template>
  <div class="pa-4">
    <v-card class="secondary--bg pa-2">
      <v-file-input
        label="Añade un archivo csv"
        dark
        outlined
        dense
        hide-details
        @change="get_files"
      ></v-file-input>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    get_files(e) {
      console.log(e);
    },
  },
};
</script>

<style>
</style>