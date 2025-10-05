import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import App, { queryClient } from "../App";
import CheckAuthStatus from "../components/auth/AuthLoader";

export const routes = createBrowserRouter([
  {
    path: "/",
    loader: () => CheckAuthStatus(queryClient),
    shouldRevalidate: true,
    Component: App,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
