import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import AllParcels from "@/pages/Admin/AllParcels";
import AllUsers from "@/pages/Admin/AllUsers";
import Analytics from "@/pages/Admin/Analytics";
import Login from "@/pages/Login";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import Register from "@/pages/Register";
import CreatedParcels from "@/pages/Sender/CreatedParcels";
import CreateParcel from "@/pages/Sender/CreateParcel";
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
  // Admin layout
  {
    Component: DashboardLayout,
    path: "/admin",
    children: [
      {
        Component: Analytics,
        path: "analytics",
      },
      {
        Component: AllUsers,
        path: "all-users",
      },
      {
        Component: AllParcels,
        path: "all-parcels",
      },
    ],
  },
  // Sender layout
  {
    Component: DashboardLayout,
    path: "/sender",
    children: [
      {
        Component: CreateParcel,
        path: "create-parcel",
      },
      {
        Component: CreatedParcels,
        path: "created-parcels",
      },
    ],
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
