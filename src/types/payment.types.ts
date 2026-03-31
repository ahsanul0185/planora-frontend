export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface IPaymentQueryParams {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: PaymentStatus | "";
}

export interface IPayment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string | null;
  gatewayRef?: string | null;
  invoiceUrl?: string | null;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  event: {
    id: string;
    title: string;
    bannerImage?: string | null;
    startDate: string;
  };
}

export interface IPaymentsResponse {
  success: boolean;
  message: string;
  data: IPayment[];
  meta: import("./api.types").PaginationMeta;
}
