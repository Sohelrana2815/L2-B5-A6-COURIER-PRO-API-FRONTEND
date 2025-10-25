import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import banner from "../../../assets/images/banner.jpg";

export default function Banner() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center py-8 px-4 md:px-6 lg:px-8 ">
        <div className="w-full flex items-center justify-center gap-2 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-box-icon lucide-box w-8 h-8 text-orange-500"
          >
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
          <h4 className="text-xl font-medium text-foreground">
            Delivery
          </h4>
        </div>

        {/* Main div */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full">
          {/* Text part */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Reliable service every time
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Nullam ac aliquam purus. Donec tempor, metus sed porttitor
              posuere, elit sapien rutrum elit, eget tincidunt nisl tortor nec
              metus. Donec tempor rhoncus convallis.
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-sm items-center gap-2 mx-auto lg:mx-0">
              <Input
                type="text"
                placeholder="Enter Tracking ID"
                className="flex-1"
              />
              <Button
                type="submit"
                variant="outline"
                disabled
                className="bg-primary cursor-pointer hover:bg-primary/90 w-full sm:w-auto"
              >
                Go
              </Button>
            </div>
          </div>

          {/* Image part */}
          <div className="flex-1 max-w-lg lg:max-w-none">
            <img
              src={banner}
              alt="Courier Service Banner"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
