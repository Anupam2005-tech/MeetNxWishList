
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
    // Simulate saving the email
    console.log(`Email submitted to waitlist: ${email}`);
    // In a real application, you would save this to a database or a mailing list service.
    // e.g., await db.waitlist.create({ data: { email } });

    return {
      type: "success",
      message: "Thank you! You've been added to the waitlist.",
    };
  } catch (error) {
    console.error("Failed to submit email:", error);
    return {
      type: "error",
      message: "Something went wrong. Please try again later.",
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
    // Simulate processing the question
    console.log(`Question received from ${email}: ${question}`);
    // In a real application, you might send this as an email, save to a DB, etc.

    return {
      type: "success",
      message: "Thank you! Your question has been submitted.",
    };
  } catch (error) {
    console.error("Failed to submit question:", error);
    return {
      type: "error",
      message: "Something went wrong. Please try again later.",
    };
  }
}
