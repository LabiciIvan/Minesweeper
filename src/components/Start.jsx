import React from 'react';
import { useState } from 'react';

import "../css/start.css"

const Start = () => {

    const PATTERN = /^\d+$/;
    const [bombAmount, setBombAmount] = useState('');

    const handleInput = e => {
       
        setBombAmount(e.value);
    }
    
    const validateBombsAmount = () => {

        
        let result = PATTERN.test(bombAmount);
        console.log(result);
    }


    return ( 
        <div className='start-section'>

            <input  className='start-input'  maxLength={2} onChange={e => handleInput(e.target)}/>
            <button className='start-btn' onClick={() => validateBombsAmount()} >Start</button>

        </div>
     );
}
 
export default Start;