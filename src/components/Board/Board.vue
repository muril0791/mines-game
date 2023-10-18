<template>
  <v-row justify="center">
    <v-col cols="12" md="6" lg="5">
      <div class="board">
        <v-row v-for="row in board" :key="row.id">
          <v-col
            v-for="cell in row.cells"
            :key="cell.id"
            cols="12"
            sm="4"
            md="2"
            lg="2"
          >
            <v-card
              block
              :disabled="cell.revealed || !gameStarted"
              :class="{
                mine: gameEnded && cell.hasMine,
                flipped: cell.revealed,
              }"
              @click="revealCell(cell)"
            >
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <v-img :src="cardBackImage"></v-img>
                </div>
                <div class="flip-card-back">
                  <v-img v-if="cell.hasMine" :src="mineImage"></v-img>
                  <v-img v-else :src="gemImage"></v-img>
                </div>
              </div>
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
      this.$emit("reveal", cell);
    },
  },
  data() {
    return {
      mineImage: require("@/assets/mine.png"),
      gemImage: require("@/assets/gem.png"),
      cardBackImage: require("@/assets/cardBack.png"),
    };
  },
};
</script>

<style scoped>
.board {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
}

.v-card {
  max-width: 100px;
  max-height: 100px;
  width: auto;
  height: auto;
  min-width: 60px;
  min-height: 60px;
  flex-grow: 1;
}

@media (max-width: 600px) {
  .v-card {
    max-width: 60px;
    max-height: 60px;
  }
}

.flip-card {
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s; /* Movendo a transição para este elemento */
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  z-index: 2;
  transform: rotateY(0deg);
}

.flipped .flip-card-front {
  transform: rotateY(180deg); /* Oculte a frente quando virado */
}

.flip-card-back {
  transform: rotateY(180deg);
}

.flipped .flip-card-back {
  transform: rotateY(360deg); /* Mostre a parte de trás quando virado */
}
</style>
