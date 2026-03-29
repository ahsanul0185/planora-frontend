"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IAdmin, IAdminsResponse, ICreateAdminPayload } from "@/types/admin.types";
import { IChangeUserStatusPayload, IUser, IUserQueryParams, IUsersResponse } from "@/types/user.types";

export const changeUserStatus = async (
  payload: IChangeUserStatusPayload
): Promise<ApiResponse<IUser>> => {
  try {
    const res = await httpClient.patch<IUser>(
      "/admins/change-user-status",
      payload
    );
    return res as ApiResponse<IUser>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = errorData?.message || "Failed to change user status";
    throw new Error(message);
  }
};

export const getAllUsers = async (
  params: IUserQueryParams = {}
): Promise<IUsersResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.searchTerm) queryParams.searchTerm = params.searchTerm;
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  if (params.status) queryParams.status = params.status;

  const res = await httpClient.get<IUser[]>("/users", {
    params: queryParams,
  });

  return {
    data: res.data ?? [],
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};

export const getUserById = async (id: string): Promise<ApiResponse<IUser>> => {
  try {
    const res = await httpClient.get<IUser>(`/users/${id}`);
    return res as ApiResponse<IUser>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = errorData?.message || "Failed to fetch user details";
    throw new Error(message);
  }
};

export const getAllAdmins = async (): Promise<IAdminsResponse> => {
  const res = await httpClient.get<IAdmin[]>("/admins");
  return {
    data: res.data ?? [],
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};

export const createAdmin = async (
  payload: ICreateAdminPayload
): Promise<ApiResponse<IAdmin>> => {
  try {
    const res = await httpClient.post<IAdmin>("/users/create-admin", payload);
    return res as ApiResponse<IAdmin>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = errorData?.message || "Failed to create admin";
    throw new Error(message);
  }
};

export const deleteAdmin = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const res = await httpClient.delete<null>(`/admins/${id}`);
    return res as ApiResponse<null>;
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = errorData?.message || "Failed to delete admin";
    throw new Error(message);
  }
};
