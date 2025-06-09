"use strict";

const GameBoard = (() => {
  const rows = 3;
  const cols = 3;

  let board = Array(rows * cols).fill("");

  function getBoard() {
    return board;
  }

  function setMark(index, playerMark) {
    if (board[index] === "") board[index] = playerMark;
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

GameBoard.setMark(4, "X");
console.log(GameBoard.getBoard());
GameBoard.resetBoard();
console.log(GameBoard.getBoard());
