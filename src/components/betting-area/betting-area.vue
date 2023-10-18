<template>
  <div justify="center">
    <div v-if="!gameStarted" class="betting-area">
      <v-text-field
        v-model="localBet"
        label="Aposta"
        type="number"
        :min="1"
        :max="500"
        :step="1"
      ></v-text-field>
      <v-text-field
        v-model="localMines"
        label="Minas"
        type="number"
        :min="2"
        :max="24"
      ></v-text-field>
      <v-btn block @click="start">Começar o jogo</v-btn>
    </div>

    <div v-if="gameStarted" class="betting-area">
      <v-btn block @click="cashOutHandler">
        Retirar R$ {{ currentWinnings.toFixed(2) }}
      </v-btn>
    </div>

    <div v-if="gameEnded">
      {{ win ? "Você ganhou!" : "Você perdeu!" }}
      <v-btn block @click="resetHandler">Jogar novamente</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gameStarted: {
      type: Boolean,
      default: false,
    },
    gameEnded: {
      type: Boolean,
      default: false,
    },
    currentWinnings: {
      type: Number,
      default: 0,
    },
    bet: {
      type: Number,
      default: 0,
    },
    mines: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      localBet: 1,
      localMines: 2,
    };
  },
  methods: {
    start() {
      this.$emit("startGame", this.localBet, this.localMines);
    },
    cashOutHandler() {
      this.$emit("cashOut");
    },
    resetHandler() {
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.betting-area {
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.betting-input {
  margin-bottom: 10px;
}

.start-button {
  padding: 10px 15px;
}
</style>
