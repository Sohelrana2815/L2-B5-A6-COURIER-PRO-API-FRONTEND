import { useState } from "react";
import {
  useCancelParcelMutation,
  useMyCreatedParcelsQuery,
} from "@/redux/features/parcel/parcel.api";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Parcel } from "@/types/parcel.type";
import { Button } from "@/components/ui/button";
import ParcelDetailsModal from "@/components/ParcelDetailsModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function CreatedParcels() {
  const { data: parcelData, isLoading } = useMyCreatedParcelsQuery(undefined);
  const [cancelParcel, { isLoading: isCanceling }] = useCancelParcelMutation();
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parcelToCancel, setParcelToCancel] = useState<string | null>(null);
  const [cancelNote, setCancelNote] = useState("");

  const handleViewDetails = (parcelId: string) => {
    setSelectedParcelId(parcelId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcelId(null);
  };

  const handleCancelClick = (parcelId: string) => {
    setParcelToCancel(parcelId);
    setCancelNote(""); // Reset note when opening dialog
  };

  const handleConfirmCancel = async () => {
    if (!parcelToCancel) return;

    // Validate note is provided
    if (!cancelNote.trim()) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    try {
      await cancelParcel({
        parcelId: parcelToCancel,
        note: cancelNote,
      }).unwrap();

      // Debug: Log the actual response
      // console.log("Cancel API response:", result);

      // Show success toast - simplified logic
      toast.success("Parcel canceled successfully!");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Cancel error:", error);
      toast.error(error?.data?.message || "Failed to cancel parcel");
    } finally {
      setParcelToCancel(null);
      setCancelNote("");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (!parcelData || parcelData.length === 0)
    return <div>No parcels found</div>;

  return (
    <div className="space-y-4">
      <h2>My Created Parcels: {parcelData.length}</h2>
      {parcelData.map((p: Parcel) => {
        const createdAt = p.createdAt
          ? new Date(p.createdAt).toLocaleString("en-US", {
              timeZone: "Asia/Dhaka",
            })
          : "-";
        return (
          <Card key={p._id}>
            <CardHeader>
              <CardTitle>Tracking ID: {p.trackingId ?? "—"}</CardTitle>
              <CardDescription>
                Current Status: {p.currentStatus ?? "—"}
              </CardDescription>
              <CardAction>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleViewDetails(p._id)}
                >
                  View Details
                </Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <p>Receiver Name: {p.receiverInfo?.name ?? "—"}</p>
              <p>Receiver City: {p.receiverInfo?.city ?? "—"}</p>
              <p>Fee: {p.fee ?? "—"}</p>
              <p>Created At: {createdAt}</p>
              <p>Weight Kg: {p.parcelDetails?.weightKg ?? "—"}</p>
            </CardContent>

            <CardFooter>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleCancelClick(p._id)}
                disabled={
                  p.currentStatus === "cancelled" ||
                  p.currentStatus === "delivered"
                }
              >
                Cancel Parcel
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      <ParcelDetailsModal
        parcelId={selectedParcelId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={!!parcelToCancel}
        onOpenChange={(open) => {
          if (!open) {
            setParcelToCancel(null);
            setCancelNote("");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Parcel</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please provide a reason for
              canceling this parcel.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-2 py-4">
            <Label htmlFor="cancel-note">Cancellation Reason *</Label>
            <Textarea
              id="cancel-note"
              placeholder="e.g., I don't want to send this parcel, I changed my mind"
              value={cancelNote}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCancelNote(e.target.value)
              }
              rows={4}
              className="resize-none"
            />
            {cancelNote.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {cancelNote.length} characters
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCancelNote("")}>
              No, Keep It
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={isCanceling || !cancelNote.trim()}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCanceling ? "Canceling..." : "Yes, Cancel Parcel"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
