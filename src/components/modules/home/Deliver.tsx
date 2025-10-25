import item1 from "../../../assets/images/burg.png";
import item2 from "../../../assets/images/box.png";
import item3 from "../../../assets/images/gro.png";
import { Button } from "@/components/ui/button";

export default function cDeliver() {
  const cards = [
    {
      img: item1,
      title: "Food And Drinks",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
      cta: "Order Now",
    },
    {
      img: item2,
      title: "Packages",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
      cta: "Order Now",
    },
    {
      img: item3,
      title: "Groceries",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
      cta: "Order Now",
    },
  ];

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            We Deliver <span className="text-primary">Everything</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {cards.map((card, index) => (
            <div key={index} className="group">
              {/* Card Container */}
              <div className="bg-card rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-muted">
                {/* Icon/Image */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-muted rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-12 h-12 md:w-14 md:h-14 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {card.title}
                </h3>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  {card.text}
                </p>

                {/* Button */}
                <Button className="w-full py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors duration-300">
                  {card.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
