import DeliveryHistory from "@/pages/Receiver/DeliveryHistory";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import ReceiverProfile from "@/pages/Receiver/ReceiverProfile";
import Home from "@/pages/Home";
import type { ISidebarItems } from "@/types";

export const receiverSidebarItems: ISidebarItems[] = [
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
    title: "Receiver Dashboard",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver/incoming-parcels",
        component: IncomingParcels,
      },
      {
        title: "Delivery history",
        url: "/receiver/delivery-history",
        component: DeliveryHistory,
      },
    ],
  },
  {
    title: "Profile Management",
    items: [
      {
        title: "Receiver Profile",
        url: "/receiver/profile",
        component: ReceiverProfile,
      },
    ],
  },
];
