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
      console.log(e);
   }

   const assignBombToSquare = () => {

   
    let countBomb = 0;
    let squaresBomb = [];

    console.log(bombs);
   //  Generate random bombs all distinctive.
    while (countBomb < bombs) {

      let duplicate = false;

      let random = Math.floor(Math.random() * 100) + 1;

      squaresBomb.forEach(bomb => { if (bomb === random) {duplicate = true} });

      if (duplicate !== true) { squaresBomb.push(random); ++countBomb; }
    }
    console.log(squaresBomb);
   }


    return ( 
        <div className='minesweeper-section'>
         {createSquares()}
        </div>
     );
}
 
export default Minesweeper;