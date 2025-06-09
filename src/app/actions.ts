"use server";

import { z } from "zod";

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
