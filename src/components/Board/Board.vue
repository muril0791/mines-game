<template>
  <div class="board">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <div
        v-for="(cell, cellIndex) in row.cells"
        :key="cellIndex"
        class="cell"
        @click="revealCell(cell)"
        :class="{ revealed: cell.revealed, mine: gameEnded && cell.hasMine }"
      >
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <!-- Conteúdo da frente do cartão -->
          </div>
          <div class="flip-card-back">
            <img v-if="cell.hasMine" :src="mineImage" alt="Mine" class="image" />
            <img v-else :src="gemImage" alt="Gem" class="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
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
    };
  },
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(5, minmax(5vw, 100px));
  gap: 10px;
  justify-content: center;
  margin: auto;
  padding: 20px;
}

.row {
  display: contents;
}

.cell {
  background-image: url('@/assets/cardBack.png');
  background-size: cover;
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  perspective: 1000px; /* Adicionado para efeito 3D */
}

.cell.revealed .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-inner {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  position: absolute;
  width: 100%;
  height: 100%;
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Adicionado para garantir que a imagem ocupe toda a área */
}
</style>