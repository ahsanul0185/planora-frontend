import { Metadata } from "next";
import PaymentHistoryTable from "@/components/modules/PaymentHistory/PaymentHistoryTable";
import { IPaymentQueryParams } from "@/types/payment.types";
import { getMyPayments } from "@/services/payment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Payment History | Planora",
  description: "View your transaction history and download invoices.",
};

const buildQueryParams = (urlParams: { [key: string]: string | string[] | undefined }): IPaymentQueryParams => {
  return {
    page: urlParams.page ? Number(urlParams.page) : 1,
    limit: urlParams.limit ? Number(urlParams.limit) : 10,
    sortBy: (urlParams.sortBy as string) || "createdAt",
    sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
    status: (urlParams.status as any) || undefined,
  };
};

const PaymentHistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["payment-history", queryParams],
    queryFn: () => getMyPayments(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <PaymentHistoryTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default PaymentHistoryPage;
