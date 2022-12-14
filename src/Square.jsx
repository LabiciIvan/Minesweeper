import React from 'react';

const Square = (props) => {
    return ( 
        <button className={'square ' + props.id} onClick={props.onClick}  id={props.id}>
            {/* {props.id} */}
        </button>
     );
}
 
export default Square;