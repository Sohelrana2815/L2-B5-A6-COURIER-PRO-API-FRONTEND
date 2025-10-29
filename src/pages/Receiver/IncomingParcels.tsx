/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  useApproveParcelMutation,
  useDeclineParcelMutation,
  useIncomingParcelsQuery,
} from "@/redux/features/parcel/parcel.api";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

/* shadcn dialog / textarea imports — adjust paths if your project uses different paths */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check } from "lucide-react";
import { MdCancel } from "react-icons/md";

interface Parcel {
  _id: string;
  trackingId: string;
  currentStatus: string;
  description: string;
  fee: number;
  parcelType: string;
  senderName: string;
  weightKg: number;
  createdAt: string;
}

const IncomingParcels = () => {
  const { data: incomingParcels, isLoading } =
    useIncomingParcelsQuery(undefined);

  const [approveParcel] = useApproveParcelMutation();
  const [declineParcel] = useDeclineParcelMutation();

  // per-row loading states
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [decliningId, setDecliningId] = useState<string | null>(null);

  // dialog state for decline flow
  const [isDeclineOpen, setIsDeclineOpen] = useState<boolean>(false);
  const [selectedDeclineId, setSelectedDeclineId] = useState<string | null>(
    null
  );
  const [declineNote, setDeclineNote] = useState<string>("");

  const handleApprove = async (parcelId: string) => {
    try {
      setApprovingId(parcelId);
      const res = await approveParcel(parcelId).unwrap();
      toast.success(res?.message ?? "Parcel approved successfully!");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to approve parcel";
      toast.error(message);
    } finally {
      setApprovingId(null);
    }
  };

  // open dialog for decline (called from row button)
  const openDeclineDialog = (parcelId: string) => {
    setSelectedDeclineId(parcelId);
    setDeclineNote("");
    setIsDeclineOpen(true);
  };

  const handleConfirmDecline = async () => {
    // ensure a parcel is selected
    if (!selectedDeclineId) {
      toast.error("No parcel selected to decline.");
      return;
    }

    if (!declineNote.trim()) {
      toast.error("Please enter a reason for declining.");
      return;
    }

    try {
      setDecliningId(selectedDeclineId);
      // call the mutation (your API expects { parcelId, note })
      const res = await declineParcel({
        parcelId: selectedDeclineId,
        note: declineNote.trim(),
      }).unwrap();

      toast.success(res?.message ?? "Parcel declined successfully!");
      // close dialog on success
      setIsDeclineOpen(false);
      setSelectedDeclineId(null);
      setDeclineNote("");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to decline parcel";
      toast.error(message);
    } finally {
      setDecliningId(null);
    }
  };

  const handleCancelDecline = () => {
    // prevent closing if decline request is in progress for the selected parcel
    if (selectedDeclineId && decliningId === selectedDeclineId) return;
    setIsDeclineOpen(false);
    setSelectedDeclineId(null);
    setDeclineNote("");
  };

  const parcels: Parcel[] = Array.isArray(incomingParcels)
    ? incomingParcels
    : incomingParcels?.data ?? incomingParcels?.results ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">TRK ID</TableHead>
            <TableHead className="text-center">Parcel Status</TableHead>
            <TableHead className="text-center">Sender Name</TableHead>
            <TableHead className="text-center">Weight (Kg)</TableHead>
            <TableHead className="text-center">Parcel Type</TableHead>
            <TableHead className="text-center">Fee</TableHead>
            <TableHead className="text-center">Approve / Decline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8}>No parcels found</TableCell>
            </TableRow>
          ) : (
            parcels.map((p: Parcel, idx: number) => (
              <TableRow key={p._id ?? idx}>
                <TableCell className="font-medium text-center">
                  {p.trackingId}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className="text-xs">{p.currentStatus}</Badge>
                </TableCell>
                <TableCell className="text-center">{p.senderName}</TableCell>
                <TableCell className="text-center">{p.weightKg}</TableCell>
                <TableCell className="text-center">{p.parcelType}</TableCell>
                <TableCell className="text-center">
                  <span className="text-2xl"> &#2547;</span> {p.fee}
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (
                        p.currentStatus.toLowerCase().includes("approved") ||
                        p.currentStatus.toLowerCase().includes("approve")
                      ) {
                        openDeclineDialog(p._id);
                      } else {
                        handleApprove(p._id);
                      }
                    }}
                    disabled={approvingId === p._id || decliningId === p._id}
                    aria-busy={approvingId === p._id || decliningId === p._id}
                  >
                    {approvingId === p._id ? (
                      "Processing..."
                    ) : decliningId === p._id ? (
                      "Processing..."
                    ) : p.currentStatus.toLowerCase().includes("approved") ||
                      p.currentStatus.toLowerCase().includes("approve") ? (
                      <div className="flex items-center gap-x-1">
                        <p>Decline</p> <MdCancel className="text-chart-5" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-x-1">
                        <p>Approve</p> <Check className="text-chart-2" />
                      </div>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Decline modal (shadcn Dialog) */}
      <Dialog
        open={isDeclineOpen}
        onOpenChange={(open) => !decliningId && setIsDeclineOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Parcel</DialogTitle>
          </DialogHeader>

          <div className="py-2">
            <p className="text-sm mb-2">
              Please provide a reason for declining this parcel. This note will
              be sent to the sender.
            </p>

            <Textarea
              placeholder="Enter reason (required)"
              value={declineNote}
              onChange={(e) => setDeclineNote(e.target.value)}
              rows={4}
              autoFocus
              disabled={
                !!(selectedDeclineId && decliningId === selectedDeclineId)
              }
            />
          </div>

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelDecline}
              disabled={
                !!(selectedDeclineId && decliningId === selectedDeclineId)
              }
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDecline}
              disabled={
                !!(selectedDeclineId && decliningId === selectedDeclineId)
              }
            >
              {selectedDeclineId && decliningId === selectedDeclineId
                ? "Declining..."
                : "Confirm Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IncomingParcels;
