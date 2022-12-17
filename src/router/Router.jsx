import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from '../components/Error';
import Start from '../components/Start';

const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Start/>,
            errorElement: <Error />,
        },
        {
            path: '/game-start',
            element: <div>Start game</div>,
        },
    ])

    return ( 

        <RouterProvider router={router} />    
     );
}
 
export default Router;