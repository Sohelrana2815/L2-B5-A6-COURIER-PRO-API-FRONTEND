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
  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
  };
  return (
    <div className="maxwidth-md mx-auto mt-10 p-6 border rounded-lg shadow-md flex flex-col gap-4 justify-center items-center">
      {/* NAME */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  This is Description
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
                  This is email
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
                  <Password {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is password
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
                  <Input {...field} />
                </FormControl>
                <FormDescription className="sr-only">
                  This is confirmPassword
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
