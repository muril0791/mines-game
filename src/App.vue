<template>
  <v-container fluid>
    <!-- Wallet Information -->
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <div class="wallet">Saldo Atual: R$ {{ wallet.toFixed(2) }}</div>
      </v-col>
    </v-row>

    <!-- Board Component -->
    <Board :board="board" :gameStarted="gameStarted" :gameEnded="gameEnded" @reveal="revealCell" />

    <!-- BettingArea Component -->
    <BettingArea 
      :gameStarted="gameStarted" 
      :gameEnded="gameEnded" 
      :currentWinnings="currentWinnings" 
      :bet="bet" 
      :mines="mines" 
      @startGame="startGame" 
      @cashOut="cashOut" 
      @reset="resetGame" 
    />

  </v-container>
</template>
<script>
import AppLogic from './AppLogic.js';
import Board from './components/Board/Board.vue';
import BettingArea from './components/betting-area/betting-area.vue';

export default {
  ...AppLogic,
  components: {
    Board,
    BettingArea
  }
};
</script>
<style scoped>
.app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: Arial, sans-serif;
}
.logo {
    align-self: flex-start;
}
.wallet {
   align-self: flex-end;
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
  text-align: center;
}
</style>