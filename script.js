window.onload = createSquares;

const gameBoard = document.getElementById("gameBoard");
let arraySquares = [], arrayBombs = [];
let flags = 20;
let uncoveredLand = 0;
let stopGame = false;

function createSquares() { // Create squares for and attach them to gameBoard div
  for (let i = 0; i < 100; ++i) {
    let square = document.createElement("div");
    square.setAttribute("id", i);
    square.setAttribute("class", "noBomb");
    square.setAttribute("flag", 0);
    gameBoard.appendChild(square);
    arraySquares.push(square);
    square.addEventListener('click', function(e) { clickSquare(square); });
    square.addEventListener('contextmenu', function(e) { e.preventDefault(); placeFlag(square); })
  }
  updateFlags(flags);
  generateBombs();
} 

function updateFlags(flags) {
  document.getElementById('flags').innerHTML ="FLAGS: " + flags + " 🚩";
}

function placeFlag(square) { // place flags or remove flags.
  if (square.classList.contains('checked') || stopGame) { // not placing flags on uncovered land
    return;
  }
  if (flags > 0 && square.getAttribute('flag') == 0) {
    square.innerHTML = "🚩";
    square.setAttribute('flag', 1);
    --flags;
    updateFlags(flags);
  } else if (square.getAttribute('flag') == 1) {
    square.innerHTML = "";
    square.setAttribute('flag', 0);
    ++flags;
    updateFlags(flags);
  }
}

function randomNumber() {
  return Math.floor(Math.random() * 99) + 0;
}
 
function generateBombs() { // generate random numbers that will represent the ids o the divs that have bombs
  let idOfBomb = randomNumber();
  let bombNumber = 0;
  arrayBombs.push(idOfBomb);
  while (bombNumber < 19) {
    let contains = false;
    idOfBomb = randomNumber();
    for (let i = 0; i < arrayBombs.length; ++i) {
      if (arrayBombs[i] == idOfBomb) {
        contains = true;
      }
    }
    if (contains == false) {
      arrayBombs.push(idOfBomb);
      ++bombNumber;
    }
  }
  addBombsToSquares();
}

function addBombsToSquares() {  // adding bombs to the divs that match the random numbers
  for (let i = 0; i < arrayBombs.length; ++i) {
    let divWithBomb = arrayBombs[i];
    arraySquares[divWithBomb].setAttribute("class", "bomb")
  }
  addNumber();
}

function addNumber() { // add numbers to squares without bomb to see how many bomb are around
  for (let i = 0; i < arraySquares.length; ++i) {
    let bombAmount = 0;
    if (arraySquares[i].classList.contains('noBomb')) {
      if ((i > 0) && (i % 10 != 0) && arraySquares[i-1].classList.contains('bomb')) { // check left square
        ++bombAmount;
      }
      if ((i > 9) && (arraySquares[i - 10].classList.contains('bomb'))) { // check top square
        ++bombAmount;
      }
      if ((i < 99) && (i % 10 != 9) && (arraySquares[i + 1].classList.contains('bomb'))) { // check right square
        ++bombAmount;
      }
      if ((i < 90) && (arraySquares[i + 10].classList.contains('bomb'))) { // check bottom square
        ++bombAmount;
      }
      if ((i > 9) && (i % 10 != 9) && (arraySquares[i - 9].classList.contains('bomb'))) { // check N-E square
        ++bombAmount;
      }
      if ((i > 10) && (i % 10 != 0) && (arraySquares[i - 11].classList.contains('bomb'))) { // check N-V
        ++bombAmount;
      }
      if ((i < 90) && (i % 10 != 9) && (arraySquares[i + 11].classList.contains('bomb'))) { // check S-E
        ++bombAmount;
      }
      if ((i < 90) && (i % 10 != 0) && (arraySquares[i + 9].classList.contains('bomb'))) { // check S-V
        ++bombAmount;
      }
      arraySquares[i].setAttribute("bombAround",bombAmount);
    } else {
      arraySquares[i].setAttribute("bombAround", 0);
    }
  }
}

function detonateBomb() { //showing all squares with bomb GAME OVER
  for (let i = 0; i < arrayBombs.length; ++i) {
    let elementBomb = arrayBombs[i];
    document.getElementById(elementBomb).innerHTML ="💣";
  }
  stopGame = true;
  let message = "GAME-OVER PLAY-AGAIN";
  coverGameBoard(message);
}

function clickSquare(square) { //checking the clicked square bomb or not bomb
  if (stopGame) {
    return;
  }
  if (square.classList.contains('checked') || square.getAttribute('flag') != 0) {
    return;
  }
  if (square.classList.contains('bomb')) {
    detonateBomb();
    return;
  } else {
    let bombAround = square.getAttribute('bombAround');
    if (bombAround != 0) {
      if (bombAround == 1) {
        square.setAttribute('one', 'none');
      }
      if (bombAround == 2) {
        square.setAttribute('two','none');
      }
      if (bombAround == 3) {
        square.setAttribute('three','none');
      }
      if (bombAround == 4) {
        square.setAttribute('four','none');
      }
      square.innerHTML = bombAround;
      square.setAttribute("class","checked");
      checkWin(square);
      return;
    }
    square.setAttribute("class","checked");
    revealBoard(square)
    checkWin(square);
  }
} 

function revealBoard(square) { // reveal board that squares don't have numbers
  let idSquare = square.id;
  let idInt = parseInt(idSquare);
  if ((idInt > 0) && (idInt % 10 != 0)) {
    let idNextSquare = arraySquares[idInt - 1].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if ((idInt < 99) && (idInt % 10 != 9)) {
    let idNextSquare = arraySquares[idInt + 1].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if (idInt > 9) {
    let idNextSquare = arraySquares[idInt - 10].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if (idInt < 90) {
    let idNextSquare = arraySquares[idInt + 10].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if ((idInt > 10) && (idInt % 10 != 0)) {
    let idNextSquare = arraySquares[idInt - 11].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if ((idInt > 9) && (idInt % 10 != 9)) {
    let idNextSquare = arraySquares[idInt - 9].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if ((idInt < 90) && (idInt % 10 != 0)) {
    let idNextSquare = arraySquares[idInt + 9].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
  if ((idInt < 90) && (idInt % 10 != 9)) {
    let idNextSquare = arraySquares[idInt + 11].id;
    let nextSquare = document.getElementById(idNextSquare);
    clickSquare(nextSquare);
  }
}

function checkWin(square) { // check for win, if uncovered land is equal to 79 it means no bomb was detonated and has all squares without bomb uncovered
  console.log(square.id);
  ++uncoveredLand;
  if (uncoveredLand == 80) {
    stopGame = true;
    let message = "Winner! PLAY-AGAIN";
    coverGameBoard(message);
  }
}

function coverGameBoard(message) {
  let secondBoard = document.createElement('div');
  let playAgain = document.createElement('div');
  playAgain.setAttribute('class', 'playAgain');
  playAgain.innerHTML = message;
  playAgain.onclick = restartGame
  secondBoard.setAttribute('class','secondBoard');
  gameBoard.appendChild(secondBoard);

  gameBoard.appendChild(playAgain);
}

function restartGame() {
  window.location.reload();
}