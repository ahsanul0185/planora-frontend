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
