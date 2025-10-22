import { useGetParcelByIdQuery } from "@/redux/features/parcel/parcel.api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";

interface ParcelDetailsModalProps {
  parcelId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ParcelDetailsModal({
  parcelId,
  isOpen,
  onClose,
}: ParcelDetailsModalProps) {
  const {
    data: parcel,
    isLoading,
    error,
  } = useGetParcelByIdQuery(parcelId!, {
    skip: !parcelId,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "requested":
        return "bg-yellow-100 text-yellow-800";
      case "picked_up":
        return "bg-blue-100 text-blue-800";
      case "in_transit":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Parcel Details</DialogTitle>
          <DialogDescription>
            Detailed information about the parcel
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg">Loading parcel details...</div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-8">
            <div className="text-lg text-red-600">
              Error loading parcel details
            </div>
          </div>
        )}

        {parcel && (
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Parcel Information</span>
                  <Badge className={getStatusColor(parcel.currentStatus)}>
                    {parcel.currentStatus}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Tracking ID
                    </p>
                    <p className="font-mono text-sm">{parcel.trackingId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fee</p>
                    <p className="font-semibold">৳{parcel.fee}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Created At
                  </p>
                  <p className="text-sm">{formatDate(parcel.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Last Updated
                  </p>
                  <p className="text-sm">{formatDate(parcel.updatedAt)}</p>
                </div>
              </CardContent>
            </Card>

            {/* Receiver Information */}
            <Card>
              <CardHeader>
                <CardTitle>Receiver Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p>{parcel.receiverInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{parcel.receiverInfo.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p>{parcel.receiverInfo.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p>{parcel.receiverInfo.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parcel Details */}
            <Card>
              <CardHeader>
                <CardTitle>Parcel Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Type</p>
                    <p className="capitalize">{parcel.parcelDetails.type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Weight</p>
                    <p>{parcel.parcelDetails.weightKg} kg</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Description
                  </p>
                  <p>{parcel.parcelDetails.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Status History */}
            <Card>
              <CardHeader>
                <CardTitle>Status History</CardTitle>
                <CardDescription>Track the parcel's journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {parcel.statusHistory.map(
                    (
                      status: {
                        status: string;
                        timestamp: string;
                        updatedBy: {
                          name: string;
                          role: string;
                        };
                        note: string;
                      },
                      index: number
                    ) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={getStatusColor(status.status)}
                            >
                              {status.status}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatDate(status.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {status.note}
                          </p>
                          <p className="text-xs text-gray-400">
                            Updated by: {status.updatedBy.name}{" "}
                            <Badge>{status.updatedBy.role}</Badge>
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
