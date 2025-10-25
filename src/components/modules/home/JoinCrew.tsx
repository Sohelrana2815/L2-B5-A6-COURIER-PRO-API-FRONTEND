import deliveryMan from "../../../assets/images/delivery-man.webp";
import { Button } from "@/components/ui/button";

export default function JoinCrew() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${deliveryMan})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Scrollable Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Join Our
              <span className="block text-amber-400">Delivery Crew</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed mb-8">
              Be part of the fastest growing delivery network. Earn competitive
              rates, enjoy flexible hours, and deliver happiness to customers
              every day.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-amber-400 text-3xl mb-3">💰</div>
              <h3 className="text-white font-semibold mb-2">Great Earnings</h3>
              <p className="text-gray-300 text-sm">
                Competitive pay rates and bonus opportunities
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-amber-400 text-3xl mb-3">⏰</div>
              <h3 className="text-white font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-300 text-sm">
                Work when you want, set your own schedule
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-amber-400 text-3xl mb-3">🚀</div>
              <h3 className="text-white font-semibold mb-2">
                Growth Opportunities
              </h3>
              <p className="text-gray-300 text-sm">
                Advance your career with our training programs
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-primary rounded-none hover:bg-amber-600 text-white px-8 py-3 font-semibold text-lg transition-all duration-300 hover:scale-105">
              Apply Now
            </Button>

            <Button
              variant="outline"
              className="border-white hover:bg-white rounded-none hover:text-foreground px-8 py-3  font-semibold text-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Section for Scroll Effect */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-gray-900 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Ready to Start Your Journey?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-white font-semibold mb-2">
                  Easy Application
                </h3>
                <p className="text-gray-300">Apply online in minutes</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-white font-semibold mb-2">
                  Quick Approval
                </h3>
                <p className="text-gray-300">Get approved within 24 hours</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🚴</div>
                <h3 className="text-white font-semibold mb-2">
                  Start Delivering
                </h3>
                <p className="text-gray-300">Begin earning immediately</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">💎</div>
                <h3 className="text-white font-semibold mb-2">
                  Build Your Future
                </h3>
                <p className="text-gray-300">Grow with our platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
