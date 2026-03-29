import { z } from "zod";

export const updateProfileZodSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  bio: z.string().max(200, "Bio must be at most 200 characters"),
  birthdate: z.string(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  phoneNumber: z.string(),
  address: z.string(),
});

export type IUpdateProfileForm = z.infer<typeof updateProfileZodSchema>;
