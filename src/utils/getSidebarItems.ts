import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { receiverSidebarItems } from "@/routes/receiverSidebarItems";
import { senderSidebarItems } from "@/routes/senderSidebarItems";

export const getSidebarItems = (userRole: string) => {
  switch (userRole) {
    case "ADMIN":
      return [...adminSidebarItems];
    case "SENDER":
      return [...senderSidebarItems];
    case "RECEIVER":
      return [...receiverSidebarItems];
    default:
      return [];
  }
};
