export default {
  data() {
    return {
      wallet: 1000.0,
      bet: 0,
      mines: 2,
      board: [],
      gameStarted: false,
      gameEnded: false,
      win: false,
      currentWinnings: 0.0,
      mineImage: require("@/assets/mine.png"),
      gemImage: require("@/assets/gem.png"),
      multiplier: 1.100,
      drawer: false,
      
      
    };
  },

  mounted() {
    this.resetBoard();  // Reseta o tabuleiro ao padrão ao carregar a página
  },

  methods: {
    startGame(bet, mines) {
      if (bet > this.wallet || bet < 1 || bet > 500) {
        alert("Valor de aposta inválido.");
        return;
      }

      if (mines < 2 || mines > 24) {
        alert("Quantidade de minas inválida.");
        return;
      }

      this.bet = bet;
      this.mines = mines;
      this.wallet -= bet;
      this.gameStarted = true;
      this.multiplier = 1 + (mines - 2) * 0.05;  // Ajuste o multiplicador inicial com base na quantidade de minas
      this.generateBoard();  // Gera um novo tabuleiro ao iniciar o jogo
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

    resetBoard() {
      // Define o tabuleiro padrão com todas as células ocultas e sem minas
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
    },

    revealCell(cell) {
      if (!this.gameStarted || this.gameEnded) {  // Verifica se o jogo foi iniciado
        return;
      }
      cell.revealed = true;
      if (cell.hasMine) {
        this.gameEnded = true;
        this.win = false;
        this.currentWinnings = 0;
      } else {
        this.multiplier += 0.01;  // Aumente o multiplicador a cada gema encontrada
        this.currentWinnings = this.bet * this.multiplier;
        const revealedCells = this.board.flat().filter(c => c.revealed && !c.hasMine);
        if (revealedCells.length === (5 * 5) - this.mines) {  // Todas as gemas foram reveladas
          this.wallet += this.currentWinnings;
          this.gameEnded = true;
          this.win = true;
        }
      }
    },

    cashOut() {
      if (!this.gameStarted || this.gameEnded) {
        return;
      }
      this.wallet += this.currentWinnings;
      this.gameEnded = true;
      this.win = true;
    },

    resetGame() {
      this.gameStarted = false;
      this.gameEnded = false;
      this.win = false;
      this.currentWinnings = 0;
      this.multiplier = 1.100;
      this.resetBoard();  // Reseta o tabuleiro ao padrão ao clicar em "Jogar novamente"
    },
  },
};
