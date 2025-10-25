import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <EyePassword
                  {...field}
                  placeholder="Enter your password"
                  className="h-12 text-lg rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/80 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-lg cursor-pointer"
        >
          Sign In
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          onClick={() => window.open(`${config.baseURL}/auth/google`)}
          type="button"
          variant="outline"
          className="w-full h-12 text-lg font-semibold rounded-lg border-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
        >
          <FcGoogle /> Continue with Google
        </Button>
      </form>
    </Form>
  );
}
