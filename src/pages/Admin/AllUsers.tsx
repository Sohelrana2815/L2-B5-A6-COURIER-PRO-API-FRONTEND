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
  // delete user

  // block user
  const handleBlockUser = (userId: string) => {
    blockUser(userId);
  };

  // unblock user

  const handleUnblockUser = (userId: string) => {
    unblockUser(userId);
  };

  // delete soft-delete

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  // delete Restore user

  const handleRestoreUser = (userId: string) => {
    restoreUser(userId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load users.</p>;
  if (allUsers.length === 0) return <p>No users found.</p>;

  return (
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
                  disabled={user.isBlocked}
                  size="sm"
                  onClick={() => handleBlockUser(user._id)}
                  className="cursor-pointer"
                >
                  <ImBlocked />
                </Button>
              </TableCell>
              {/* UNBLOCK */}
              <TableCell className="text-center">
                <Button
                  disabled={user.isBlocked === false}
                  onClick={() => handleUnblockUser(user._id)}
                  size="sm"
                  className="cursor-pointer"
                >
                  <FaLockOpen />
                </Button>
              </TableCell>
              {/* DELETE */}
              <TableCell className="text-center">
                <Button
                  disabled={user.isDeleted}
                  onClick={() => handleDeleteUser(user._id)}
                  size="sm"
                  className="cursor-pointer"
                >
                  <FaTrashCan />
                </Button>
              </TableCell>
              {/* RESTORE*/}
              <TableCell className="text-center">
                <Button
                  disabled={user.isDeleted === false}
                  onClick={() => handleRestoreUser(user._id)}
                  className="cursor-pointer"
                  size="sm"
                >
                  <MdRestore />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
