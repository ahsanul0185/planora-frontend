"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getAllReviews } from "@/services/review.services";
import { IReview, IReviewQueryParams } from "@/types/review.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { adminReviewsColumns } from "./adminReviewsColumns";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";

interface AdminReviewsTableProps {
  initialParams: IReviewQueryParams;
}

const AdminReviewsTable = ({ initialParams }: AdminReviewsTableProps) => {
  const searchParams = useSearchParams();

  const {
    optimisticPaginationState,
    isRouteRefreshPending,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentQueryParams: IReviewQueryParams = useMemo(() => {
    return {
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : initialParams.page,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : initialParams.limit,
      sortBy: initialParams.sortBy,
      sortOrder: initialParams.sortOrder,
    };
  }, [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["admin-reviews", currentQueryParams],
    queryFn: () => getAllReviews(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  return (
    <DataTable<IReview>
      data={data?.data ?? []}
      columns={adminReviewsColumns}
      isLoading={isFetching || isRouteRefreshPending}
      meta={data?.meta}
      emptyMessage="No reviews found across the platform."
      pagination={{
        state: optimisticPaginationState,
        onPaginationChange: handlePaginationChange,
      }}
    />
  );
};

export default AdminReviewsTable;
