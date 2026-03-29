"use server";

import { IInvitation, IInvitationQueryParams } from "@/types/invitation.types";
import { ApiResponse } from "@/types/api.types";
import { httpClient } from "@/lib/axios/httpClient";

export const getEventInvitations = async (
  eventId: string,
  params?: IInvitationQueryParams
): Promise<ApiResponse<IInvitation[]>> => {
  const res = await httpClient.get<IInvitation[]>(`/invitations/event/${eventId}`, {
    params: params as Record<string, unknown>,
  });
  return {
    data: res.data,
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
    success: res.success,
    message: res.message,
  };
};

export const sendInvitations = async (eventId: string, emails: string[]): Promise<ApiResponse<any>> => {
  try {
    const res = await httpClient.post<any>(`/invitations`, { eventId, emails });
    return res as ApiResponse<any>;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to send invitations";
    throw new Error(message);
  }
};

export const revokeInvitation = async (invId: string): Promise<ApiResponse<IInvitation>> => {
  try {
    const res = await httpClient.delete<IInvitation>(`/invitations/${invId}`);
    return res as ApiResponse<IInvitation>;
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to revoke invitation";
    throw new Error(message);
  }
};

export const getMyInvitations = async (params?: IInvitationQueryParams): Promise<ApiResponse<IInvitation[]>> => {
  const res = await httpClient.get<IInvitation[]>(`/invitations`, {
    params: params as Record<string, unknown>,
  });
  return {
    data: res.data,
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
    success: res.success,
    message: res.message,
  };
};

export const acceptInvitation = async (invId: string): Promise<ApiResponse<any>> => {
  const res = await httpClient.post<any>(`/invitations/${invId}/accept`, {});
  return res as ApiResponse<any>;
};

export const declineInvitation = async (invId: string): Promise<ApiResponse<any>> => {
  const res = await httpClient.post<any>(`/invitations/${invId}/decline`, {});
  return res as ApiResponse<any>;
};

export const payAndAcceptInvitation = async (invId: string): Promise<ApiResponse<{ paymentUrl: string }>> => {
  const res = await httpClient.post<{ paymentUrl: string }>(`/invitations/${invId}/pay-accept`, {});
  return res as ApiResponse<{ paymentUrl: string }>;
};
