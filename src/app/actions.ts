
"use server";

import { z } from "zod";
import { QuestionFormSchema } from "@/lib/schemas";

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export async function submitEmail(prevState: any, formData: FormData) {
  const validatedFields = emailSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      type: "error",
      message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Validation failed.",
    };
  }

  const email = validatedFields.data.email;

  try {
    // Simulate processing
    console.log(`Email received (not saved): ${email}`);
    // You could re-implement file saving here if needed, or other logic.
    return {
      type: "success",
      message: "Thank you! Your email has been received for the MeetNX waitlist by Anupam.",
    };
  } catch (error: any) {
    console.error("Failed to process email submission:", error);
    return {
      type: "error",
      message: "Something went wrong while processing your email. Please try again later.",
    };
  }
}

export async function submitQuestion(prevState: any, formData: FormData) {
  const validatedFields = QuestionFormSchema.safeParse({
    email: formData.get("email"),
    question: formData.get("question"),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    let errorMessage = "Validation failed.";
    if (fieldErrors.email?.[0]) {
      errorMessage = fieldErrors.email[0];
    } else if (fieldErrors.question?.[0]) {
      errorMessage = fieldErrors.question[0];
    }
    
    return {
      type: "error",
      message: errorMessage,
      errors: fieldErrors,
    };
  }

  const { email, question } = validatedFields.data;

  try {
    // Simulate processing
    console.log(`Question received (not saved) from ${email}: ${question}`);
    // You could re-implement file saving here if needed, or other logic.
    return {
      type: "success",
      message: "Thank you! Anupam has received your question and will get back to you.",
    };
  } catch (error) {
    console.error("Failed to process question submission:", error);
    return {
      type: "error",
      message: "Something went wrong while processing your question. Please try again later.",
    };
  }
}
