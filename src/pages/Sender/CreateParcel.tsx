import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const createParcelSchema = z.object({
  receiverInfo: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    phone: z
      .string()
      .min(10, "Phone must be at least 10 digits")
      .max(15, "Phone must be at most 15 digits"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .max(100, "Address must be at most 100 characters"),
    city: z
      .string()
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be at most 50 characters"),
  }),
  parcelDetails: z.object({
    type: z
      .string()
      .min(2, "Type must be at least 2 characters")
      .max(20, "Type must be at most 20 characters"),
    weightKg: z.number().positive("Weight must be a positive number"),
    description: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(200, "Description must be at most 200 characters"),
  }),
});

export default function CreateParcel() {
  const [createParcel] = useCreateParcelMutation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get receiver info from navigation state
  const receiverInfoFromState = location.state?.receiverInfo;
  
  const form = useForm<z.infer<typeof createParcelSchema>>({
    resolver: zodResolver(createParcelSchema),
    defaultValues: {
      receiverInfo: {
        name: "",
        phone: "",
        address: "",
        city: "",
      },
      parcelDetails: {
        type: "",
        weightKg: 0,
        description: "",
      },
    },
  });
  
  // Pre-fill receiver info if available
  useEffect(() => {
    if (receiverInfoFromState) {
      form.reset({
        receiverInfo: receiverInfoFromState,
        parcelDetails: {
          type: "",
          weightKg: 0,
          description: "",
        },
      });
    }
  }, [receiverInfoFromState, form]);

  const onSubmit = async (data: z.infer<typeof createParcelSchema>) => {
    // console.log(data);
    const parcelData = {
      receiverInfo: {
        name: data.receiverInfo.name,
        phone: data.receiverInfo.phone,
        address: data.receiverInfo.address,
        city: data.receiverInfo.city,
      },
      parcelDetails: {
        type: data.parcelDetails.type,
        weightKg: data.parcelDetails.weightKg,
        description: data.parcelDetails.description,
      },
    };

    try {
      const result = await createParcel(parcelData).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Parcel created successfully!");
        navigate("/sender/created-parcels");
      }
    } catch (error) {
      console.error(error);
    }

    console.log(parcelData);
  };

  return (
    <div className="flex justify-center gap-4 w-md mx-auto p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          {/* Info Alert */}
          {receiverInfoFromState && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Receiver information is pre-filled and read-only. Please fill in the parcel details below.
              </AlertDescription>
            </Alert>
          )}
          
          {!receiverInfoFromState && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a receiver from the All Receivers page to create a parcel.
              </AlertDescription>
            </Alert>
          )}
          
          {/* Receiver Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Receiver Information</h3>
            <FormField
              control={form.control}
              name="receiverInfo.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter receiver name" 
                      {...field} 
                      disabled={!!receiverInfoFromState}
                      className={receiverInfoFromState ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter phone number" 
                      {...field} 
                      disabled={!!receiverInfoFromState}
                      className={receiverInfoFromState ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverInfo.address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter address" 
                      {...field} 
                      disabled={!!receiverInfoFromState}
                      className={receiverInfoFromState ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiverInfo.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter city" 
                      {...field} 
                      disabled={!!receiverInfoFromState}
                      className={receiverInfoFromState ? "bg-muted" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Parcel Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Parcel Details</h3>
            <FormField
              control={form.control}
              name="parcelDetails.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parcel Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter parcel type (e.g., Box)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parcelDetails.weightKg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Enter weight in kg"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parcelDetails.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!receiverInfoFromState}
          >
            Submit The Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
}
