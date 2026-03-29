"use client";

import DataTable from "@/components/shared/table/DataTable";
import {
  IParticipantsQueryParams,
  IParticipation,
} from "@/types/participation.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { getEventParticipants } from "@/services/participation.services";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useParticipantsColumns } from "./ParticipantsColumns";
import { IEvent } from "@/types/event.types";

interface ParticipantsTableProps {
  eventId: string;
  event: IEvent;
}

const PARTICIPANTS_FILTER_DEFINITIONS = [serverManagedFilter.single("status")];

const ParticipantsTable = ({ eventId, event }: ParticipantsTableProps) => {
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
    definitions: PARTICIPANTS_FILTER_DEFINITIONS,
    updateParams,
  });

  const currentQueryParams: IParticipantsQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
      sortBy: searchParams.get("sortBy") || "joinedAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      // Don't default to PENDING status filter as it causes participants to disappear after action.
      status: searchParams.get("status") || undefined,
    };
  }, [searchParams, event.visibility]);

  const { data, isFetching } = useQuery({
    queryKey: ["event-participants", eventId, currentQueryParams],
    queryFn: () => getEventParticipants(eventId, currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const filterConfigs = useMemo(() => [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "PENDING" },
        { label: "Approved", value: "APPROVED" },
        { label: "Confirmed", value: "CONFIRMED" },
        { label: "Rejected", value: "REJECTED" },
        { label: "Banned", value: "BANNED" },
        { label: "Cancelled", value: "CANCELLED" },
      ],
    },
  ], []);

  const columns = useParticipantsColumns(eventId, event);

  return (
    <>
      <DataTable<IParticipation>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="No participants found for this event."
        search={{
          placeholder: "Search by participant name or email...",
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
        // No top-level actions required here since we use row-level actions
      />
    </>
  );
};

export default ParticipantsTable;
