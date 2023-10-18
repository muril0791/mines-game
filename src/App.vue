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
      <div class="wallet">Saldo Atual: R$ {{ wallet.toFixed(2) }}</div>
    </v-app-bar>

    <v-main>
      <Board :board="board" :gameStarted="gameStarted" :gameEnded="gameEnded" @reveal="revealCell" />
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
    </v-main>
  </v-app>
</template>

<script>
import Board from './components/Board/Board.vue';
import BettingArea from './components/betting-area/betting-area.vue';
import AppLogic from './AppLogic.js';

export default {
  ...AppLogic,
  components: {
    Board,
    BettingArea
  },
};
</script>

<style scoped>
.v-app{
  background-color: rgb(126, 126, 126);
}
.v-app-bar {
  background-color: #1976D2 !important; 
  color: white; 
}

.logo {
   background-image: url('@/assets/logo.png');
   width: auto;
   height: auto;
}

.wallet {
  font-size: 18px;
}

.v-navigation-drawer {
  background-color: #f8f9fa; 
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
}
</style>
