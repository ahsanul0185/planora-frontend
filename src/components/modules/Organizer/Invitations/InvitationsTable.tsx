"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { IEvent } from "@/types/event.types";
import { IInvitation, IInvitationQueryParams } from "@/types/invitation.types";
import { getEventInvitations } from "@/services/invitation.services";
import { useInvitationsColumns } from "./InvitationsColumns";

interface InvitationsTableProps {
  eventId: string;
  event: IEvent;
}

const INVITATIONS_FILTER_DEFINITIONS = [serverManagedFilter.single("status")];

const InvitationsTable = ({ eventId, event }: InvitationsTableProps) => {
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

  const { searchTermFromUrl, handleDebouncedSearchChange } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  });

  const { filterValues, handleFilterChange, clearAllFilters } = useServerManagedDataTableFilters({
    searchParams,
    definitions: INVITATIONS_FILTER_DEFINITIONS,
    updateParams,
  });

  const currentQueryParams: IInvitationQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      status: searchParams.get("status") || undefined,
    };
  }, [searchParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["event-invitations", eventId, currentQueryParams],
    queryFn: () => getEventInvitations(eventId, currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const filterConfigs = useMemo(() => [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Accepted", value: "ACCEPTED" },
        { label: "Declined", value: "DECLINED" },
        { label: "Revoked", value: "REVOKED" },
      ],
    },
  ], []);

  const columns = useInvitationsColumns(eventId);

  return (
    <>
      <DataTable<IInvitation>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="No invitations found for this event."
        search={{
          placeholder: "Search by email or name...",
          initialValue: searchTermFromUrl,
          debounceMs: 400,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
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
    </>
  );
};

export default InvitationsTable;
