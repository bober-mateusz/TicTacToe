let turn = 0;
let winner = "";
let freeze = false;

const clickedSpaces = new Set();
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function handleButton() {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("win"); // remove the win class
    item.classList.remove("draw");
  });
  clickedSpaces.clear();
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turn = 0;
  freeze = false;
  document.getElementById("result").innerHTML = "";
}

function handleClick(event) {
  if (freeze == false) {
    const clickedElement = event.target;
    const decider = turn % 2;
    const rowColumn = event.target.id;
    const row = rowColumn[0];
    const column = rowColumn[1];

    //Logic
    if (!clickedSpaces.has(clickedElement)) {
      clickedElement.innerHTML = decider === 0 ? "O" : "X";
      gameBoard[row][column] = decider === 0 ? "O" : "X";
      turn++;
      clickedSpaces.add(clickedElement);
    }
    //Check state
    if (checkboardState(gameBoard)) {
      let status = "Game over! Winner is " + winner;
      document.getElementById("result").innerHTML = status;
      freeze = true;
    }
    //Draw board for draw
    if(turn == 9){
      let status = "Game over! It is a draw";
      document.getElementById("result").innerHTML = status;
      const items = document.querySelectorAll(".item");
      items.forEach((item) => {
      item.classList.add("draw"); // remove the win class
    });
    }
  }
}

function checkboardState(gameBoard) {
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      const thisItem = gameBoard[row][column];

      if (thisItem === "X" || thisItem === "O") {
        if (checkRow(gameBoard[row],row)) {
          return true;
        } else if (checkColumn(gameBoard, column)) {
          return true;
        } else if (checkDiagonal(gameBoard)) {
          return true;
        }
      }
    }
  }
}

function checkRow(row, rowNum) {
  if (row[0] === row[1] && row[1] === row[2]) {
    winner = row[0];
    document.getElementById(`${rowNum}0`).classList.add("win");
    document.getElementById(`${rowNum}1`).classList.add("win");
    document.getElementById(`${rowNum}2`).classList.add("win");
    return true;
  } else {
    return false;
  }
}

function checkColumn(gameBoard, column) {
  if (
    gameBoard[0][column] === gameBoard[1][column] &&
    gameBoard[1][column] === gameBoard[2][column]
  ) {
    winner = gameBoard[0][column];
    document.getElementById(`0${column}`).classList.add("win");
    document.getElementById(`1${column}`).classList.add("win");
    document.getElementById(`2${column}`).classList.add("win");
    return true;
  } else {
    return false;
  }
}

function checkDiagonal(gameBoard) {
  if (
    (gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2] &&
      gameBoard[0][0] !== "") ||
    (gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0] &&
      gameBoard[0][2] !== "")
  ) {
    winner = gameBoard[1][1];
    if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
      document.getElementById(`00`).classList.add("win");
      document.getElementById(`11`).classList.add("win");
      document.getElementById(`22`).classList.add("win");
    } else {
      document.getElementById(`02`).classList.add("win");
      document.getElementById(`11`).classList.add("win");
      document.getElementById(`20`).classList.add("win");
    }
    return true;
  } else {
    return false;
  }
}
