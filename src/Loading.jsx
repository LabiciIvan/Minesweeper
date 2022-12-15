import React from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import "./loading.css"

const Loading = () => {

    const [bombNumber, setBombNumber] = useState('asda');
    const [error, setError] = useState(false);

    const getNumber = (e) => {

        setBombNumber(e.value);
    }

    const validateNumber = () => {

        let pattern = /^\d+$/;

        let result = pattern.test(bombNumber);

        let errorState = error;

        result !== true ? setError(true) : setError(false);

        if (result === true) { < Navigate to="/start" /> }
    }

    return ( 
        <div className='loading-game'>
            <input className='input-start' type="text" onChange={e => getNumber(e.target)}/>
            <button className='btn-start'  onClick={() => validateNumber()}>Start</button>
            <strong>{error === true ? 'Set number of bombs in game' : ''}</strong>
        </div>
     );
}
 
export default Loading;