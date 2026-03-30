"use client";

import DataTable from "@/components/shared/table/DataTable";
import { IMyEventsQueryParams, getAllEvents } from "@/services/event.services";
import { getEventCategories } from "@/services/eventCategory.services";
import { IEvent } from "@/types/event.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { adminEventsColumns } from "./eventsColumns";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import ViewEventDialog from "../../Organizer/OrganizedEvents/ViewEventDialog";
import ToggleFeaturedDialog from "./ToggleFeaturedDialog";
import { Star } from "lucide-react";
import { useState } from "react";

interface EventsTableProps {
  initialParams: IMyEventsQueryParams;
}

const EVENT_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.single("visibility"),
  serverManagedFilter.single("categoryId"),
];

const EventsTable = ({ initialParams }: EventsTableProps) => {
  const searchParams = useSearchParams();

  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IEvent>();

  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false);
  const [featureEventSelection, setFeatureEventSelection] = useState<IEvent | null>(null);

  const handleToggleFeatureAction = (event: IEvent) => {
    setFeatureEventSelection(event);
    setIsFeatureDialogOpen(true);
  };

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
    definitions: EVENT_FILTER_DEFINITIONS,
    updateParams,
  });

  const currentQueryParams: IMyEventsQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || initialParams.searchTerm,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : initialParams.page,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : initialParams.limit,
      sortBy: searchParams.get("sortBy") || initialParams.sortBy,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || initialParams.sortOrder,
      status: searchParams.get("status") || initialParams.status,
      visibility: searchParams.get("visibility") || initialParams.visibility,
      categoryId: searchParams.get("categoryId") || initialParams.categoryId,
    };
  }, [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["all-events", currentQueryParams],
    queryFn: () => getAllEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const { data: categoryResponse } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
    staleTime: 1000 * 60 * 60,
  });
  const categories = categoryResponse?.data ?? [];

  const filterConfigs = useMemo(() => [
    {
      id: "status",
      label: "Status",
      options: [
        { label: "Published", value: "PUBLISHED" },
        { label: "Draft", value: "DRAFT" },
        { label: "Cancelled", value: "CANCELLED" },
        { label: "Ended", value: "ENDED" },
      ],
    },
    {
      id: "visibility",
      label: "Visibility",
      options: [
        { label: "Public", value: "PUBLIC" },
        { label: "Private", value: "PRIVATE" },
      ],
    },
    {
      id: "categoryId",
      label: "Category",
      options: categories.map((c) => ({ label: c.name, value: c.id })),
    }
  ], [categories]);

  return (
    <>
      <DataTable<IEvent>
        data={data?.data ?? []}
        columns={adminEventsColumns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="No events found matching your criteria."
        search={{
          placeholder: "Search events by title or organizer...",
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
        actions={{
          onView: tableActions.onView,
          customActions: [
            {
              label: (data) => (data.isFeatured ? "Remove from Featured" : "Add to Featured"),
              icon: Star,
              onClick: handleToggleFeatureAction,
            },
          ],
        }}
      />

      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingItem}
      />

      <ToggleFeaturedDialog
        isOpen={isFeatureDialogOpen}
        onClose={() => setIsFeatureDialogOpen(false)}
        event={featureEventSelection}
      />
    </>
  );
};

export default EventsTable;
