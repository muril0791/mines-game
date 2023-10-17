<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <div class="wallet">Saldo Atual: R$ {{ wallet.toFixed(2) }}</div>
      </v-col>
    </v-row>

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
              <v-btn
                block
                :disabled="cell.revealed || !gameStarted"
                :class="{ mine: gameEnded && cell.hasMine }"
                @click="revealCell(cell)"
              >
                <v-img
                  v-if="cell.revealed && cell.hasMine"
                  src="@/assets/mine.png"
                ></v-img>
                <v-img v-else-if="cell.revealed" src="@/assets/gem.png"></v-img>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">
        <div v-if="!gameStarted" class="betting-area">
          <v-text-field
            v-model="bet"
            label="Aposta"
            type="number"
            :min="0.1"
            :max="500.0"
            :step="0.1"
          ></v-text-field>
          <v-text-field
            v-model="mines"
            label="Minas"
            type="number"
            :min="2"
            :max="24"
          ></v-text-field>
          <v-btn block @click="startGame">Começar o jogo</v-btn>
        </div>

        <div v-if="gameStarted" class="betting-area">
          <v-btn block @click="cashOut">
            Retirar R$ {{ currentWinnings.toFixed(2) }}
          </v-btn>
        </div>

        <div v-if="gameEnded">
          {{ win ? "Você ganhou!" : "Você perdeu!" }}
          <v-btn block @click="resetGame">Jogar novamente</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 export default {
   data() {
     return {
       wallet: 1000.0,
       bet: (0.1).toFixed(2),
       mines: 2,
       board: [],
       gameStarted: false,
       gameEnded: false,
       win: false,
       currentWinnings: 0.0,
       mineImage: require("@/assets/mine.png"),
       gemImage: require("@/assets/gem.png"),
     };
   },

   mounted() {
     this.generateBoard();
   },
   methods: {
     startGame() {
       if (this.bet > this.wallet) {
         alert("Saldo insuficiente para esta aposta.");
         return;
       }

       this.wallet -= this.bet;
       this.gameStarted = true;
       this.generateBoard();
     },
     generateBoard() {
       this.board = [];
       for (let i = 0; i < 5; i++) {
         const row = {
           id: i,
           cells: [],
         };
         for (let j = 0; j < 5; j++) {
           row.cells.push({
             id: `${i}-${j}`,
             hasMine: false,
             revealed: false,
           });
         }
         this.board.push(row);
       }
       let placedMines = 0;
       while (placedMines < this.mines) {
         const rowIndex = Math.floor(Math.random() * 5);
         const cellIndex = Math.floor(Math.random() * 5);
         if (!this.board[rowIndex].cells[cellIndex].hasMine) {
           this.board[rowIndex].cells[cellIndex].hasMine = true;
           placedMines++;
         }
       }
     },
     revealCell(cell) {
       if (this.gameEnded) {
         return;
       }
       cell.revealed = true;
       if (cell.hasMine) {
         this.gameEnded = true;
         this.win = false;
         this.currentWinnings = 0;
       } else {
         this.currentWinnings += this.bet / (5 * 5 - this.mines);
       }
     },
     cashOut() {
       this.wallet += this.currentWinnings;
       this.gameEnded = true;
       this.win = true;
     },
     resetGame() {
       this.gameStarted = false;
       this.gameEnded = false;
       this.win = false;
       this.currentWinnings = 0;
       this.generateBoard();
     },
   },
 };

</script>
<style scoped>
.wallet {
  font-size: 24px;
  color: black;
  margin-bottom: 20px;
  text-align: center;
}

.board {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.cell img {
  width: 70%;
}

.icon {
  width: 70%;
  max-width: 100px;
}

.betting-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  margin-right: 10px;
}

button[disabled] {
  background-color: #95a5a6;
}

button.mine {
  background-color: #e74c3c;
}

.v-text-field {
  margin-bottom: 15px;
}

.v-btn {
  margin-top: 10px;
}

.v-btn > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-btn {
  transition: background-color 0.3s ease;
}

.v-btn:hover {
  background-color: #5d8aa8 !important;
}

@media (max-width: 600px) {
  .board {
    flex-direction: column;
    align-items: center;
  }
}
</style>
