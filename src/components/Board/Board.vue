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
        <div v-if="cell.revealed">
          <img v-if="cell.hasMine" :src="mineImage" alt="Mine" class="image" />
          <img v-else :src="gemImage" alt="Gem" class="image" />
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
  aspect-ratio: 1 / 1; /* This ensures that the cell is always a square */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.cell.revealed {
  background-color: #bbb;
}

.cell.mine {
  background-color: red;
}

.image {
  max-width: 100%;
  max-height: 100%;
}
</style>