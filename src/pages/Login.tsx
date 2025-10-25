import LoginForm from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router";
import loginImg from "/src/assets/images/login.webp";

export default function Login() {
  return (
    <div className="min-h-screen bg-card">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden bg-card">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-foreground px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome Back to <span className="text-primary">Courier Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sign in to your account and continue your delivery journey
          </p>
        </div>
      </div>

      {/* Login Form and Image Section */}
      <div className="py-8 md:py-16 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Login Form */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-4">
                  Sign In to Your Account
                </h2>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Access your dashboard and manage your courier operations efficiently.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl">
                <LoginForm />
                <div className="mt-6 text-center">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      className="text-primary/80 hover:text-primary font-semibold transition-colors duration-200"
                      to="/register"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Login Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src={loginImg}
                  alt="Courier login"
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
