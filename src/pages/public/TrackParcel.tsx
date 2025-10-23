import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, Package } from "lucide-react";
import PublicParcelTracker from "@/components/PublicParcelTracker";

export function TrackParcel() {
  const { trackingId: urlTrackingId } = useParams<{ trackingId: string }>();
  const [trackingId, setTrackingId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Initialize with URL parameter if available
  useEffect(() => {
    if (urlTrackingId) {
      setTrackingId(urlTrackingId);
      setIsSubmitted(true);
    }
  }, [urlTrackingId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    if (trackingId.trim().length < 5) {
      setError("Tracking ID must be at least 5 characters long");
      return;
    }

    // Clear any previous errors
    setError("");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setTrackingId("");
    setIsSubmitted(false);
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingId(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  // Show parcel tracker if submitted with valid tracking ID
  if (isSubmitted && trackingId.trim()) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto py-8">
          {/* Back button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleReset}
              className="mb-4"
            >
              ← Back to Search
            </Button>
          </div>

          {/* Parcel tracker component */}
          <PublicParcelTracker trackingId={trackingId.trim()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16  rounded-full flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Track Your Parcel</CardTitle>
          <CardDescription>
            Enter your tracking ID below or use a direct link like /track-parcel/TRK-20251021-864051
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="trackingId">Tracking ID</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="trackingId"
                  type="text"
                  placeholder="TRK-20251021-864051"
                  value={trackingId}
                  onChange={handleInputChange}
                  className="pl-10"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500">
                Tracking IDs are usually in the format: TRK-YYYYMMDD-NNNNNN
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!trackingId.trim()}
            >
              Track Parcel
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have a tracking ID?
            </p>
            <Button variant="link" className="text-blue-600 p-0 h-auto">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
