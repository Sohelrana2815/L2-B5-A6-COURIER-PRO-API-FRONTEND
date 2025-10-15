import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  // Common layout
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: About,
      },
    ],
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

export default router;
