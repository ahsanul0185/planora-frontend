"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDetailedEvent, IEvent, IEventResponse } from "@/types/event.types";

export interface IMyEventsQueryParams {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
  visibility?: string;
  categoryId?: string;
}

export const getMyOrganizedEvents = async (
  params: IMyEventsQueryParams = {}
): Promise<IEventResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  if (params.status) queryParams.status = params.status;
  if (params.visibility) queryParams.visibility = params.visibility;
  if (params.categoryId) queryParams.categoryId = params.categoryId;

  const res = await httpClient.get<IEvent[]>("/events/me", {
    params: queryParams,
  });

  return {
    data: res.data,
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};

export const getEventById = async (id: string): Promise<IDetailedEvent> => {
  const res = await httpClient.get<IDetailedEvent>(`/events/${id}`);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await httpClient.delete(`/events/${id}`);
  return res;
};

export const createEvent = async (data: FormData) => {
  const res = await httpClient.post("/events", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const updateEvent = async (id: string, data: FormData) => {
  const res = await httpClient.put(`/events/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getAllEvents = async (
  params: IMyEventsQueryParams = {}
): Promise<IEventResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  if (params.status) queryParams.status = params.status;
  if (params.visibility) queryParams.visibility = params.visibility;
  if (params.categoryId) queryParams.categoryId = params.categoryId;

  const res = await httpClient.get<IEvent[]>("/events", {
    params: queryParams,
  });

  return {
    data: res.data,
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};
