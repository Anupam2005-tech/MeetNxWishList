
"use server";

import { z } from "zod";
import { QuestionFormSchema } from "@/lib/schemas";
import dbConnect from "@/lib/dbConnect";
import EmailModel from "@/lib/models/EmailModel";
import QuestionModel from "@/lib/models/QuestionModel";

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
    await dbConnect();
    const existingEmail = await EmailModel.findOne({ email: email });
    if (existingEmail) {
      return {
        type: "error",
        message: "This email is already on the waitlist.",
      };
    }
    await EmailModel.create({ email: email });
    console.log(`Email saved to database: ${email}`);
    return {
      type: "success",
      message: "Thank you! You've been added to the waitlist for MeetNX by Anupam.",
    };
  } catch (error: any) {
    console.error("Failed to save email to database:", error);
    // Check for unique constraint violation (code 11000)
    if (error.code === 11000) {
        return {
            type: "error",
            message: "This email is already on the waitlist.",
        };
    }
    return {
      type: "error",
      message: "Something went wrong while saving your email. Please try again later.",
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
    await dbConnect();
    await QuestionModel.create({ email, question });
    console.log(`Question saved to database from ${email}`);
    
    return {
      type: "success",
      message: "Thank you! Anupam has received your question and will get back to you.",
    };
  } catch (error)
 {
    console.error("Failed to save question to database:", error);
    return {
      type: "error",
      message: "Something went wrong while saving your question. Please try again later.",
    };
  }
}
