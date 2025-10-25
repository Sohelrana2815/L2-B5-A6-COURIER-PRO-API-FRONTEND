import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import { Link } from "react-router";
import signupImg from "/src/assets/images/signup.webp";

export default function Register() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-card">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Join <span className="text-primary">Courier Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create your account and start your delivery journey with us today
          </p>
        </div>
      </div>

      {/* Registration Form and Image Section */}
      <div className="py-8 md:py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Registration Form */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-4">
                  Create Your Account
                </h2>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Sign up to access our comprehensive courier services and
                  manage your deliveries efficiently.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
                <RegisterForm />
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      className="text-primary/80 hover:text-primary font-semibold transition-colors duration-200"
                      to="/login"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src={signupImg}
                  alt="Courier registration"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
