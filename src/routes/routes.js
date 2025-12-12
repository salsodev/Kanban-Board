import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

export const routes = createBrowserRouter([
  {
    path: "",
    Component: ProtectedRoute,
    children: [{ path: "", Component: App }],
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
