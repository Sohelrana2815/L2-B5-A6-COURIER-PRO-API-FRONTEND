import { Button } from "@/components/ui/button";
import callUsImg from "../../../assets/images/callUs.webp";
import { Link } from "react-router";

export default function CallUs() {
  return (
    <section className="bg-card">
      <div className="container mx-auto px-6 md:px-16 py-16">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="max-w-lg w-full">
              <img
                src={callUsImg}
                alt="Illustration: delivery rider on a phone screen"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight text-center md:text-left">
              Do You Want A Fast Service? Just Call Us.
            </h3>

            <p className="mt-4 max-w-xl text-sm md:text-base text-center md:text-left mx-auto md:mx-0 text-muted-foreground">
              Need to send a parcel urgently or have a question that needs
              immediate attention? Our dedicated team is always ready to assist
              you. Pick up the phone, and let us provide you with the fastest
              possible solutions for all your delivery needs. Your satisfaction
              is our priority, and quick support is just a call away.
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link to="/contact">
                <Button className="px-6 py-3 rounded-md shadow-sm bg-amber-500 hover:bg-amber-600 text-white">
                  Call Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
