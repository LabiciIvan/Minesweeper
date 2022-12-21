import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/start.css"

const Start = () => {

    const PATTERN = /^\d+$/;
    const [bombAmount, setBombAmount] = useState(undefined);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    

    const handleInput = e => {

        let result = PATTERN.test(e.value)
        
        result === false ? setError('Please insert a number') : setError('');
        result !== false ? setBombAmount(e.value) : setBombAmount(undefined);
    }

    const handleButton = () => {
        
        if(bombAmount === undefined) {
            console.log('empty', bombAmount);
            return;
        }

        navigate('/game-start', {state: {bomb: bombAmount}});
    }



    return ( 
        <div className='start-section'>

            <input  className='start-input'  maxLength={2} onChange={e => handleInput(e.target)}/>
            <strong className='error'> { error } </strong>
            <button className='start-btn' onClick={() => handleButton()}>Start</button>

        </div>
     );
}
 
export default Start;