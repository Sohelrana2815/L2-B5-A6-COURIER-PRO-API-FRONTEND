/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateReceiverProfileMutation } from "@/redux/features/parcel/parcel.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { AlertCircle, Edit, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const updateProfileSchema = z.object({
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
});

export default function ReceiverProfile() {
  const { data: userInfo, isLoading: isLoadingUser } = useUserInfoQuery({});
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateReceiverProfileMutation();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      phone: "",
      address: "",
      city: "",
    },
  });

  // Pre-fill form with existing user data
  useEffect(() => {
    if (userInfo?.data) {
      form.reset({
        phone: userInfo.data.phone || "",
        address: userInfo.data.address || "",
        city: userInfo.data.city || "",
      });
    }
  }, [userInfo, form]);

  // Check if profile is complete
  const isProfileComplete = () => {
    const userData = userInfo?.data;
    return userData?.phone && userData?.address && userData?.city;
  };

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    try {
      const result = await updateProfile(data).unwrap();
      if (result?.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full max-w-2xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Receiver Profile</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your contact information to receive parcels"
              : "View and manage your profile information"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Display User Name */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Account Name</p>
            <p className="text-lg font-semibold">
              {userInfo?.data?.name || "Not Available"}
            </p>
          </div>

          {/* Conditional Alert Message */}
          {!isEditing && !isProfileComplete() && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                In order to receive a parcel, you must fill up all the fields
                like phone, address, and city.
              </AlertDescription>
            </Alert>
          )}

          {!isEditing && isProfileComplete() && (
            <Alert className="border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription>
                Your profile is complete! You can now receive parcels.
              </AlertDescription>
            </Alert>
          )}

          {/* View Mode */}
          {!isEditing && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="text-base font-medium">
                    {userInfo?.data?.phone || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-base font-medium">
                    {userInfo?.data?.address || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="text-base font-medium">
                    {userInfo?.data?.city || "Not provided"}
                  </p>
                </div>
              </div>
              <Button onClick={() => setIsEditing(true)} className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          )}

          {/* Edit Mode - Update Form */}
          {isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+880....." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. House-1, Road-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="eg. Dhaka" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
