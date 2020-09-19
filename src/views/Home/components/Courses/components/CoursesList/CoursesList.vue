<template>
  <div>
    <v-list-item v-for="course in courses" :key="course.id" dark>
      <v-list-item-content>
        <v-list-item-title></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array,
  },
};
</script>

<style>
</style>