import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Error from '../components/Error';
import Minesweeper from '../components/Minesweeper';
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
            element: <Minesweeper />,
        },
    ])

    return ( 

        <RouterProvider router={router} />    
     );
}
 
export default Router;