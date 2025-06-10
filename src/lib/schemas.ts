
import { z } from "zod";

export const QuestionFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  question: z.string().min(10, { message: "Question must be at least 10 characters long." }).max(1000, { message: "Question must be at most 1000 characters long." }),
});
