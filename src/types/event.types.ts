import { PaginationMeta } from "./api.types";
import { UserInfo } from "./user.types";

export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "ENDED";
export type EventVisibility = "PUBLIC" | "PRIVATE";

export interface IEventCategory {
  id: string;
  name: string;
  icon: string;
}

export interface IEventTag {
  id: string;
  name: string;
}

export interface IEventParticipantStats {
  confirmed: number;
  pending: number;
}

export interface IEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  bannerImage: string | null;
  startDate: string;
  endDate: string;
  registrationDeadline: string | null;
  registrationFee: number;
  isOnline: boolean;
  venueName?: string | null;
  venueAddress?: string | null;
  mapEmbedCode?: string | null;
  onlineLink?: string | null;
  status: EventStatus;
  visibility: EventVisibility;
  isFeatured: boolean;
  organizerId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  maxParticipants: number | null;
  currency?: string;

  // Relations
  organizer?: UserInfo;
  category?: IEventCategory;
  tags?: IEventTag[];
  stats?: IEventParticipantStats;

  _count?: {
    participations: number;
    reviews: number;
  };
}

export interface IDetailedEvent extends Omit<IEvent, 'organizer'> {
  currency: string;
  averageRating: number;
  reviews: any[];
  deletedAt: string | null;
  organizer: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

export interface IEventResponse {
  data: IEvent[];
  meta: PaginationMeta;
}
