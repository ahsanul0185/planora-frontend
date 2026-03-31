import { z } from "zod";

export const createReviewZodSchema = z.object({
  rating: z.number().int().min(1).max(5, { message: "Rating must be between 1 and 5" }),
  body: z.string().min(1, "Review cannot be empty").optional().or(z.literal("")),
});

export type CreateReviewValues = z.infer<typeof createReviewZodSchema>;
