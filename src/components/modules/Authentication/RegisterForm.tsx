import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
    console.log(data);
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };
    try {
      const result = await register(userData).unwrap();
      console.log(result);
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
    <div className="flex justify-center gap-4 w-md mx-auto  p-4">
      {/* NAME */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is Name FIeld
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*  EMAIL */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="sr-only">
                  This is email field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*  PASSWORD */}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} placeholder="Enter your Password" />
                </FormControl>
                <FormDescription className="sr-only">
                  This is password field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*  CONFIRM PASSWORD */}

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <EyePassword {...field} placeholder="Confirm Password" />
                </FormControl>
                <FormDescription className="sr-only">
                  This is Confirm Password field
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*  ROLE */}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Available Roles</SelectLabel>
                      <SelectItem value="SENDER">Sender</SelectItem>
                      <SelectItem value="RECEIVER">Receiver</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
