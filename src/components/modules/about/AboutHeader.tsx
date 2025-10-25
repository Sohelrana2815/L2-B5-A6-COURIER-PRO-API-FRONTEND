import deliveryMan2 from "../../../assets/images/delivery-man2.png";

export default function AboutHeader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 light:bg-gradient-to-r from-amber-500/20 to-orange-500/20 dark:bg-card" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500"
                >
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                  <path d="m3.3 7 8.7 5 8.7-5" />
                  <path d="M12 22V12" />
                </svg>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
                  About Us
                </h1>
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We're passionate about connecting people through reliable
                delivery services. Our mission is to provide fast, secure, and
                affordable delivery solutions that make life easier for
                businesses and customers alike.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    50+
                  </div>
                  <div className="text-gray-600">Delivery Partners</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500 mb-2">
                    24/7
                  </div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={deliveryMan2}
                  alt="Delivery Professional"
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-500 rounded-full opacity-20"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      {/* About Content Section */}
      <div className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Founded with a vision to revolutionize local delivery
                  services, we've grown from a small startup to a trusted
                  delivery partner for businesses across the region. Our
                  commitment to reliability, speed, and customer satisfaction
                  has made us the preferred choice for thousands of customers.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We understand that every delivery matters, whether it's a
                  small package or a large shipment. That's why we invest in our
                  people, technology, and processes to ensure every delivery
                  reaches its destination safely and on time.
                </p>
              </div>
              <div className="light:bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-lg dark:bg-muted">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Fast and reliable delivery
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Real-time tracking
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Professional delivery partners
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground  italic">
                "To be the most trusted and efficient delivery service,
                connecting businesses with their customers through innovation,
                reliability, and exceptional service."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
