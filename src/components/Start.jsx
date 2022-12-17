import React from 'react';
import { useState } from 'react';

import "../css/start.css"

const Start = () => {

    const PATTERN = /^\d+$/;
    const [bombAmount, setBombAmount] = useState('');
    const [error, setError] = useState({ error: 'Please insert a number'});

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
            <strong className='error'>{error.error}</strong>
            <button className='start-btn' onClick={() => validateBombsAmount()} >Start</button>

        </div>
     );
}
 
export default Start;