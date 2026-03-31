"use server";

import { httpClient } from "@/lib/axios/httpClient";
import {
  IParticipantsQueryParams,
  IParticipantsResponse,
  ParticipationStatus,
  IParticipation
} from "@/types/participation.types";

export const getEventParticipants = async (
  eventId: string,
  params: IParticipantsQueryParams = {}
): Promise<IParticipantsResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  if (params.status) queryParams.status = params.status;

  const res = await httpClient.get<IParticipation[]>(`/participations/${eventId}`, {
    params: queryParams,
  });

  return {
    data: res.data,
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};

export const updateParticipationStatus = async (
  eventId: string,
  userId: string,
  status: ParticipationStatus
) => {
  const res = await httpClient.put(`/participations/${eventId}/users/${userId}/status`, {
    status,
  });
  return res;
};

export const exportParticipantsCSV = async (eventId: string) => {
  const res = await httpClient.get<any>(`/participations/${eventId}/export`);
  return res;
};

export const cancelParticipation = async (eventId: string) => {
  const res = await httpClient.delete(`/participations/${eventId}/leave`);
  return res;
};

export const joinPublicFreeEvent = async (eventId: string) => {
  const res = await httpClient.post(`/participations/${eventId}/join`, {});
  return res;
};

export const requestPrivateFreeEvent = async (eventId: string) => {
  const res = await httpClient.post(`/participations/${eventId}/request`, {});
  return res;
};

export const joinPublicPaidEvent = async (
  eventId: string
): Promise<{ paymentUrl: string }> => {
  const res = await httpClient.post<{ paymentUrl: string }>(
    `/participations/${eventId}/pay-join`,
    {}
  );
  return res.data;
};

export const requestPrivatePaidEvent = async (eventId: string) => {
  const res = await httpClient.post(`/participations/${eventId}/pay-request`, {});
  return res;
};

export const initiatePaymentForApprovedParticipation = async (
  eventId: string
): Promise<{ paymentUrl: string }> => {
  const res = await httpClient.post<{ paymentUrl: string }>(
    `/participations/${eventId}/pay`,
    {}
  );
  return res.data;
};

