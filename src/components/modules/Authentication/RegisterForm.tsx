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
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Password from "@/components/ui/Password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import EyePassword from "@/components/ui/EyePassword";
import { useNavigate } from "react-router";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        error: "Name must be at least 2 characters.",
      })
      .max(50),
    email: z.email().min(5).max(50),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    role: z.enum(["SENDER", "RECEIVER"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "SENDER",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    // console.log(data);
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    try {
      const result = await register(userData).unwrap();
      // console.log(result);
      if (result?.success) {
        form.reset();
        toast.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  className="h-12 text-lg rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  type="email"
                  className="h-12 text-lg rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Password
              </FormLabel>
              <FormControl>
                <Password
                  {...field}
                  placeholder="Create a secure password"
                  className="h-12 text-lg rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Confirm Password
              </FormLabel>
              <FormControl>
                <EyePassword
                  {...field}
                  placeholder="Confirm your password"
                  className="h-12 text-lg rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground font-semibold">
                Account Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 text-lg rounded-lg">
                  <SelectValue placeholder="Select your account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Choose your role</SelectLabel>
                    <SelectItem value="SENDER">📦 Sender</SelectItem>
                    <SelectItem value="RECEIVER">📬 Receiver</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/80 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-lg cursor-pointer"
        >
          Create Account
        </Button>
      </form>
    </Form>
  );
}
