import { Swiper, SwiperSlide } from "swiper/react";
import { Star, Quote } from "lucide-react";

// Import basic Swiper styles
import "swiper/swiper.css";

import rider1 from "../../../assets/images/rider1.png";
import rider2 from "../../../assets/images/rider2.png";
import rider3 from "../../../assets/images/rider3.png";
import rider4 from "../../../assets/images/rider4.png";

interface TestimonialData {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  location: string;
}

// Simple fake testimonial data
const testimonials: TestimonialData[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    avatar: rider1,
    rating: 5,
    comment:
      "Amazing delivery service! The riders are always professional and the packages arrive on time.",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    avatar: rider2,
    rating: 5,
    comment:
      "As a business owner, reliable delivery is crucial. This service has never let me down.",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Online Shopper",
    avatar: rider3,
    rating: 5,
    comment:
      "I love how easy it is to track my packages in real-time. Great service!",
    location: "Miami, FL",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "E-commerce Seller",
    avatar: rider4,
    rating: 5,
    comment: "Outstanding delivery network! My customers are always satisfied.",
    location: "Chicago, IL",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function Testimonial() {
  return (
    <div className="py-16 bg-[#263238]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Customers Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say.
          </p>
        </div>

        {/* Testimonials Carousel - Hidden below 400px */}
        <div className="hidden md:block">
          <div className="max-w-4xl mx-auto">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-muted rounded-lg shadow-md p-6 h-64 flex flex-col">
                    <div className="flex-shrink-0 mb-3">
                      <Quote className="w-6 h-6 text-amber-500" />
                    </div>

                    <div className="flex-shrink-0 mb-3">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    <p className="text-muted-foreground mb-4 italic flex-grow">
                      "{testimonial.comment}"
                    </p>

                    <div className="flex-shrink-0 flex items-center gap-3 mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-sm text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
