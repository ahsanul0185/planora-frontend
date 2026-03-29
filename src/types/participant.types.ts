import { PaginationMeta } from "./api.types";
import { IParticipation } from "./participation.types";

export interface IMyJoinedEventsQueryParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IMyJoinedEventsResponse {
  data: IParticipation[];
  meta: PaginationMeta;
}
