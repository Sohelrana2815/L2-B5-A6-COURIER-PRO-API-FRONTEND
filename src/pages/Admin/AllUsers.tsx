/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { ImBlocked } from "react-icons/im";
import { FaLockOpen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { MdRestore } from "react-icons/md";
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
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useRestoreUserMutation,
  useUnblockUserMutation,
} from "@/redux/features/parcel/parcel.api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Truck } from "lucide-react";

/* shadcn Select components */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUser {
  _id: string;
  name: string;
  isBlocked: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  accountStatus: string;
  createdAt: string;
  role: string;
  email: string;
}

function formatDate(date?: string | number) {
  if (!date) return "—";
  try {
    return new Date(date).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function AllUsers() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  // Filter states (string-backed selects):
  // blockValue: "all" | "true" | "false"
  const [blockValue, setBlockValue] = useState<string>("all");
  const [deletedValue, setDeletedValue] = useState<string>("all");
  // roleValue: "all" | "SENDER" | "RECEIVER" | "ADMIN"
  const [roleValue, setRoleValue] = useState<string>("all");
  // sortValue: "new" | "old"
  const [sortValue, setSortValue] = useState<"new" | "old">("new");

  // Convert string select values to the types expected by API call
  const selectedIsBlocked: boolean | undefined =
    blockValue === "all" ? undefined : blockValue === "true";
  const selectedIsDeleted: boolean | undefined =
    deletedValue === "all" ? undefined : deletedValue === "true";
  const selectedRole: string | undefined =
    roleValue === "all" ? undefined : roleValue;
  const selectedSort = sortValue;

  // fetch users for current page, limit & filters
  const { data, isLoading, isFetching, error } = useGetUsersQuery({
    page,
    limit,
    isBlocked: selectedIsBlocked,
    isDeleted: selectedIsDeleted,
    role: selectedRole,
    sort: selectedSort,
  });

  const users = data?.data ?? [];
  const meta = data?.meta;

  // mutations
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [restoreUser] = useRestoreUserMutation();

  // Loading states for specific actions
  const [loadingBlock, setLoadingBlock] = useState<Set<string>>(new Set());
  const [loadingUnblock, setLoadingUnblock] = useState<Set<string>>(new Set());
  const [loadingDelete, setLoadingDelete] = useState<Set<string>>(new Set());
  const [loadingRestore, setLoadingRestore] = useState<Set<string>>(new Set());

  // Modal states
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  // block user - with modal confirmation
  const openBlockModal = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setBlockModalOpen(true);
  };

  const handleConfirmBlock = async () => {
    if (!selectedUserId) return;

    try {
      setLoadingBlock((prev) => new Set([...prev, selectedUserId]));
      const res = await blockUser(selectedUserId).unwrap();
      toast.success(res?.message ?? "User blocked successfully!");
      setBlockModalOpen(false);
      setSelectedUserId(null);
      setSelectedUserName("");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to block user";
      toast.error(message);
    } finally {
      setLoadingBlock((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedUserId as string);
        return newSet;
      });
    }
  };

  // unblock user - no confirmation needed
  const handleUnblockUser = async (userId: string) => {
    try {
      setLoadingUnblock((prev) => new Set([...prev, userId]));
      const res = await unblockUser(userId).unwrap();
      toast.success(res?.message ?? "User unblocked successfully!");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to unblock user";
      toast.error(message);
    } finally {
      setLoadingUnblock((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  // delete user - with modal confirmation
  const openDeleteModal = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      setLoadingDelete((prev) => new Set([...prev, selectedUserId]));
      const res = await deleteUser(selectedUserId).unwrap();
      toast.success(res?.message ?? "User deleted successfully!");
      setDeleteModalOpen(false);
      setSelectedUserId(null);
      setSelectedUserName("");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to delete user";
      toast.error(message);
    } finally {
      setLoadingDelete((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedUserId as string);
        return newSet;
      });
    }
  };

  // restore user - no confirmation needed
  const handleRestoreUser = async (userId: string) => {
    try {
      setLoadingRestore((prev) => new Set([...prev, userId]));
      const res = await restoreUser(userId).unwrap();
      toast.success(res?.message ?? "User restored successfully!");
    } catch (err: any) {
      const message =
        err?.data?.message ?? err?.message ?? "Failed to restore user";
      toast.error(message);
    } finally {
      setLoadingRestore((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  // Handle prev/next page
  const handlePrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };
  const handleNext = () => {
    setPage((p) => (meta ? Math.min(meta.totalPages, p + 1) : p + 1));
  };

  // clamp page if server says fewer pages after changing limit or data changes
  useEffect(() => {
    if (meta && page > meta.totalPages) {
      setPage(meta.totalPages || 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta?.totalPages]);

  // When limit changes, reset page
  const handleLimitChange = (value: string) => {
    const newLimit = Number(value) || 10;
    setLimit(newLimit);
    setPage(1);
  };

  // Filter change handlers (reset to page 1)
  const handleBlockChange = (val: string) => {
    setBlockValue(val);
    setPage(1);
  };
  const handleDeletedChange = (val: string) => {
    setDeletedValue(val);
    setPage(1);
  };
  const handleRoleChange = (val: string) => {
    setRoleValue(val);
    setPage(1);
  };
  const handleSortChange = (val: "new" | "old") => {
    setSortValue(val);
    setPage(1);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-muted-foreground flex items-center gap-4">
          <p>Loading analytics...</p>
          <Truck className="text-xl text-primary" />
        </div>
      </div>
    );
  if (error) return <p>Failed to load users.</p>;

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="text-center text-xl">
          {isFetching ? "Refreshing..." : `Total users: ${meta?.total ?? "-"}`}
        </div>

        {/* Filters area */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Block status */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Blocked</label>
            <Select defaultValue={blockValue} onValueChange={handleBlockChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Blocked</SelectItem>
                <SelectItem value="false">Unblocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deleted status */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Deleted</label>
            <Select
              defaultValue={deletedValue}
              onValueChange={handleDeletedChange}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="true">Deleted</SelectItem>
                <SelectItem value="false">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Role */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Role</label>
            <Select defaultValue={roleValue} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="SENDER">SENDER</SelectItem>
                <SelectItem value="RECEIVER">RECEIVER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Sort</label>
            <Select
              defaultValue={sortValue}
              onValueChange={(v) => handleSortChange(v as "new" | "old")}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="old">Old</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Table>
        <TableCaption>A list of all users.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Display Name</TableHead>
            <TableHead className="text-center">Is Deleted</TableHead>
            <TableHead className="text-center">Account Status</TableHead>
            <TableHead className="text-center">User since</TableHead>
            <TableHead className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <ImBlocked />
                <p>Block</p>
              </div>
            </TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Is Verified</TableHead>
            <TableHead className="text-center">Block User</TableHead>
            <TableHead className="text-center">Unblock User</TableHead>
            <TableHead className="text-center">Delete User</TableHead>
            <TableHead className="text-center">Restore User</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-6">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: IUser) => {
              const id = user._id;
              const displayName = user.name || user.email.split("@")[0] || "—";
              const isDeleted = Boolean(user.isDeleted);
              const accountStatus = user.accountStatus || "—";
              const createdAt = formatDate(user.createdAt);
              const isBlocked = Boolean(user.isBlocked);
              const role = user.role || "user";
              const isVerified = Boolean(user.isVerified);

              return (
                <TableRow key={id}>
                  <TableCell className="font-medium text-center">
                    {displayName}
                  </TableCell>
                  <TableCell className="text-center">
                    {isDeleted ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="text-center">{accountStatus}</TableCell>
                  <TableCell className="text-center">{createdAt}</TableCell>
                  <TableCell className="text-center">
                    {isBlocked ? "Blocked" : "Not blocked"}
                  </TableCell>
                  <TableCell className="text-center capitalize">
                    {role}
                  </TableCell>
                  <TableCell className="text-center">
                    {isVerified ? "Yes" : "No"}
                  </TableCell>
                  {/* BLOCK */}
                  <TableCell className="text-center cursor-pointer">
                    <Button
                      disabled={
                        user.isBlocked ||
                        loadingBlock.has(user._id) ||
                        user.role === "ADMIN"
                      }
                      size="sm"
                      onClick={() => openBlockModal(user._id, displayName)}
                      className="cursor-pointer"
                    >
                      {loadingBlock.has(user._id) ? (
                        "Loading..."
                      ) : (
                        <ImBlocked />
                      )}
                    </Button>
                  </TableCell>
                  {/* UNBLOCK */}
                  <TableCell className="text-center">
                    <Button
                      disabled={!user.isBlocked || loadingUnblock.has(user._id)}
                      onClick={() => handleUnblockUser(user._id)}
                      size="sm"
                      className="cursor-pointer"
                    >
                      {loadingUnblock.has(user._id) ? (
                        "Loading..."
                      ) : (
                        <FaLockOpen />
                      )}
                    </Button>
                  </TableCell>
                  {/* DELETE */}
                  <TableCell className="text-center">
                    <Button
                      disabled={
                        user.isDeleted ||
                        loadingDelete.has(user._id) ||
                        user.role === "ADMIN"
                      }
                      onClick={() => openDeleteModal(user._id, displayName)}
                      size="sm"
                      className="cursor-pointer"
                    >
                      {loadingDelete.has(user._id) ? (
                        "Loading..."
                      ) : (
                        <FaTrashCan />
                      )}
                    </Button>
                  </TableCell>
                  {/* RESTORE*/}
                  <TableCell className="text-center">
                    <Button
                      disabled={!user.isDeleted || loadingRestore.has(user._id)}
                      onClick={() => handleRestoreUser(user._id)}
                      className="cursor-pointer"
                      size="sm"
                    >
                      {loadingRestore.has(user._id) ? (
                        "Loading..."
                      ) : (
                        <MdRestore />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Block Confirmation Modal */}
      <Dialog open={blockModalOpen} onOpenChange={setBlockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Are you sure you want to block {selectedUserName}? They will not
              be able to access their account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBlockModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmBlock}
              disabled={loadingBlock.has(selectedUserId || "")}
              className="bg-red-600 hover:bg-red-700"
            >
              {loadingBlock.has(selectedUserId || "")
                ? "Blocking..."
                : "Block User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUserName}? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              disabled={loadingDelete.has(selectedUserId || "")}
              variant="destructive"
            >
              {loadingDelete.has(selectedUserId || "")
                ? "Deleting..."
                : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination controls */}
      <div className="flex justify-end gap-4 mr-20 mt-4">
        <div className="flex text-center gap-2 items-center">
          <Button
            onClick={handlePrev}
            disabled={page === 1 || isFetching}
            size="sm"
            className="rounded-xs"
          >
            <ArrowLeft /> Prev
          </Button>

          <span className="px-2">
            {meta ? `Page ${meta.page} of ${meta.totalPages}` : `page ${page}`}
          </span>

          <Button
            onClick={handleNext}
            disabled={meta ? page >= meta.totalPages || isFetching : isFetching}
            size="sm"
            className="rounded-xs"
          >
            Next <ArrowRight />
          </Button>
        </div>

        {/* shadcn Select for page size */}
        <div className="flex items-center gap-2 ">
          <label htmlFor="pageSizeSelect" className="text-sm">
            Rows per page
          </label>

          <Select
            defaultValue={String(limit)}
            onValueChange={handleLimitChange}
          >
            <SelectTrigger id="pageSizeSelect" className="w-[96px]">
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
    </>
  );
}
