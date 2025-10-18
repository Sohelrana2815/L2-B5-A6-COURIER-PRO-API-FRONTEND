import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";

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
  // Admin layout
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [...generateRoutes(adminSidebarItems)],
  },
  // Sender layout
  {
    Component: DashboardLayout,
    path: "/sender",
    children: [...generateRoutes(senderSidebarItems)],
  },
  // Receiver layout
  {
    Component: DashboardLayout,
    path: "/receiver",
    children: [
      {
        Component: IncomingParcels,
        path: "incoming-parcels",
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
