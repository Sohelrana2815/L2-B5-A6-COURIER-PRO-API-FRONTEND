import CreatedParcels from "@/pages/Sender/CreatedParcels";
import CreateParcel from "@/pages/Sender/CreateParcel";
import type { ISidebarItems } from "@/types";

export const senderSidebarItems: ISidebarItems[] = [
  {
    title: "Sender Dashboard",
    items: [
      {
        title: "Create Parcel",
        url: "/sender/create-parcel",
        component: CreateParcel,
      },
    ],
  },
  {
    title: "Parcel Management",
    items: [
      {
        title: "All Created Parcels",
        url: "/sender/created-parcels",
        component: CreatedParcels,
      },
    ],
  },
];
