import {React, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { squaresData } from '../assets/Data';

import Square from "./Square"
import "../css/minesweeper.css"


const Minesweeper = () => {

   const navigate = useNavigate();
   const location = useLocation();
   
   const [bombs, setBombs] = useState(undefined);
   const [squares, setSquares] = useState([...squaresData]);
   const [isGameOver, setIsGameOver] = useState(false);

   useEffect(() => {
      console.log(location.state);
      location.state === null ? navigate('/') : setBombs(location.state.bomb);  
      location.state === null ? navigate('/') : assignBombToSquare();  
   });

   const createSquares = () => {

      return squares.map(square => {
        return  < Square key={square.id} id={square.id} bomb={square.bomb} around={square.around} onClick={(e) => handleChildSquare(e)} />
      })
   }

   const handleChildSquare = (e) => {
      console.log(isGameOver);
      // If game is over then return
      if (isGameOver === true) { console.log('Game over'); return; }

      // Square with bomb then setIsGameOver to true
      if (squares[e.id].bomb === true) { console.log('Game over'); setIsGameOver(true)}
      
      // Square without bomb then reveal board
      if (squares[e.id].bomb === false) { 


         console.log('continue'); 
      }
   }

   const assignBombToSquare = () => {

    let countBomb = 0;
    let squaresBomb = [];

    //  Generate random bombs all distinctive.
    while (countBomb < bombs) {

      let duplicate = false;

      let random = Math.floor(Math.random() * 100) + 1;

      squaresBomb.forEach(bomb => { if (bomb === random) {duplicate = true} });

      if (duplicate !== true) { squaresBomb.push(random); ++countBomb; }
    }

    //  Assign generate bombs to squares
    let cloneSquares = [...squares];
    if (cloneSquares[0].id === undefined) { console.log('it is undefined') };
    squaresBomb.forEach( idBomb => {

      if (cloneSquares[idBomb].id === idBomb) {
         
         cloneSquares[idBomb].bomb = true;
      }
    });

    calculateBombsAround();
   }

   const calculateBombsAround = () => {

      let cloneSquares = [...squares];

      console.log(cloneSquares);

      for (let i = 0; i < cloneSquares.length; ++i) {

         // Square is on left side of map
         if (i % 10 === 0 ) {

         }
         if (i >= 10 && i < 20) {

            let bombAround = 0;
            console.log(cloneSquares[i - 10]);
            cloneSquares[i]


            // Check top-left
            if (cloneSquares[i - 11].bomb === true) { ++bombAround}

            // Check top
            if (cloneSquares[i - 10].bomb === true) { ++bombAround}

            // Check top-right
            if (cloneSquares[i - 11].bomb === true) { ++bombAround}

            // Check right
            if (cloneSquares[i + 1].bomb === true) { ++bombAround}

            // Check bottom-right
            if (cloneSquares[i + 11].bomb === true) { ++bombAround}

            // Check bottom
            if (cloneSquares[i + 10].bomb === true) { ++bombAround}

            // Check bottom-left
            if (cloneSquares[i + 9 ].bomb === true) { ++bombAround}

            // Check left
            if (cloneSquares[i - 1].bomb === true) { ++bombAround}

      

            // Check right
            if (cloneSquares[i + 1].bomb === true) { ++bombAround}
         }
      }
   }

    return ( 

      <div className='minesweeper-wrapper'>
         <div className='minesweeper-section'>
            {createSquares()}
        </div>
      </div>
     );
}
 
export default Minesweeper;