import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role, type TRole } from "@/constants/role";
import { receiverSidebarItems } from "./receiverSidebarItems";
import CreateParcel from "@/pages/Sender/CreateParcel";
import { TrackParcel } from "@/pages/public/TrackParcel";

const router = createBrowserRouter([
  // Common layout
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: withAuth(About),
      },
      {
        path: "track-parcel",
        Component: TrackParcel,
      },
      {
        path: "track-parcel/:trackingId",
        Component: TrackParcel,
      },
    ],
  },
  // Admin layout
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  // Sender layout
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/created-parcels" /> },
      ...generateRoutes(senderSidebarItems),
      // Hidden route - not in sidebar, accessed via "Send Parcel" button
      { path: "create-parcel", Component: CreateParcel },
    ],
  },
  // Receiver layout
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/incoming-parcels" /> },
      ...generateRoutes(receiverSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },

  {
    Component: Register,
    path: "/register",
  },

  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);

export default router;
