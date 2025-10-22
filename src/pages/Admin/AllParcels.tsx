import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetParcelsQuery } from "@/redux/features/parcel/parcel.api";
import { EyeIcon } from "lucide-react";

interface ParcelData {
  _id: string;
  trackingId: string;
  currentStatus?: string;
  senderId?: { name?: string };
  receiverId?: { name?: string };
  receiverInfo?: { city?: string };
  fee?: number;
}

export default function AllParcels() {
  const { data: allParcels = [], isLoading } = useGetParcelsQuery(undefined);

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
            <TableHead className="text-center">Actions</TableHead>
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
              <TableCell className="text-center">
                <div className="inline-flex gap-2">
                  <button
                    type="button"
                    className="px-2 py-1 rounded border text-sm"
                  >
                    Picked up
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 rounded border text-sm"
                  >
                    In transit
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 rounded border text-sm"
                  >
                    Delivered
                  </button>
                </div>
              </TableCell>
              <TableCell>
                <div className="">
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
