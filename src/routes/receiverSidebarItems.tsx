import DeliveryHistory from "@/pages/Receiver/DeliveryHistory";
import IncomingParcels from "@/pages/Receiver/IncomingParcels";
import ReceiverProfile from "@/pages/Receiver/ReceiverProfile";

export const receiverSidebarItems = [
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
