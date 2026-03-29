"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IUser } from "@/types/user.types";

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
