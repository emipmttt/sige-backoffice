<template>
  <div>
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
    <v-dialog v-model="loading" width="300">
      <v-card>
        <v-card-text class="text-center pa-8">
          <v-progress-circular
            :size="100"
            indeterminate
            color="red"
          ></v-progress-circular>

          <h1>Estamos Procesando tu archivo</h1>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      addBills: "bills/addBills",
    }),
    get_files(file) {
      if (!file) return;
      var v = this;
      var reader = new FileReader();
      this.loading = true;
      reader.onload = async (e) => {
        await v.csvToJSON(e.target.result);
        v.loading = false;
      };
      reader.readAsText(file);
    },
    async csvToJSON(csv) {
      var row = csv.split("\n");
      var v = this;
      var headers = row[0].split(",");

      row.shift();

      var rows = [];
      var currentRow = [];
      for (const col of row) {
        if (currentRow.length == 499) {
          rows.push(currentRow);
          currentRow = [];
        } else {
          currentRow.push(col);
        }
      }

      try {
        var payments = [];
        for (const rowItem of rows) {
          for (const col of rowItem) {
            var data = col.split(",");
            if (!data[0]) continue;

            var obj = {};
            var id = "";

            headers.forEach((header, index) => {
              obj[header.trim()] = data[index].replace(/&&&/g, ",");
              id += data[index];
            });

            id = md5(id);

            payments.push({
              name: obj["NOMBRE DEL ACTOR"],
              user: md5(obj["NOMBRE DEL ACTOR"]),
              amount: obj["TOTAL"],
              description: `Proyecto: ${obj["PROYECTO"]} | Personaje: ${obj["PERSONAJE"]} - Fecha de Grabación: ${obj["FECHA DE GRABACION"]} `,
              date: obj["FECHA DE PROCESO DE PAGO"],
              createdAt: Date.now(),
              csvUniqueId: md5(
                obj["NOMBRE DEL ACTOR"] +
                  `Proyecto: ${obj["PROYECTO"]} | Personaje: ${obj["PERSONAJE"]} - Fecha de Grabación: ${obj["FECHA DE GRABACION"]} `
              ),
            });
          }
        }

        await this.addBills(payments);

        v.$emit("getBills");

        return alert("Pagos Actualizados");
      } catch (error) {
        return alert("Ha ocurrido un error al actualizar los pagos");
      }
    },
  },
};
</script>

<style>
</style>