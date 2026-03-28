import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
  role: z.enum(["PARTICIPANT", "ORGANIZER"]),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  birthdate: z.string().optional(),
});

export const verifyEmailZodSchema = z.object({
  otp: z.string().min(6, "OTP must be exactly 6 characters").max(6, "OTP must be exactly 6 characters"),
});

export type ILoginPayload = z.infer<typeof loginZodSchema>;
export type IRegisterPayload = z.infer<typeof registerZodSchema>;
export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;