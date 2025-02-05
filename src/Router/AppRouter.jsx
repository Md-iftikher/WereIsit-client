import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";

import ErrorPage from "../Pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes ";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomePage from "../Pages/HomePage";
import AddLostItem from "../Pages/AddLostItem";
import AllItems from "../Pages/AllItems";
import ItemsDetails from "../Pages/ItemsDetails";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/", element: <HomePage /> },
       
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/lost-and-found-items", element: <AllItems /> },
        {
          path: '/add-lost-item',
          element: (
            <PrivateRoutes>
              <AddLostItem/>
            </PrivateRoutes>
          ),
        },
        {
          path: '/itemDetails/:id',
          element: (
            <PrivateRoutes>
              <ItemsDetails></ItemsDetails>
            </PrivateRoutes>
          ),
        },

      ],
    },

    { path: "*", element: <ErrorPage></ErrorPage> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
