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

  function resetGame() {
    currentPlayer = "X";
    isGameOver = false;
    GameBoard.resetBoard();
  }

  return { playRound, currentPlayer, resetGame };
})();

const settingsBtn = document.querySelector("#settings");
const modal = document.querySelector("#settings-modal");

modal.addEventListener("click", (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

settingsBtn.addEventListener("click", () => {
  modal.showModal();
});

// window.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#settings-modal").setAttribute("open", "");
// });
