<template>
  <v-app class="v-app">
    <Minesweeper />
  </v-app>
</template>

<script>
import Minesweeper from "./components/Minesweeper.vue";

export default {
  name: "App",
  components: {
    Minesweeper
  }
};
</script>
<style scoped>
.v-app {
    background-color: #2c3e50 !important;
    color: white; /* Fundo escuro */
}
</style>