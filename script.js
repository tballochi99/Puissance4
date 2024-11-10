class Grid {
  constructor(rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];
    this.currentPlayer = 1;
    this.score = { player1: 0, player2: 0 };

    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = [];

      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j] = new Pion();
      }
    }

    this.render();
  }

  render() {
    let divGame = document.getElementById('game');
    let round = document.getElementById('round');



    while (divGame.firstChild) {
      divGame.removeChild(divGame.firstChild);
    }

    let table = document.createElement("table");

    for (let i = 0; i < this.rows; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < this.cols; j++) {
        let td = document.createElement("td");
        tr.appendChild(td);

        if (this.grid[i][j].status == 1) {
          td.classList.add("player1");
        }
        else if (this.grid[i][j].status == 2) {
          td.classList.add("player2");
        }
        td.addEventListener("click", () => {
          if (this.currentPlayer == 1) {
            this.play(j, 1);
            this.currentPlayer = 2;
          }
          else if (this.currentPlayer == 2) {
            this.play(j, 2);
            this.currentPlayer = 1;
          }

          // ROUND

          let text = document.createElement("p");
          text.classList.add("text")
          if (this.currentPlayer == 1) {
            text.innerHTML = "Player 1 turn";
          } else if (this.currentPlayer == 2) {
            text.innerHTML = "Player 2 turn";
          }

          if (round.firstChild) {
            round.removeChild(round.firstChild);
          }

          round.appendChild(text);
        });
      }
      table.appendChild(tr);
    }

    divGame.appendChild(table);

    // SCORE

    let score = document.createElement("div");
    score.classList.add("score");
    score.innerHTML = `Player 1 ➡️ ${this.score.player1}
    Player 2 ➡️ ${this.score.player2}`;
    divGame.appendChild(score);


    // RESET

    let resetBtn = document.getElementById("reset-btn");
    resetBtn.addEventListener("click", () => {
      this.reset();
    });
  }

  // JOUER

  play(col, player) {

    let row = this.rows - 1;
    while (row >= 0 && this.grid[row][col].status !== 0) {
      row--;
    }

    this.grid[row][col].status = player;

    let td = document.querySelector(`#game table tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
    td.classList.remove("player1", "player2");
    if (player == 1) {
      td.classList.add("player1");
    }
    else if (player == 2) {
      td.classList.add("player2");
    }

    this.render();

    if (this.checkWin()) {
      setTimeout(() => {
        alert("You Win🔥🔥 Congratulations✨");
      }, 50);
      if (this.currentPlayer == 1) {
        this.score.player1++;
        player1.classList.add("p1-score")
      }
      else {
        this.score.player2++;
      }
    }
    else if (this.checkNull()) {
      setTimeout(() => {
        alert("Nobody Wins :/ Try again !");
      }, 50);
    };
  }

  checkWin() {

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        if (this.grid[i][j].status != 0 &&
          this.grid[i][j].status == this.grid[i][j + 1].status &&
          this.grid[i][j].status == this.grid[i][j + 2].status &&
          this.grid[i][j].status == this.grid[i][j + 3].status) {
          return true;
        }
      }
    }

    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].status != 0 &&
          this.grid[i][j].status == this.grid[i + 1][j].status &&
          this.grid[i][j].status == this.grid[i + 2][j].status &&
          this.grid[i][j].status == this.grid[i + 3][j].status) {
          return true;
        }
      }
    }

    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = 0; j < this.cols - 3; j++) {
        if (this.grid[i][j].status != 0 &&
          this.grid[i][j].status == this.grid[i + 1][j + 1].status &&
          this.grid[i][j].status == this.grid[i + 2][j + 2].status &&
          this.grid[i][j].status == this.grid[i + 3][j + 3].status) {
          return true;
        }
      }
    }

    for (let i = 0; i < this.rows - 3; i++) {
      for (let j = this.cols - 1; j >= 3; j--) {
        if (this.grid[i][j].status != 0 &&
          this.grid[i][j].status == this.grid[i + 1][j - 1].status &&
          this.grid[i][j].status == this.grid[i + 2][j - 2].status &&
          this.grid[i][j].status == this.grid[i + 3][j - 3].status) {
          return true;
        }
      }
    }
    return false;
  }

  checkNull() {
    for (let i = 0; i < this.rows; i++) {
      if (this.grid[0][i].status == 0) {
        return false;
      }
    }
    return true;
  }

  reset() {
    this.currentPlayer = 1;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.grid[i][j].status = 0;
      }
    }
    this.render();
  }

}

class Pion {
  constructor() {
    this.status = 0;
  }
}

class Game {
  constructor(x = 6, y = 7) {
    this.grid = new Grid(x, y);
  }
}

$game = new Game();


