/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetParcelsQuery,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  usePickupParcelMutation,
  useInTransitParcelMutation,
  useDeliverParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ParcelData {
  _id: string;
  trackingId: string;
  currentStatus?: string;
  senderId?: { name?: string };
  receiverId?: { name?: string };
  receiverInfo?: { city?: string };
  fee?: number;
  isBlocked?: boolean;
}

export default function AllParcels() {
  const { data: allParcels = [], isLoading } = useGetParcelsQuery(undefined);

  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [pickupParcel] = usePickupParcelMutation();
  const [inTransitParcel] = useInTransitParcelMutation();
  const [deliverParcel] = useDeliverParcelMutation();
  // Track loading state per parcel
  const [loadingParcels, setLoadingParcels] = useState<Set<string>>(new Set());

  const handleBlockToggle = async (parcelId: string, isBlocked: boolean) => {
    try {
      setLoadingParcels((prev) => new Set([...prev, parcelId]));

      if (isBlocked) {
        const res = await unblockParcel(parcelId).unwrap();
        toast.success(res?.message ?? "Parcel unblocked successfully!");
      } else {
        const res = await blockParcel(parcelId).unwrap();
        toast.success(res?.message ?? "Parcel blocked successfully!");
      }
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to update parcel status";
      toast.error(message);
    } finally {
      setLoadingParcels((prev) => {
        const newSet = new Set(prev);
        newSet.delete(parcelId);
        return newSet;
      });
    }
  };

  const handlePickupParcel = async (parcelId: string) => {
    await pickupParcel(parcelId).unwrap();
  };
  const handleInTransitParcel = async (parcelId: string) => {
    await inTransitParcel(parcelId).unwrap();
  };

  const handleDeliverParcel = async (parcelId: string) => {
    await deliverParcel(parcelId).unwrap();
  };

  if (isLoading) return <p>Loading parcels…</p>;
  if (!allParcels.length) return <p>No parcels found.</p>;

  return (
    <div className="w-full">
      <Table>
        <TableCaption>All parcels (admin)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tracking ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="text-right">Fee</TableHead>
            <TableHead className="text-center">Blocked</TableHead>
            <TableHead className="text-center">Block / Unblock</TableHead>
            <TableHead className="text-center">Status Actions</TableHead>
            <TableHead>View Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allParcels.map((p: ParcelData) => (
            <TableRow key={p._id}>
              <TableCell>{p.trackingId}</TableCell>
              <TableCell>{p.currentStatus ?? "—"}</TableCell>
              <TableCell>{p.senderId?.name ?? "—"}</TableCell>
              <TableCell>{p.receiverId?.name ?? "—"}</TableCell>
              <TableCell>{p.receiverInfo?.city ?? "—"}</TableCell>
              <TableCell className="text-right">
                {typeof p.fee === "number" ? p.fee.toFixed(2) : "—"}
              </TableCell>

              {/* isBlocked displayed as boolean */}
              <TableCell className="text-center">
                {p.isBlocked ? "Yes" : "No"}
              </TableCell>

              {/* Block / Unblock button */}
              <TableCell className="text-center">
                <Button
                  size="sm"
                  type="button"
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    loadingParcels.has(p._id)
                      ? "bg-gray-100 cursor-not-allowed opacity-50"
                      : p.isBlocked
                      ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                      : "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                  }`}
                  onClick={() => {
                    if (loadingParcels.has(p._id)) return;

                    const action = p.isBlocked ? "unblock" : "block";
                    const confirmMessage = `Are you sure you want to ${action} this parcel (${p.trackingId})?`;

                    if (window.confirm(confirmMessage)) {
                      handleBlockToggle(p._id, p.isBlocked || false);
                    }
                  }}
                  disabled={loadingParcels.has(p._id)}
                  aria-label={p.isBlocked ? "Unblock parcel" : "Block parcel"}
                >
                  {loadingParcels.has(p._id)
                    ? "Loading..."
                    : p.isBlocked
                    ? "Unblock"
                    : "Block"}
                </Button>
              </TableCell>

              <TableCell className="text-center">
                <div className="inline-flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handlePickupParcel(p._id)}
                    disabled={
                      p.currentStatus === "PICKED_UP" ||
                      p.currentStatus === "IN_TRANSIT" ||
                      p.currentStatus === "DELIVERED" ||
                      p.currentStatus === "CANCELLED" ||
                      p.currentStatus === "RETURNED" ||
                      p.currentStatus === "ON_HOLD" ||
                      p.currentStatus === "REQUESTED"
                    }
                    type="button"
                    className="px-2 py-1 rounded border text-sm cursor-pointer"
                  >
                    Picked up
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleInTransitParcel(p._id)}
                    disabled={
                      p.currentStatus === "IN_TRANSIT" ||
                      p.currentStatus === "DELIVERED" ||
                      p.currentStatus === "CANCELLED" ||
                      p.currentStatus === "RETURNED" ||
                      p.currentStatus === "ON_HOLD" ||
                      p.currentStatus === "REQUESTED" ||
                      p.currentStatus === "APPROVED"
                    }
                    type="button"
                    className="px-2 py-1 rounded border text-sm cursor-pointer"
                  >
                    In transit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleDeliverParcel(p._id)}
                    disabled={p.currentStatus !== "IN_TRANSIT"}
                    className="px-2 py-1 rounded border text-sm"
                  >
                    Delivered
                  </Button>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <EyeIcon className="relative left-5" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
