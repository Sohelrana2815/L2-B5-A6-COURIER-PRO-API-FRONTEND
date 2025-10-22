import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllReceiversQuery } from "@/redux/features/parcel/parcel.api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Send } from "lucide-react";

interface Receiver {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export default function AllReceivers() {
  const { data: receivers, isLoading } = useGetAllReceiversQuery(undefined);
  const navigate = useNavigate();

  //   console.log("Full receivers response:", receivers);
  //   console.log("receivers?.data:", receivers?.data);

  const handleSendParcel = (receiver: Receiver) => {
    // Navigate to create parcel page with receiver info
    navigate("/sender/create-parcel", {
      state: {
        receiverInfo: {
          name: receiver.name,
          phone: receiver.phone,
          address: receiver.address,
          city: receiver.city,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>Loading receivers...</p>
      </div>
    );
  }

  // Handle different possible API response structures
  const receiverList = Array.isArray(receivers)
    ? receivers
    : receivers?.data?.data || receivers?.data || [];

  //   console.log("Extracted receiverList:", receiverList);

  return (
    <div className="w-full max-w-7xl mx-auto px-5 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">All Receivers</h2>
        <p className="text-muted-foreground">
          Select a receiver to send a parcel
        </p>
      </div>

      {receiverList.length === 0 ? (
        <div className="text-center py-12 border border-muted rounded-md">
          <p className="text-muted-foreground">No receivers found</p>
        </div>
      ) : (
        <div className="border border-muted rounded-md">
          <Table>
            <TableCaption>
              A list of all registered receivers available for parcel delivery
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receiverList.map((receiver: Receiver) => (
                <TableRow key={receiver._id}>
                  <TableCell className="font-medium">{receiver.name}</TableCell>
                  <TableCell>{receiver.phone || "Not provided"}</TableCell>
                  <TableCell>{receiver.city || "Not provided"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleSendParcel(receiver)}
                      size="sm"
                      disabled={
                        !receiver.phone || !receiver.address || !receiver.city
                      }
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Parcel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
