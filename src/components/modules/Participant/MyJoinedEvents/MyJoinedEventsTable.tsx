"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getMyJoinedEvents } from "@/services/user.services";
import { IMyJoinedEventsQueryParams } from "@/types/participant.types";
import { IParticipation } from "@/types/participation.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { myJoinedEventsColumns } from "./myJoinedEventsColumns";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import ViewEventDialog from "@/components/modules/Organizer/OrganizedEvents/ViewEventDialog";
import { IEvent } from "@/types/event.types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import WriteReviewModal from "./WriteReviewModal";

interface MyJoinedEventsTableProps {
  initialParams: IMyJoinedEventsQueryParams;
}

const MyJoinedEventsTable = ({ initialParams }: MyJoinedEventsTableProps) => {
  const searchParams = useSearchParams();

  const [reviewingItem, setReviewingItem] = useState<IParticipation | null>(null);

  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IParticipation>({
    enableView: true,
    enableEdit: false,
    enableDelete: false,
  });

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

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const currentQueryParams: IMyJoinedEventsQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || initialParams.searchTerm,
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : initialParams.page,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : initialParams.limit,
      sortBy: searchParams.get("sortBy") || initialParams.sortBy,
      sortOrder:
        (searchParams.get("sortOrder") as "asc" | "desc") ||
        initialParams.sortOrder,
    };
  }, [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["my-joined-events", currentQueryParams],
    queryFn: () => getMyJoinedEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const columnsWithReviewAction = useMemo(() => [
    ...myJoinedEventsColumns,
    {
      id: "review_action",
      header: "",
      enableSorting: false,
      cell: ({ row }: { row: { original: IParticipation } }) => {
        const part = row.original;
        const event = part.event;
        if (!event) return null;

        const isConfirmed = part.status === "CONFIRMED";
        const hasStarted = new Date(event.startDate) <= new Date();
        const hasReviewed = event.reviews && event.reviews.length > 0;

        if (isConfirmed && hasStarted && !hasReviewed) {
          return (
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-xs border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/50 dark:text-amber-400"
              onClick={() => setReviewingItem(part)}
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              Write Review
            </Button>
          );
        }

        return null;
      },
    }
  ], []);

  // The viewing item is an IParticipation; we need the nested event for the dialog
  const viewingEvent = viewingItem?.event ?? null;

  return (
    <>
      <DataTable<IParticipation>
        data={data?.data ?? []}
        columns={columnsWithReviewAction}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="You haven't joined any events yet."
        search={{
          placeholder: "Search events...",
          initialValue: searchTermFromUrl,
          debounceMs: 400,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        actions={tableActions}
      />

      {/* View Event Details Dialog */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingEvent as IEvent | null}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        open={!!reviewingItem}
        onOpenChange={(open) => {
          if (!open) setReviewingItem(null);
        }}
        eventId={reviewingItem?.event?.id ?? null}
        eventTitle={reviewingItem?.event?.title ?? null}
      />
    </>
  );
};

export default MyJoinedEventsTable;
