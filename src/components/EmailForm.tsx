
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { submitEmail } from "@/app/actions";
import { Mail } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type EmailFormData = z.infer<typeof emailSchema>;

const initialState: { message: string; type: string; errors?: Record<string, string[]> | null } = {
  message: "",
  type: "",
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto animate-pulse-once px-5 py-3 text-base lg:px-6 lg:py-4 lg:text-lg"
    >
      {pending ? "Submitting..." : "Join Waitlist"}
    </Button>
  );
}

export function EmailForm() {
  const [state, formAction] = useFormState(submitEmail, initialState);
  const { toast } = useToast();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    // Ensure we only act if state.message has content (i.e., server has responded)
    if (state?.message && state.message !== "") {
      if (state.type === "success") {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset(); // This should clear the input
      } else if (state.type === "error") {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);

  // This function is called by react-hook-form after successful client-side validation
  const handleValidSubmit = (data: EmailFormData) => {
    const formData = new FormData();
    formData.append("email", data.email);
    // Call the server action dispatcher from useFormState
    formAction(formData); // Simplified call
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleValidSubmit)}
      className="flex flex-col sm:flex-row gap-4 w-full max-w-md lg:max-w-lg"
    >
      <div className="relative flex-grow">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
        <Input
          {...form.register("email")}
          type="email"
          name="email" // Good practice to include name attribute
          placeholder="Enter your email address"
          className="pl-10 pr-4 py-3 text-base lg:pl-12 lg:py-4 lg:text-lg h-auto"
          aria-invalid={!!form.formState.errors.email || !!(state?.type === 'error' && state.message.toLowerCase().includes('email'))}
          aria-describedby="email-error email-error-server"
        />
      </div>
      <SubmitButton />
      {form.formState.errors.email && (
         <p id="email-error" className="text-destructive text-sm mt-1 sm:hidden">{form.formState.errors.email.message}</p>
      )}
       {state?.type === 'error' && state.message.toLowerCase().includes('email') && !form.formState.errors.email && (
        <p id="email-error-server" className="text-destructive text-sm mt-1 sm:hidden">{state.message}</p>
      )}
       {state?.type === 'error' && !state.message.toLowerCase().includes('email') && state.message && !form.formState.errors.email && (
         <p id="email-error-server-generic" className="text-destructive text-sm mt-1 sm:hidden">{state.message}</p>
      )}
    </form>
  );
}
