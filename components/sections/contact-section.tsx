"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Confetti } from "@/components/ui/confetti";
import { Mail, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected"), // Honeypot field
});

type FormValues = z.infer<typeof formSchema>;

interface ContactSectionProps {
  contact: {
    title: string;
    subtitle: string;
    email: string;
    alternativeText: string;
  };
}

export function ContactSection({ contact }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const confettiRef = useRef<{ fire: () => void } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "", // Hidden honeypot field
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Message from ${values.name}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
      );
      const mailtoLink = `mailto:${contact.email}?subject=${subject}&body=${body}`;

      // Open mailto link
      window.location.href = mailtoLink;

      // Success - trigger confetti and show toast
      confettiRef.current?.fire();
      toast.success("Opening your email client!", {
        duration: 4000,
      });

      // Reset form after a short delay
      setTimeout(() => {
        form.reset();
      }, 1000);
    } catch (error) {
      setSubmitError(
        "Failed to open email client. Please try again or contact me directly."
      );
      console.error(error);
      toast.error("Failed to open email client");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 bg-gradient-to-br from-background to-muted/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto md:mb-16">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {contact.title}
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">{contact.subtitle}</p>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field - hidden from users */}
              <div
                className="absolute -left-[9999px] opacity-0 pointer-events-none"
                aria-hidden="true"
              >
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave this empty</FormLabel>
                      <FormControl>
                        <Input {...field} tabIndex={-1} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          aria-describedby={
                            form.formState.errors.name
                              ? "name-error"
                              : undefined
                          }
                        />
                      </FormControl>
                      <FormMessage id="name-error" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          aria-describedby={
                            form.formState.errors.email
                              ? "email-error"
                              : undefined
                          }
                        />
                      </FormControl>
                      <FormMessage id="email-error" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Tell me about your project, ideas, or just say hello!"
                        className={cn(
                          "flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        )}
                        {...field}
                        aria-describedby={
                          form.formState.errors.message
                            ? "message-error"
                            : undefined
                        }
                      />
                    </FormControl>
                    <FormMessage id="message-error" />
                  </FormItem>
                )}
              />

              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              {/* Interactive Hover Button */}
              <div className="flex justify-center pt-4">
                <Button
                  ref={buttonRef}
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className={cn(
                    "group relative px-8 py-4 text-lg font-semibold transition-all duration-300 ease-out",
                    "hover:scale-105 hover:-translate-y-1 hover:shadow-xl",
                    "active:scale-95 active:translate-y-0",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                    "transform-gpu", // Hardware acceleration
                    isSubmitting && "pointer-events-none opacity-70"
                  )}
                  style={{
                    transform:
                      "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  }}
                  onMouseMove={(e) => {
                    if (isSubmitting) return;
                    const rect = buttonRef.current?.getBoundingClientRect();
                    if (!rect) return;

                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    const rotateX = (y / rect.height) * -10;
                    const rotateY = (x / rect.width) * 10;

                    if (buttonRef.current) {
                      buttonRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
                    }
                  }}
                  onMouseLeave={() => {
                    if (buttonRef.current) {
                      buttonRef.current.style.transform =
                        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      Send Message!
                    </>
                  )}

                  {/* Ripple effect on click */}
                  <span
                    className="absolute inset-0 rounded-md bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-150 ease-out pointer-events-none"
                    style={{ transformOrigin: "center" }}
                  />
                </Button>
              </div>
            </form>
          </Form>

          {/* Alternative Contact */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {contact.alternativeText}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <Mail className="h-4 w-4" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Confetti Component */}
      <Confetti
        ref={confettiRef}
        className="pointer-events-none"
        manualstart={true}
      />
    </section>
  );
}
