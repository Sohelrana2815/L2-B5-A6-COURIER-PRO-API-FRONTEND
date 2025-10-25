import type { ISidebarItems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items
      .filter((route) => route.url !== "/") // Exclude only the root path
      .map((route) => ({
        path: route.url,
        Component: route.component,
      }))
  );
};
