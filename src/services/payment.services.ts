"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPaymentQueryParams, IPaymentsResponse, IPayment } from "@/types/payment.types";

export const getMyPayments = async (
  params: IPaymentQueryParams = {}
): Promise<IPaymentsResponse> => {
  const queryParams: Record<string, unknown> = {};
  if (params.page) queryParams.page = params.page;
  if (params.limit) queryParams.limit = params.limit;
  if (params.sortBy) queryParams.sortBy = params.sortBy;
  if (params.sortOrder) queryParams.sortOrder = params.sortOrder;
  if (params.status) queryParams.status = params.status;

  const res = await httpClient.get<IPayment[]>("/payments/me", {
    params: queryParams,
  });

  return {
    success: res.success,
    message: res.message,
    data: res.data ?? [],
    meta: res.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 },
  };
};
