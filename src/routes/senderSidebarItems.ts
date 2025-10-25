import AllReceivers from "@/pages/Sender/AllReceivers";
import CreatedParcels from "@/pages/Sender/CreatedParcels";
import type { ISidebarItems } from "@/types";
import Home from "@/pages/Home";

export const senderSidebarItems: ISidebarItems[] = [
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
    title: "Sender Dashboard",
    items: [
      {
        title: "All Receivers",
        url: "/sender/all-receivers",
        component: AllReceivers,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "My Created Parcels",
        url: "/sender/created-parcels",
        component: CreatedParcels,
      },
    ],
  },
];
