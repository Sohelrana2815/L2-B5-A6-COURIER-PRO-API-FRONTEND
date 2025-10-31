import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { role } from "@/constants/role";
import Logo from "@/components/icons/Logo";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC", active: true },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/track-parcel", label: "Track Parcel", role: "PUBLIC" },
  { href: "/contact", label: "Contact Us", role: "PUBLIC" },
  { href: "/admin", label: "Admin Dashboard", role: role.admin },
  { href: "/sender", label: "Sender Dashboard", role: role.sender },
  { href: "/receiver", label: "Receiver Dashboard", role: role.receiver },
];

export default function Navbar() {
  const { data, isLoading: userLoading } = useUserInfoQuery(undefined);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  // Function to filter navigation links based on user role
  const getFilteredNavLinks = () => {
    if (!data?.data?.role) {
      // If no user data, show only public links
      return navigationLinks.filter((link) => link.role === "PUBLIC");
    }

    return navigationLinks.filter(
      (link) => link.role === "PUBLIC" || link.role === data.data.role
    );
  };

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      // Force refetch to ensure UI updates with latest data
      dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (userLoading)
    return (
      <div className="flex items-center justify-center mt-10 gap-4">
        <p>Loading</p>
        <Truck className="text-primary text-lg" />
      </div>
    );

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {getFilteredNavLinks().map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        href={link.href}
                        className="py-1.5"
                        active={link.active}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-primary hover:text-primary/90 flex items-center gap-2"
            >
              <Logo />{" "}
              <h2 className="text-xs md:text-base font-serif">Courier Pro</h2>
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {getFilteredNavLinks().map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <Button
              variant="outline"
              size="sm"
              className="text-sm cursor-pointer"
              type="button"
              onClick={handleLogout}
              disabled={isLoading}
            >
              {isLoading ? "Logging out..." : "Logout"}
            </Button>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="text-sm">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="text-sm">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
