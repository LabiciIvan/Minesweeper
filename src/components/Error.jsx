import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {

    const error = useRouteError();

    return ( 
        <div className='error-section'>
            <h4 className='message-description'>
                404 NOT FOUND
            </h4>
        </div>
     );
}
 
export default Error;