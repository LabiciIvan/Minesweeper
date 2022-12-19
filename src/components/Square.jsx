import React, { useState } from 'react';

const Square = (props) => {

    return ( 
        <button className='minesweeper-btn' id={props.id} onClick={(e) => props.onClick(e.target)}> {props.id}</button>
     );
}
 
export default Square;