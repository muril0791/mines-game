export default {
  data() {
    return {
      wallet: 1000.0,
      bet: 1,
      mines: 2,
      board: [],
      gameStarted: false,
      gameEnded: false,
      win: false,
      currentWinnings: 0.0,
      mineImage: require("@/assets/mine.png"),
      gemImage: require("@/assets/gem.png"),
      drawer: false, 
    };
  },

  mounted() {
    this.resetGame();
  },

  methods: {
    startGame(localBet, localMines) {
      if (localBet > this.wallet || localBet < 1 || localBet > 500 || !Number.isInteger(localBet)) {
        alert("Aposta inválida. Por favor, insira um valor entre 1 e 500.");
        return;
      }
      if (localMines < 2 || localMines > 24 || !Number.isInteger(localMines)) {
        alert("Número de minas inválido. Por favor, insira um valor entre 2 e 24.");
        return;
      }
      this.bet = localBet;
      this.mines = localMines;
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
        this.currentWinnings = 0;  
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
  