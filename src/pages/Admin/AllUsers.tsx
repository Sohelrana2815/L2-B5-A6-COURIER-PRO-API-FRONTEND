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
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  // provide a typed default (so .map never runs on undefined)
  const {
    data: allUsers = [],
    isLoading,
    isError,
  } = useGetUsersQuery(undefined);

  // block/unblock mutation
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
        newSet.delete(selectedUserId);
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
        newSet.delete(selectedUserId);
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users.</p>;
  if (allUsers.length === 0) return <p>No users found.</p>;

  return (
    <>
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
          {allUsers.map((user: IUser) => {
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
                <TableCell className="text-center capitalize">{role}</TableCell>
                <TableCell className="text-center">
                  {isVerified ? "Yes" : "No"}
                </TableCell>
                {/* BLOCK */}
                <TableCell className="text-center cursor-pointer">
                  <Button
                    disabled={user.isBlocked || loadingBlock.has(user._id)}
                    size="sm"
                    onClick={() => openBlockModal(user._id, displayName)}
                    className="cursor-pointer"
                  >
                    {loadingBlock.has(user._id) ? "Loading..." : <ImBlocked />}
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
                    {loadingUnblock.has(user._id) ? "Loading..." : <FaLockOpen />}
                  </Button>
                </TableCell>
                {/* DELETE */}
                <TableCell className="text-center">
                  <Button
                    disabled={user.isDeleted || loadingDelete.has(user._id)}
                    onClick={() => openDeleteModal(user._id, displayName)}
                    size="sm"
                    className="cursor-pointer"
                  >
                    {loadingDelete.has(user._id) ? "Loading..." : <FaTrashCan />}
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
                    {loadingRestore.has(user._id) ? "Loading..." : <MdRestore />}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Block Confirmation Modal */}
      <Dialog open={blockModalOpen} onOpenChange={setBlockModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Are you sure you want to block {selectedUserName}? They will not be able to access their account.
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
              {loadingBlock.has(selectedUserId || "") ? "Blocking..." : "Block User"}
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
              Are you sure you want to delete {selectedUserName}? This action cannot be undone.
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
              {loadingDelete.has(selectedUserId || "") ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
