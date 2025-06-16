"use strict";

// GameBoard module

const GameBoard = (() => {
  const rows = 3;
  const cols = 3;

  let board = Array(rows * cols).fill("");

  function getBoard() {
    return [...board];
  }

  function setMark(index, playerMark) {
    if (board[index] !== "") return;
    board[index] = playerMark;
  }

  function resetBoard() {
    board = Array(rows * cols).fill("");
  }

  return {
    getBoard,
    setMark,
    resetBoard,
  };
})();

// GameController Module

const GameController = (() => {
  let currentPlayer = "X";
  let isGameOver = false;

  let player1 = "Player-1";
  let player2 = "Player-2";

  function switchPlayers() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function playRound(index) {
    if (isGameOver || GameBoard.getBoard()[index] !== "") return;

    GameBoard.setMark(index, currentPlayer);

    if (checkWinner()) {
      isGameOver = true;
      console.log(`${currentPlayer} is the Winner!`);
      return;
    }

    if (checkDraw()) {
      isGameOver = true;
      console.log(`It's a draw!`);
      return;
    }

    switchPlayers();
  }

  function checkWinner() {
    const board = GameBoard.getBoard();

    const winningCombinations = [
      // Horizontal
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  }

  function checkDraw() {
    const board = GameBoard.getBoard();

    if (checkWinner()) return false;

    for (const cell of board) {
      if (cell === "") {
        return false;
      }
    }
    return true;
  }

  function changePlayerNames(name1, name2) {
    player1 = name1 || "Player-1";
    player2 = name2 || "Player-2";
  }

  function resetGame() {
    currentPlayer = "X";
    isGameOver = false;
    GameBoard.resetBoard();
  }

  return { playRound, currentPlayer, changePlayerNames, resetGame };
})();

// DisplayController Module

const DisplayController = (() => {
  const cells = document.querySelectorAll(".cells");
  const GameStatus = document.querySelector(".game-logs p");
  const settingsBtn = document.querySelector("#settings");
  const restartBtn = document.querySelector(".restart-btn");
  const settingsModal = document.querySelector("#settings-modal");
  const settingsForm = document.querySelector("#settings-form");
  const nameInputs = document.querySelectorAll(".name-input");
  const submitBtn = document.querySelector(".submit-btn");

  function renderBoard() {
    const board = GameBoard.getBoard();

    cells.forEach((cell, index) => {
      cell.textContent = board[index];
      cell.classList.toggle("X-mark", board[index] === "X");
      cell.classList.toggle("O-mark", board[index] === "O");
    });
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      GameController.playRound(index);
      renderBoard();
      updateLogMessage();
    });
  });

  function updateLogMessage() {
    const currentPlayerName =
      GameController.currentPlayer === "X"
        ? GameController.player1
        : GameController.player2;

    if (GameBoard.checkWinner()) {
      GameStatus.textContent = `${currentPlayerName} Wins!`;
      return;
    }
    if (GameBoard.checkDraw()) {
      GameStatus.textContent = `It's a Tie!`;
      return;
    }

    GameStatus.textContent = `${currentPlayerName}'s Turn`;
  }
})();
