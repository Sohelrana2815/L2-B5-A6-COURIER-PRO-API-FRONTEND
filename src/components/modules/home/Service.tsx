import { Button } from "@/components/ui/button";
import rider1 from "../../../assets/images/rider1.png";
import rider2 from "../../../assets/images/rider2.png";
import rider3 from "../../../assets/images/rider3.png";
import rider4 from "../../../assets/images/rider4.png";

export default function Service() {
  const services = [
    {
      img: rider1,
      title: "Swift Delivery",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: rider2,
      title: "Trusted Service",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: rider3,
      title: "Vaccinated Courier",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: rider4,
      title: "Safety Protocol",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="relative bg-[#263238]">
      {" "}
      {/* dark header background */}
      {/* decorative ellipse at the top center */}
      <div className="absolute  flex justify-center pointer-events-none"></div>
      <div className="container mx-auto px-6 md:px-12 pt-10 pb-32 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Try Us And See How Good
          <br /> Our Services Are.
        </h2>

        <div className="mt-6">
          <Button
            size="lg"
            className="  rounded-sm py-6 shadow-sm bg-amber-500 hover:bg-amber-600 text-white  "
          >
            Learn More
          </Button>
        </div>
      </div>
      {/* white area below header with service items overlapping */}
      <div className="bg-card  mt-32">
        <div className="container mx-auto px-6 md:px-12 -mt-20 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
            {services.map((s, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-4"
              >
                {/* image pulled up to overlap the dark header */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-56 h-auto object-contain -mt-16 md:-mt-20"
                  loading="lazy"
                />

                <div  className="pt-1 pb-10">
                  <h4 className="text-lg font-semibold text-foreground">
                    {s.title}
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
