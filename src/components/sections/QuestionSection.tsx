
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { submitQuestion } from "@/app/actions";
import { QuestionFormSchema } from "@/lib/schemas"; 
import { Mail, HelpCircle } from "lucide-react";

type QuestionFormData = z.infer<typeof QuestionFormSchema>;

const initialState = {
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
      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full py-3 text-base sm:text-lg lg:py-4 lg:text-xl"
    >
      {pending ? "Sending..." : "Send Question"}
    </Button>
  );
}

export function QuestionSection() {
  const [state, formAction] = useFormState(submitQuestion, initialState);
  const { toast } = useToast();

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      email: "",
      question: "",
    },
  });

  useEffect(() => {
    if (state?.message) {
      if (state.type === "success") {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset(); 
      } else if (state.type === "error") {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
        if (state.errors) {
            if (state.errors.email) {
                 form.setError("email", { type: "server", message: state.errors.email[0] });
            }
            if (state.errors.question) {
                form.setError("question", { type: "server", message: state.errors.question[0] });
            }
        }
      }
    }
  }, [state, toast, form]);

  const onFormSubmit = form.handleSubmit(() => {
    const formData = new FormData();
    const values = form.getValues();
    formData.append('email', values.email);
    formData.append('question', values.question);
    formAction(formData);
  });

  return (
    <section id="ask-question" className="py-16 sm:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-primary">
            Do you have any questions?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
            I'm here to help! Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>
        <form
          action={formAction} 
          onSubmit={onFormSubmit} 
          className="space-y-6 max-w-xl lg:max-w-2xl mx-auto"
        >
          <div>
            <label htmlFor="email-question" className="block text-sm font-medium text-foreground mb-1 lg:text-base">
              Your Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground lg:h-6 lg:w-6" />
              <Input
                id="email-question"
                {...form.register("email")}
                type="email"
                placeholder="you@example.com"
                className="pl-10 pr-4 py-3 text-base h-auto lg:pl-12 lg:py-4 lg:text-lg"
                aria-invalid={!!form.formState.errors.email}
                aria-describedby="email-question-error"
              />
            </div>
            {form.formState.errors.email && (
              <p id="email-question-error" className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="question" className="block text-sm font-medium text-foreground mb-1 lg:text-base">
              Your Question
            </label>
            <div className="relative">
               <HelpCircle className="absolute left-3 top-3.5 text-muted-foreground lg:top-4.5 h-5 w-5 lg:h-6 lg:w-6" />
              <Textarea
                id="question"
                {...form.register("question")}
                placeholder="Ask us anything..."
                className="pl-10 pr-4 py-3 text-base min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] lg:pl-12 lg:py-4 lg:text-lg"
                aria-invalid={!!form.formState.errors.question}
                aria-describedby="question-error"
              />
            </div>
            {form.formState.errors.question && (
              <p id="question-error" className="text-destructive text-sm mt-1">{form.formState.errors.question.message}</p>
            )}
          </div>
          
          <SubmitButton />
        </form>
      </div>
    </section>
  );
}
