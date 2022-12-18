import React from 'react';
import { useState } from 'react';

import "../css/start.css"

const Start = () => {

    const PATTERN = /^\d+$/;
    const [bombAmount, setBombAmount] = useState();
    const [error, setError] = useState({ error: 'Please insert a number', active: false});

    const handleInput = e => {

        let result = PATTERN.test(e.value);

        console.log(result);
        
        if (result === false ) {

            error.active = true;
            setError(error)

        } else {
            error.active = false;
            setBombAmount(e.value);
            setError(error);
        }
    }


    return ( 
        <div className='start-section'>

            <input  className='start-input'  maxLength={2} onChange={e => handleInput(e.target)}/>
            <strong className='error'>{error.active === true ? error.error : ''}</strong>
            <button className='start-btn'>Start</button>

        </div>
     );
}
 
export default Start;