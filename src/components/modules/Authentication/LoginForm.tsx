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

import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import EyePassword from "@/components/ui/EyePassword";
import config from "@/config";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.email().min(5).max(50),
  password: z.string().min(8).max(50),
});

export default function LoginForm() {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(userData).unwrap();
      console.log(result);
      if (result?.success) {
        // form.reset();
        toast.success("Login successful!");
        navigate("/");
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <EyePassword {...field} placeholder="Password" />
                </FormControl>
                <FormDescription className="sr-only">
                  This is Description
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>

          <p className="text-center">OR</p>
          <Button
            onClick={() => window.open(`${config.baseURL}/auth/google`)}
            type="button"
            variant="outline"
            className="w-full"
          >
            Continue with Google
          </Button>
        </form>
      </Form>
    </div>
  );
}
