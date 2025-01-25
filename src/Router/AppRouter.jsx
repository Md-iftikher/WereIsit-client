import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home";

import ErrorPage from "../Pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes ";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomePage from "../Pages/HomePage";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "/", element: <HomePage /> },
       
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },

    { path: "*", element: <ErrorPage></ErrorPage> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
