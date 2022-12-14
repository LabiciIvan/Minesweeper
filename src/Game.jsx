import React, { useState } from 'react';

import Square from './Square';

import { squaresData } from './assets/Data';

function Game() {

  const [squares, setSquares] = useState(squaresData);

  const [game, setGame] = useState({
    start: true,
    bombs: 5,
    end: false,

  });

  const initialiseGame = () => {

    return squaresData.map(data => {

      return <Square id={data.id} key={data.id} onClick={(e) => handleSquare(e.target)} />
    })
  }

  const handleSquare = e => {

    e.disabled = true;

    squares.forEach(square => {
      if (square.id === parseInt(e.id)) {
        e.className = 'square-disabled';
      }});

    squares.forEach(square => {
      if (square.id === parseInt(e.id) && square.bomb === true) {
        let gameCopy = game;
            gameCopy.end = true;

            setGame(gameCopy);
        
      }});

      console.log(game);
  }

  const startGame = () => {

    let bombs = generateBombs(game.bombs);
  }

  const generateBombs = (bombNumber) => {

    let countBomb = 0;
    let bombs = [];

    // Generate random bombs all distinctive.
    while (countBomb < bombNumber) {

      let duplicate = false;

      let random = Math.floor(Math.random() * 100) + 1;

      bombs.forEach(bomb => { if (bomb === random) {duplicate = true} });

      if (duplicate !== true) { bombs.push(random); ++countBomb; }
    }
    console.log(bombs);

    // Sort the bomb array ascending.
    bombs.sort((a, b) => { return a - b});

    // Clone the state.
    let squareClone = [...squares]

    // Iterate bombs[] and attach to each squareClone that square.id === squareWIthBomb
    bombs.forEach(squareWithBomb => {
      
      squareClone.forEach(square => {
      
        if(square.id ===  squareWithBomb) {
          square.bomb = true;
        }

      });
    });

    console.log(squares);

    return bombs;
  }

  const attachBombs = () => {

  }

  return (
    <div className="Minesweeper">
      { game.start ? initialiseGame() : ''}
      { game.start ? startGame() : ''}
    </div>
  )
}

export default Game
