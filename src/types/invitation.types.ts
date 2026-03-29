import { IEvent } from "./event.types";
import { UserInfo } from "./user.types";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "REVOKED";

export interface IInvitationReceiver {
  id: string;
  name: string;
  image?: string | null;
}

export interface IInvitation {
  id: string;
  senderId: string;
  sender?: UserInfo;
  receiverEmail: string;
  receiverId: string | null;
  receiver?: IInvitationReceiver;
  eventId: string;
  event: IEvent;
  status: InvitationStatus;
  expiresAt: string;
  respondedAt?: string;
  revokedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInvitationQueryParams {
  searchTerm?: string;
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
}

export interface IMyInvitationsResponse {
  data: IInvitation[];
  meta: import("./api.types").PaginationMeta;
}
