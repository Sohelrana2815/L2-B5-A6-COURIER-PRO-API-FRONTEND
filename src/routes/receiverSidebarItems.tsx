import IncomingParcels from "@/pages/Receiver/IncomingParcels";

export const receiverSidebarItems = [
  {
    title: "Receiver Dashboard",
    items: [
      {
        title: "Incoming Parcels",
        url: "/receiver/incoming-parcels",
        component: IncomingParcels,
      },
    ],
  },
];
