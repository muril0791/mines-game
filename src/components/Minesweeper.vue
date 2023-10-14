<template>
  <div class="container">
    <!-- Área de Aposta -->
    <div class="betting-area">
      <label>Aposta:</label>
      <input v-model="bet" type="number" min="0.10" max="500.00" step="0.10" />
      <label>Minas:</label>
      <input v-model="mines" type="number" min="2" max="24" />
      <button @click="startGame">Começar o jogo</button>
    </div>

    <!-- Tabuleiro -->
    <div class="board">
      <div v-for="row in board" :key="row.id" class="row">
        <button
          v-for="cell in row.cells"
          :key="cell.id"
          :disabled="cell.revealed || !gameStarted"
          :class="{ mine: gameEnded && cell.hasMine }"
          @click="revealCell(cell)"
          class="cell"
        >
          <img
            v-if="cell.revealed && cell.hasMine"
            :src="mineImage"
            alt="Mina"
            class="icon"
          />
          <img
            v-else-if="cell.revealed"
            :src="gemImage"
            alt="Gema"
            class="icon"
          />
        </button>
      </div>
    </div>

    <!-- Retirada -->
    <div v-if="gameStarted" class="betting-area">
      <button @click="cashOut">
        Retirar R$ {{ currentWinnings.toFixed(2) }}
      </button>
    </div>

    <!-- Fim de Jogo -->
    <div v-if="gameEnded" class="end-game">
      {{ win ? "Você ganhou!" : "Você perdeu!" }}
      <button @click="resetGame">Jogar novamente</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bet: 0.1,
      mines: 2,
      board: [],
      gameStarted: false,
      gameEnded: false,
      win: false,
      currentWinnings: 0.0,
       mineImage: require('@/assets/mine.png'),
      gemImage: require('@/assets/gem.png'),
    };
  },
  mounted() {
    this.generateBoard();
  },
  methods: {
    startGame() {
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
        return; // se o jogo terminou, não faça nada
      }
      cell.revealed = true;
      if (cell.hasMine) {
        this.gameEnded = true;
        this.win = false;
      } else {
        this.currentWinnings += this.bet / (5 * 5 - this.mines);
      }
    },
    cashOut() {
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
/* Estilização do container principal */

body {
  background-color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: "Arial", sans-serif;
}

.container {
  display: flex;
  width: 80%;
}

.betting-area {
  flex: 1; /* ocupa todo o espaço disponível */
  margin-right: 30px; /* dá um espaço entre a área de aposta e o tabuleiro */
}

.board {
  display: flex;
  flex-wrap: wrap;
  width: 1000px; /* largura do tabuleiro */
}

.cell {
  width: 140px; /* 700px/5 */
  height: 140px; /* 700px/5 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fff;
  cursor: pointer;
  background-color: #34495e;
  transition: background-color 0.3s ease;
}

.cell:hover {
  background-color: #5d8aa8;
}

.cell img {
  width: 70%; /* 70% do tamanho do botão */
}
.icon {
    width: 70%; /* Ajuste para 70% do tamanho do botão */
    max-width: 100px; /* ou o tamanho máximo que você deseja para a imagem */
}
/* Estilização para os inputs e labels */
label {
  margin-right: 10px;
  color: white;
}

input[type="number"] {
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Estilização dos botões */
button {
  width: 140px; /* 700px / 5 */
  height: 140px; /* 700px / 5 */
  margin: 3px; /* Espaçamento entre os botões */
  border: none; /* Remove as bordas padrão */
  outline: none; /* Remove o contorno ao focar */
  cursor: pointer; /* Cursor de mão ao passar o mouse */
}

button:hover {
  background-color: #ddd;
}

/* Estilização dos botões do tabuleiro */
button[disabled] {
  cursor: not-allowed;
}

button[disabled]:hover {
  background-color: inherit;
}

/* Definindo cores para os botões de células reveladas e não reveladas */
button:not([disabled]) {
  background-color: #ecf0f1; /* Cor de fundo dos botões ativos */
}

button[disabled] {
  background-color: #95a5a6; /* Cor de fundo dos botões desativados */
}

button.mine {
  background-color: #e74c3c; /* Cor de fundo dos botões que têm uma mina quando o jogo termina */
}
</style>
