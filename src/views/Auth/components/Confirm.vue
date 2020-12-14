<template>
  <div class="light--text">Redireccionando...</div>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  methods: {
    async confirm() {
      await firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .update({
          confirmed: true,
        });
      alert("tu cuenta ha sido activada");
      this.$router.push("/");
    },
  },
  async mounted() {
    this.confirm();
  },
};
</script>

<style>
</style>