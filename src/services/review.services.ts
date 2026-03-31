"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IReview, IReviewQueryParams } from "@/types/review.types";

export const getEventReviews = async (
  eventId: string,
  params?: IReviewQueryParams
): Promise<ApiResponse<IReview[]>> => {
  const res = await httpClient.get<IReview[]>(`/reviews/events/${eventId}`, {
    params: params as Record<string, unknown>,
  });
  return {
    data: res.data,
    meta: res.meta,
    success: res.success,
    message: res.message,
  };
};

export const createReview = async (
  eventId: string,
  reviewData: { rating: number; body?: string }
): Promise<ApiResponse<IReview>> => {
  const res = await httpClient.post<IReview>(
    `/reviews/events/${eventId}`,
    reviewData
  );
  return {
    data: res.data,
    success: res.success,
    message: res.message,
  };
};

export const getMyReviews = async (
  params?: IReviewQueryParams
): Promise<ApiResponse<IReview[]>> => {
  const res = await httpClient.get<IReview[]>("/reviews/me", {
    params: params as Record<string, unknown>,
  });
  return {
    data: res.data,
    meta: res.meta,
    success: res.success,
    message: res.message,
  };
};

export const getAllReviews = async (
  params?: IReviewQueryParams
): Promise<ApiResponse<IReview[]>> => {
  const res = await httpClient.get<IReview[]>("/reviews/admin", {
    params: params as Record<string, unknown>,
  });
  return {
    data: res.data,
    meta: res.meta,
    success: res.success,
    message: res.message,
  };
};
