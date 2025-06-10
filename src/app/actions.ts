
"use server";

import { z } from "zod";
import { QuestionFormSchema } from "@/lib/schemas";
import fs from 'fs/promises';
import path from 'path';

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const waitlistFilePath = path.join(process.cwd(), 'waitlist_emails.txt');
const questionsFilePath = path.join(process.cwd(), 'user_questions.txt');

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
    await fs.appendFile(waitlistFilePath, `${email}\n`);
    console.log(`Email saved to waitlist_emails.txt: ${email}`);
    return {
      type: "success",
      message: "Thank you! You've been added to the waitlist for MeetNX by Anupam.",
    };
  } catch (error) {
    console.error("Failed to save email to file:", error);
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
    const questionEntry = `Email: ${email}\nQuestion: ${question}\n--------------------\n\n`;
    await fs.appendFile(questionsFilePath, questionEntry);
    console.log(`Question saved to user_questions.txt from ${email}`);
    
    return {
      type: "success",
      message: "Thank you! Anupam has received your question and will get back to you.",
    };
  } catch (error) {
    console.error("Failed to save question to file:", error);
    return {
      type: "error",
      message: "Something went wrong while saving your question. Please try again later.",
    };
  }
}
