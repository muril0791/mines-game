<template>
  <v-app class="v-app">
    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item>
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Game Functions</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-img  src="@/assets/logo.png" width="50px" height="50px"></v-img> -->
      <div>seu logo</div>
      <v-spacer></v-spacer>
      <div class="wallet">Saldo R$ {{ wallet.toFixed(2) }}</div>
    </v-app-bar>

    <v-main>
      <Board
        :board="board"
        :gameStarted="gameStarted"
        :gameEnded="gameEnded"
        @reveal="revealCell"
      />
      <!-- Em App.vue -->
      <BettingArea
        :win="win"
        :gameStarted="gameStarted"
        :gameEnded="gameEnded"
        :currentWinnings="currentWinnings"
        :bet="bet"
        :mines="mines"
        @startGame="startGame"
        @cashOut="cashOut"
        @reset="resetGame"
      />
    <ResultPopup :show="gameEnded" :win="win" :amountWon="currentWinnings" @close="handleClose" />
    </v-main>
  </v-app>
</template>

<script>
import Board from "./components/Board/Board.vue";
import BettingArea from "./components/betting-area/betting-area.vue";
import AppLogic from "./AppLogic.js";
import ResultPopup from "./components/ResultPopup.vue";

export default {
  ...AppLogic,
  components: {
    Board,
    BettingArea,
    ResultPopup,
  },
  methods: {
  ...AppLogic.methods,
  handleClose() {
    this.resetGame();  // Chama o método resetGame para resetar o estado do jogo
  }
}
};
</script>

<style scoped>
.v-app {
  background-color: #1976d2;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.v-app-bar {
  background-color: #0d47a1 !important;
  color: white;
}

.wallet {
  font-size: 14px;
  color: white;
  background-color: #636363;
  border: #0d47a1;
  border-radius: 20px;
  padding: 8px;
}

.v-navigation-drawer {
  background-color: #bbdefb;
}

.v-list-item {
  color: #333;
}

.v-list-item-group {
  border-top: 1px solid #ddd;
}

.v-app-bar-nav-icon {
  font-size: 24px;
  cursor: pointer;
}

.v-main {
  padding: 20px;
  background-color: #778794;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>
