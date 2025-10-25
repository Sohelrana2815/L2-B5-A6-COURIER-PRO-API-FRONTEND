import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";
import notFoundImg from "../assets/images/404.jpg";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            <img
              src={notFoundImg}
              alt="404 Not Found"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Oops! Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have taken a detour. Don't worry, it happens to the best of us!
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Home className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Go Home</h3>
                  <p className="text-sm text-muted-foreground">Return to our homepage</p>
                </div>
              </div>
              <Button asChild className="w-full mt-4 group-hover:scale-105 transition-transform">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home Page
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <ArrowLeft className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">Go Back</h3>
                  <p className="text-sm text-muted-foreground">Return to previous page</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 group-hover:scale-105 transition-transform hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="bg-muted/30 border-muted">
          <CardContent className="p-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Search className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Need Help?</span>
            </div>
            <p className="text-muted-foreground text-sm">
              If you believe this is an error or need assistance, please{" "}
              <Link to="/contact" className="text-primary hover:underline font-medium">
                contact our support team
              </Link>
              . We're here to help!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
