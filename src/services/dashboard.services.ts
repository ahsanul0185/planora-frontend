"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IOrganizerDashboardData } from "@/types/dashboard.types";

export const getOrganizerDashboardData = async (): Promise<ApiResponse<IOrganizerDashboardData>> => {
  try {
    const res = await httpClient.get<IOrganizerDashboardData>("/dashboard/organizer");
    return res as ApiResponse<IOrganizerDashboardData>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = errorData?.message || "Failed to fetch dashboard data";
    throw new Error(message);
  }
};