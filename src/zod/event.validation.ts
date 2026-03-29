import { z } from "zod";

export const eventValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  registrationDeadline: z.string().optional().or(z.literal("")),
  registrationFee: z.number().min(0, "Fee cannot be negative").or(z.string().regex(/^\d+$/, "Fee must be a valid number").transform(Number)),
  maxParticipants: z.string().optional().or(z.number().optional()),
  categoryId: z.string().min(1, "Category is required"),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  status: z.enum(["PUBLISHED", "DRAFT"]),
  timezone: z.string().optional(),
  onlineLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  venueName: z.string().optional(),
  venueAddress: z.string().optional(),
  tags: z.string().optional(),
  currency: z.string().optional(),
}).refine(data => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) >= new Date(data.startDate);
  }
  return true;
}, {
  message: "End date must be after or equal to start date",
  path: ["endDate"]
});

export type IEventValidationPayload = z.infer<typeof eventValidationSchema>;
