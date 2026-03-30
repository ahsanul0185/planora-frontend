import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.any().optional(),
});

export type ICategoryValidationPayload = z.infer<typeof categoryValidationSchema>;
