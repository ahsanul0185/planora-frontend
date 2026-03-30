"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { IMyEventsQueryParams, deleteEvent, getMyOrganizedEvents } from "@/services/event.services";
import { getEventCategories } from "@/services/eventCategory.services";
import { IEvent } from "@/types/event.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useMemo } from "react";
import { toast } from "sonner";
import { myEventsColumns } from "./myEventsColumns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import ViewEventDialog from "./ViewEventDialog";

interface MyEventsTableProps {
  initialParams: IMyEventsQueryParams;
}

const EVENT_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.single("visibility"),
  serverManagedFilter.single("categoryId"),
];

const MyEventsTable = ({ initialParams }: MyEventsTableProps) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const {
    viewingItem,
    editingItem,
    deletingItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IEvent>();

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
    queryKey: ["my-organized-events", currentQueryParams],
    queryFn: () => getMyOrganizedEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const { data: categoryResponse } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
    staleTime: 1000 * 60 * 60,
  });
  const categories = categoryResponse?.data ?? [];

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!deletingItem) return;
    setIsDeleting(true);
    try {
      await deleteEvent(deletingItem.id);
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-organized-events"] });
      onDeleteOpenChange(false);
    } catch {
      toast.error("Failed to delete event");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingItem, queryClient, onDeleteOpenChange]);

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
        columns={myEventsColumns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="You haven't created any events yet."
        toolbarAction={
          <Button size="sm" onClick={() => setIsCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        }
        search={{
          placeholder: "Search events...",
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
        actions={tableActions}
      />

      <CreateEventModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        categories={categories}
      />

      <EditEventModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        event={editingItem}
        categories={categories}
      />

      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingItem}
        hideOrganizer
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onDeleteOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">&quot;{deletingItem?.title}&quot;</span>?
              This action cannot be undone. All participants will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyEventsTable;
