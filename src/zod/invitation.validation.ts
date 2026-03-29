import { z } from "zod";

export const sendInvitationZodSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  emails: z.array(z.string().email("Invalid email address")).min(1, "At least one email is required"),
});

export const singleEmailZodSchema = z.string().email("Invalid email format");

export type ISendInvitationPayload = z.infer<typeof sendInvitationZodSchema>;
