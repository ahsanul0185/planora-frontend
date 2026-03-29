"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IUser } from "@/types/user.types";
import { IMyJoinedEventsQueryParams, IMyJoinedEventsResponse } from "@/types/participant.types";
import { IParticipation } from "@/types/participation.types";

export const updateMyProfile = async (
  formData: FormData
): Promise<ApiResponse<IUser>> => {
  try {
    const res = await httpClient.put<IUser>("/users/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res as ApiResponse<IUser>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    let message = errorData?.message || "Failed to update profile";
    
    // If it is a Zod validation error, extract detailed field errors
    if (errorData?.errorSources && errorData.errorSources.length > 0) {
      const details = errorData.errorSources
        .map((src: any) => `${src.path}: ${src.message}`)
        .join(", ");
      message = `Validation Error: ${details}`;
    }

    throw new Error(message);
  }
};

export const getMyJoinedEvents = async (
  params: IMyJoinedEventsQueryParams = {}
): Promise<IMyJoinedEventsResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;

  const res = await httpClient.get<IParticipation[]>("/users/me/joined-events", {
    params: queryParams,
  });

  return {
    data: (res.data ?? []) as IParticipation[],
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};

