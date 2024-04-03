import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoContainer from "../views/todos/TodoContainer";
import LoginPage from "../views/login/user-login";
import SignUpPage from "../views/signup/user-signup";
import Animations from "../views/animationsPractice";
import { LayoutGridDemo } from "../views/layout-animate";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TodoContainer />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/anime",
      element: <LayoutGridDemo />,
    },
  ]);
  return <RouterProvider router={router} />;
}
