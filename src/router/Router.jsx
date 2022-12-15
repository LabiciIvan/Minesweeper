import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Game from '../Game';
import Loading from '../Loading';


const Router = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Loading />,
        },
        {
            path: "/start",
            element: <Game />,
        },
    ]);


    return ( 
        <RouterProvider router={router} />
     );
}
 
export default Router;