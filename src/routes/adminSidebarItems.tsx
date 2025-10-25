import AllParcels from "@/pages/Admin/AllParcels";
import AllUsers from "@/pages/Admin/AllUsers";
// import Analytics from "@/pages/Admin/Analytics";
import type { ISidebarItems } from "@/types";
import { lazy } from "react";
import Home from "@/pages/Home";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Navigation",
    items: [
      {
        title: "Home",
        url: "/",
        component: Home,
      },
    ],
  },
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
      {
        title: "Parcel Overview",
        url: "/admin/parcel-overview",
        component: lazy(() => import("@/pages/Admin/ParcelOverview")),
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "All Parcels",
        url: "/admin/all-parcels",
        component: AllParcels,
      },
    ],
  },
];
