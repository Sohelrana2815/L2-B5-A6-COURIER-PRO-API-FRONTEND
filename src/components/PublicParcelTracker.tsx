import { useState } from "react";
import { useTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock, Package, MapPin, Calendar, Copy, Share2 } from "lucide-react";

interface PublicParcelTrackerProps {
  trackingId: string;
}

export default function PublicParcelTracker({ trackingId }: PublicParcelTrackerProps) {
  const [copied, setCopied] = useState(false);
  const {
    data: parcel,
    isLoading,
    error,
  } = useTrackParcelQuery(trackingId);

  const copyTrackingLink = async () => {
    const trackingUrl = `${window.location.origin}/track-parcel/${trackingId}`;
    try {
      await navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "requested":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "on_hold":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "picked_up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_transit":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "in_transit":
      case "picked_up":
        return <Package className="h-4 w-4" />;
      case "on_hold":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="flex justify-center items-center py-12">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Loading parcel information...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to find parcel with tracking ID: <strong>{trackingId}</strong>
            <br />
            Please check your tracking ID and try again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No parcel found with the provided tracking ID.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Track Your Parcel</h1>
        <p className="text-gray-600">Tracking ID: <span className="font-mono font-semibold">{parcel.trackingId}</span></p>
      </div>

      {/* Current Status */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              {getStatusIcon(parcel.currentStatus)}
              Current Status
            </span>
            <Badge className={getStatusColor(parcel.currentStatus)}>
              {parcel.currentStatus.replace('_', ' ').toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Parcel Type</p>
              <p className="font-semibold capitalize">{parcel.parcelType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Destination</p>
              <p className="font-semibold flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {parcel.destinationCity}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p className="font-semibold flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(parcel.createdAt)}
              </p>
            </div>
          </div>

          {parcel.isBlocked && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This parcel is currently blocked and may experience delays.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Share & Copy Section */}
      <Card className=" border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-600" />
            Share Tracking Link
          </CardTitle>
          <CardDescription>
            Share this link with others to let them track your parcel's progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="flex-1 p-3   rounded-md border border-gray-200 font-mono text-sm text-gray-700">
              {`${window.location.origin}/track-parcel/${trackingId}`}
            </div>
            <Button
              onClick={copyTrackingLink}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking Timeline</CardTitle>
          <CardDescription>Follow your parcel's journey from start to finish</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {parcel.statusLogs.map((log: { status: string; timestamp: string; updatedBy: string; note: string }, index: number) => (
              <div key={index} className="flex items-start space-x-4 relative">
                {/* Timeline line */}
                {index < parcel.statusLogs.length - 1 && (
                  <div className="absolute left-6 top-10 w-0.5 h-8 "></div>
                )}

                {/* Status dot */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  getStatusColor(log.status).replace('bg-', 'border-').replace('100', '200')
                }`}>
                  {getStatusIcon(log.status)}
                </div>

                {/* Status content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className={getStatusColor(log.status)}>
                      {log.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm text-gray-500 font-medium">
                      {formatDate(log.timestamp)}
                    </span>
                  </div>

                  {log.note && (
                    <p className="text-sm text-gray-600 mb-2">{log.note}</p>
                  )}

                  <p className="text-xs text-gray-400">
                    Updated by: {log.updatedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer message */}
      <Card className=" border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center text-blue-800">
            <p className="font-medium">Need help with your parcel?</p>
            <p className="text-sm mt-1">Contact our customer service team for assistance.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
