/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ParcelDetailsModal from "@/components/ParcelDetailsModal";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetParcelsQuery,
  useBlockParcelMutation,
  useUnblockParcelMutation,
  usePickupParcelMutation,
  useInTransitParcelMutation,
  useDeliverParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import { ArrowLeft, ArrowRight, EyeIcon, Truck } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParcelData {
  _id: string;
  trackingId: string;
  currentStatus?: string;
  senderDetails?: { name?: string };
  receiverDetails?: { name?: string };
  receiverInfo?: { city?: string };
  fee?: number;
  isBlocked?: boolean;
}

export default function AllParcels() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // default limit
  const [search, setSearch] = useState<string>(""); // search state
  const [searchInput, setSearchInput] = useState<string>(""); // search input state

  // Fetch parcels with page, limit, and search
  const {
    data: parcelsResponse,
    isLoading,
    isFetching,
  } = useGetParcelsQuery({ search: search || undefined, page, limit });

  // Mutation hooks
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [pickupParcel] = usePickupParcelMutation();
  const [inTransitParcel] = useInTransitParcelMutation();
  const [deliverParcel] = useDeliverParcelMutation();

  // Extract data and pagination info from response
  const allParcels: ParcelData[] = parcelsResponse?.data ?? [];
  const meta = parcelsResponse?.meta ?? {
    total: 0,
    page,
    limit,
    totalPages: 0,
  };

  // Ensure totalPages is sensible even if backend omits it
  const total = meta.total ?? 0;
  const totalPages = meta.totalPages ?? Math.max(1, Math.ceil(total / limit));

  // Track loading state per parcel
  const [loadingParcels, setLoadingParcels] = useState<Set<string>>(new Set());

  // Modal state management
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Keep search input in sync with search state
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Action handlers (block/unblock/pickup/in-transit/deliver)
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
    try {
      setLoadingParcels((prev) => new Set([...prev, parcelId]));
      const res = await pickupParcel(parcelId).unwrap();
      toast.success(res?.message ?? "Parcel picked up successfully!");
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

  const handleInTransitParcel = async (parcelId: string) => {
    try {
      setLoadingParcels((prev) => new Set([...prev, parcelId]));
      const res = await inTransitParcel(parcelId).unwrap();
      toast.success(res?.message ?? "Parcel status updated to in-transit!");
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

  const handleDeliverParcel = async (parcelId: string) => {
    try {
      setLoadingParcels((prev) => new Set([...prev, parcelId]));
      const res = await deliverParcel(parcelId).unwrap();
      toast.success(res?.message ?? "Parcel delivered successfully!");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to deliver parcel";
      toast.error(message);
    } finally {
      setLoadingParcels((prev) => {
        const newSet = new Set(prev);
        newSet.delete(parcelId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (parcelId: string) => {
    setSelectedParcelId(parcelId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParcelId(null);
  };

  // Search handler - reset to page 1 when searching
  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setPage(1); // Reset to first page when searching
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchInput);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  // Pagination controls
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset to first page when limit changes
  };

  if (isLoading)
    return (
      <div className="flex items-center gap-4 justify-center">
        <p>Loading analytics...</p>
        <Truck className="text-xl text-primary" />
      </div>
    );
  if (!allParcels.length)
    return (
      <div>
        <p>No parcels found.</p>
        {search && (
          <p className="mt-2 text-sm text-gray-600">
            No parcels match your search for "{search}". Try adjusting your
            search terms or{" "}
            <button
              onClick={handleClearSearch}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              clear the search
            </button>
            .
          </p>
        )}
      </div>
    );

  return (
    <div className="w-full">
      {/* Top pagination controls */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Search parcel */}

        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-sm items-center gap-2"
        >
          <Input
            type="text"
            placeholder="Search by most field"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
          {search && (
            <Button type="button" variant="outline" onClick={handleClearSearch}>
              Clear
            </Button>
          )}
        </form>
      </div>

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

        <ParcelDetailsModal
          parcelId={selectedParcelId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isAdmin={true}
        />

        <TableBody>
          {allParcels.map((p: ParcelData) => (
            <TableRow key={p._id}>
              <TableCell>{p.trackingId}</TableCell>
              <TableCell>{p.currentStatus ?? "—"}</TableCell>
              <TableCell>{p.senderDetails?.name ?? "—"}</TableCell>
              <TableCell>{p.receiverDetails?.name ?? "—"}</TableCell>
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
                  {/* Picked up */}
                  <Button
                    size="sm"
                    onClick={() => handlePickupParcel(p._id)}
                    disabled={
                      loadingParcels.has(p._id) ||
                      p.currentStatus !== "APPROVED"
                    }
                    type="button"
                    className="px-2 py-1 rounded border text-sm cursor-pointer"
                  >
                    {loadingParcels.has(p._id) ? "Loading..." : "Picked up"}
                  </Button>
                  {/* In transit */}
                  <Button
                    size="sm"
                    onClick={() => handleInTransitParcel(p._id)}
                    disabled={
                      loadingParcels.has(p._id) ||
                      p.currentStatus !== "PICKED_UP"
                    }
                    type="button"
                    className="px-2 py-1 rounded border text-sm cursor-pointer"
                  >
                    {loadingParcels.has(p._id) ? "Loading..." : "In transit"}
                  </Button>
                  {/* Delivered */}
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleDeliverParcel(p._id)}
                    disabled={
                      loadingParcels.has(p._id) ||
                      p.currentStatus !== "IN_TRANSIT"
                    }
                    className="px-2 py-1 rounded border text-sm"
                  >
                    {loadingParcels.has(p._id) ? "Loading..." : "Delivered"}
                  </Button>
                </div>
              </TableCell>

              <TableCell>
                <Button
                  size="sm"
                  className="relative left-5"
                  onClick={() => handleViewDetails(p._id)}
                >
                  <EyeIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Bottom pagination controls */}
      <div className="flex items-center gap-4 justify-end mr-20">
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            onClick={goPrev}
            disabled={page <= 1 || isFetching}
            className="rounded-xs"
          >
            <ArrowLeft /> Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            onClick={goNext}
            disabled={page >= totalPages || isFetching}
            className="rounded-xs"
          >
            Next <ArrowRight />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Label>Rows per page:</Label>
          <Select
            value={limit.toString()}
            onValueChange={(value) => handleLimitChange(Number(value))}
          >
            <SelectTrigger className="w-[90px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
