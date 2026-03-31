export interface IReviewUser {
  id: string;
  name: string;
  image?: string | null;
}

export interface IReview {
  id: string;
  rating: number;
  body?: string | null;
  eventId: string;
  userId: string;
  user: IReviewUser;
  editDeadline?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  event ?: {
    id: string;
    title: string;
    bannerImage: string | null;
    startDate: string;
  };
}

export interface IReviewQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  rating?: number;
}
