<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="5">
      <div class="board">
        <v-row v-for="row in board" :key="row.id">
          <v-col v-for="cell in row.cells" :key="cell.id" cols="12" sm="4" md="2" lg="2">
            <v-card
              block
              :disabled="cell.revealed || !gameStarted"
              :class="{ mine: gameEnded && cell.hasMine }"
              @click="revealCell(cell)"
            >
              <v-img v-if="cell.revealed && cell.hasMine" :src="mineImage"></v-img>
              <v-img v-else-if="cell.revealed" :src="gemImage"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    board: Array,
    gameStarted: Boolean,
    gameEnded: Boolean,
  },
  methods: {
    revealCell(cell) {
      this.$emit('reveal', cell);
    }
  },
  data() {
    return {
      mineImage: require("@/assets/mine.png"),
      gemImage: require("@/assets/gem.png"),
    };
  },
};
</script>

<style scoped>
/* Estilos para o Tabuleiro */
 .board{
    justify-content: center;
 }
.v-card{
    width: 100px;
    height: 100px;
}

.cell {
    border: 1px solid black;
    padding: 15px;
    text-align: center;
}

</style>