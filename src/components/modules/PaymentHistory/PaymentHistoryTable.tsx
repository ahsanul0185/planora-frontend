"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { getMyPayments } from "@/services/payment.services";
import { IPayment, IPaymentQueryParams } from "@/types/payment.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { paymentColumns } from "./paymentColumns";

interface PaymentHistoryTableProps {
  initialParams: IPaymentQueryParams;
}

const PAYMENT_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
];

const PaymentHistoryTable = ({ initialParams }: PaymentHistoryTableProps) => {
  const searchParams = useSearchParams();

  const {
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const { filterValues, handleFilterChange, clearAllFilters } = useServerManagedDataTableFilters({
    searchParams,
    definitions: PAYMENT_FILTER_DEFINITIONS,
    updateParams,
  });

  const currentQueryParams: IPaymentQueryParams = useMemo(() => ({
    page: searchParams.get("page") ? Number(searchParams.get("page")) : initialParams.page,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : initialParams.limit,
    sortBy: searchParams.get("sortBy") || initialParams.sortBy || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || initialParams.sortOrder || "desc",
    status: (searchParams.get("status") as any) || initialParams.status,
  }), [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["payment-history", currentQueryParams],
    queryFn: () => getMyPayments(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const filterConfigs = useMemo(() => [
    {
      id: "status",
      label: "Payment Status",
      options: [
        { label: "Completed", value: "COMPLETED" },
        { label: "Pending", value: "PENDING" },
        { label: "Failed", value: "FAILED" },
      ],
    },
  ], []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment History</h2>
          <p className="text-muted-foreground">
            View and manage your transaction records and invoices.
          </p>
        </div>
      </div>

      <DataTable<IPayment>
        data={data?.data ?? []}
        columns={paymentColumns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="No payment records found."
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
      />
    </div>
  );
};

export default PaymentHistoryTable;
