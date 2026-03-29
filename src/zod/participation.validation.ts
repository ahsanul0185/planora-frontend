import { z } from "zod";

export const participationStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "BANNED", "CONFIRMED", "CANCELLED"]),
});

export const createParticipationSchema = z.object({
  eventId: z.string().min(1, "Event ID is required"),
});

export type IParticipationStatusUpdate = z.infer<typeof participationStatusUpdateSchema>;
export type ICreateParticipation = z.infer<typeof createParticipationSchema>;
