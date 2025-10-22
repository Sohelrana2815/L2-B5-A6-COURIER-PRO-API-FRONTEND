import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDeliveryHistoryQuery } from "@/redux/features/parcel/parcel.api";
import {
  Package,
  Truck,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import { useState } from "react";

interface StatusHistoryItem {
  status: string;
  timestamp: string;
  updatedBy: {
    id: string;
    displayName: string;
    role: string;
  };
  note: string;
}

interface DeliveryHistoryItem {
  trackingId: string;
  currentStatus: string;
  senderName: string;
  parcelType: string;
  fee: number;
  lastUpdatedAt: string;
  statusHistory: StatusHistoryItem[];
}

export default function DeliveryHistory() {
  const { data, isLoading, isError } = useDeliveryHistoryQuery(undefined);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const parcelsDeliveryHistoryData = data?.data || [];
  const totalDeliveries = data?.meta?.total || 0;

  // Format date to relative time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  // Format detailed date
  const formatDetailedDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return "default"; // Green badge
      case "IN_TRANSIT":
        return "secondary"; // Blue badge
      case "PICKED_UP":
        return "outline"; // Gray badge
      case "CANCELLED":
        return "destructive"; // Red badge
      case "RETURNED":
        return "outline"; // Gray badge with different styling
      case "REQUESTED":
        return "outline"; // Gray badge
      case "APPROVED":
        return "secondary"; // Blue badge
      case "ON_HOLD":
        return "outline"; // Gray badge
      default:
        return "outline";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
      case "DELIVERED":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "IN_TRANSIT":
        return <Truck className="h-4 w-4 text-blue-600" />;
      case "PICKED_UP":
        return <Package className="h-4 w-4 text-purple-600" />;
      case "CANCELLED":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "RETURNED":
        return <Package className="h-4 w-4 text-orange-600" />;
      case "REQUESTED":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "APPROVED":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "ON_HOLD":
        return <AlertCircle className="h-4 w-4 text-amber-600" />;
      default:
        return <MapPin className="h-4 w-4 text-gray-600" />;
    }
  };

  // Get role badge variant
  const getRoleVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "sender":
        return "default";
      case "receiver":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Toggle card expansion
  const toggleCardExpansion = (trackingId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(trackingId)) {
      newExpanded.delete(trackingId);
    } else {
      newExpanded.add(trackingId);
    }
    setExpandedCards(newExpanded);
  };

  // Status Timeline Component
  const StatusTimeline = ({
    statusHistory,
  }: {
    statusHistory: StatusHistoryItem[];
  }) => {
    // Sort by timestamp (newest first for display)
    const sortedHistory = [...statusHistory].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <MapPin className="h-4 w-4" />
          Status Timeline
        </div>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedHistory.map((item, index) => (
            <div key={index} className="flex gap-3 p-3 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">
                    {item.status.replace("_", " ")}
                  </span>
                  <Badge
                    variant={getRoleVariant(item.updatedBy.role)}
                    className="text-xs"
                  >
                    {item.updatedBy.role}
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  {formatDetailedDate(item.timestamp)} • by{" "}
                  {item.updatedBy.displayName}
                </p>
                {item.note && (
                  <p className="text-xs text-primary bg-primary/5 p-2 rounded border-l-2 border-blue-200">
                    "{item.note}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Delivery History
          </h1>
          <p className="text-gray-600">Track your received parcels</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Delivery History
          </h1>
          <p className="text-gray-600">Track your received parcels</p>
        </div>

        <Alert variant="destructive" className="max-w-md mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load delivery history. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Delivery History
        </h1>
        <p className="text-gray-600">
          {totalDeliveries > 0
            ? `You've received ${totalDeliveries} parcel${
                totalDeliveries !== 1 ? "s" : ""
              }`
            : "No deliveries yet"}
        </p>
      </div>

      {/* Empty State */}
      {parcelsDeliveryHistoryData.length === 0 ? (
        <Card className="max-w-md mx-auto text-center py-12">
          <CardContent>
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <CardTitle className="mb-2">No Delivery History</CardTitle>
            <CardDescription>
              You haven't received any parcels yet. Your delivery history will
              appear here once you start receiving packages.
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        /* Delivery History Grid */
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {parcelsDeliveryHistoryData.map((item: DeliveryHistoryItem) => (
            <Card
              key={item.trackingId}
              className="w-full hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg font-semibold">
                      {item.trackingId}
                    </CardTitle>
                  </div>
                  <Badge variant={getStatusVariant(item.currentStatus)}>
                    {item.currentStatus.replace("_", " ")}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {item.statusHistory.length > 0
                    ? `Last updated ${formatDate(item.lastUpdatedAt)}`
                    : `Delivered ${formatDate(item.lastUpdatedAt)}`}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">From</p>
                      <p className="text-sm text-gray-600">{item.senderName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Type</p>
                      <p className="text-sm text-gray-600">{item.parcelType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Delivery Fee
                      </p>
                      <p className="text-sm text-gray-600">${item.fee}</p>
                    </div>
                  </div>
                </div>

                {/* Status Timeline */}
                {item.statusHistory.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <MapPin className="h-4 w-4" />
                        Status Timeline ({item.statusHistory.length} updates)
                      </div>
                      <button
                        onClick={() => toggleCardExpansion(item.trackingId)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {expandedCards.has(item.trackingId) ? "Hide" : "Show"}{" "}
                        Details
                      </button>
                    </div>

                    {expandedCards.has(item.trackingId) && (
                      <StatusTimeline statusHistory={item.statusHistory} />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
