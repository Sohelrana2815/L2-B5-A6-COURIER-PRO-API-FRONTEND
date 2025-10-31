import { Button } from "@/components/ui/button";
import parcelBeg from "/src/assets/images/parcelbeg.webp";
import contact from "/src/assets/images/contact.webp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Send } from "lucide-react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// contact schema
const contactSchema = z.object({
  name: z
    .string({ error: "Name must be string!" })
    .min(5, { error: "Name must be at least 5 characters long" })
    .max(20, { error: "Name cannot be exceed 20 characters" }),
  email: z
    .email({ error: "Not valid email!" })
    .min(5, { error: "Email must be at least 5 characters long" })
    .max(20, { error: "Email cannot be exceed 20 characters" }),
  comment: z.string().min(5).max(20),
});

export default function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),

    defaultValues: {
      name: "",
      email: "",
      comment: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    if (data.name && data.email && data.comment) {
      toast.success("Thank you! Your message has been sent.");
    }
  };

  return (
    <div className="min-h-screen bg-card">
      {/* Hero Section with parcelBeg background */}
      <div className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${parcelBeg}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Get In Touch With Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We're here to help with all your delivery needs. Reach out to us
            anytime, and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* Contact Form and Image Section */}
      <div className="py-16 px-4 bg-card ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Have a question or need assistance? We're here to help! Fill
                  out the form below and we'll get back to you soon.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <span className="text-chart-4">Phone:</span> 0123456789
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4 max-w-sm">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your full name"
                                type="text"
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
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                type="email"
                                className="h-12 text-lg  rounded-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us how we can help you..."
                                rows={6}
                                className="text-lg rounded-lg resize-none bg-muted"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full text-foreground font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl "
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src={contact}
                  alt="Contact us"
                  className="w-full max-w-lg h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
