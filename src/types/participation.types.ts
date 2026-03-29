import { PaginationMeta } from "./api.types";
import { IEvent } from "./event.types";

export type ParticipationStatus =
  | "PENDING"
  | "APPROVED"
  | "CONFIRMED"
  | "REJECTED"
  | "BANNED"
  | "CANCELLED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface IParticipationUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  gender?: string | null;
  birthdate?: string | null;
  bio?: string | null;
  createdAt?: string | null;
}

export interface IParticipationPayment {
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId: string | null;
  invoiceUrl: string | null;
}

export interface IParticipation {
  id: string;
  eventId: string;
  userId: string;
  status: ParticipationStatus;
  paymentId: string | null;
  joinedAt: string;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectedReason: string | null;
  bannedAt: string | null;
  bannedReason: string | null;
  cancelledAt: string | null;

  user: IParticipationUser;
  payment: IParticipationPayment | null;
  event?: IEvent;
}

export interface IParticipantsResponse {
  data: IParticipation[];
  meta: PaginationMeta;
}

export interface IParticipantsQueryParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
}
