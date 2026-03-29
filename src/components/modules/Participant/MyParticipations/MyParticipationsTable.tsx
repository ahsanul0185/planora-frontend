"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import {
  cancelParticipation,
  initiatePaymentForApprovedParticipation,
} from "@/services/participation.services";
import { getMyJoinedEvents } from "@/services/user.services";
import { IMyJoinedEventsQueryParams } from "@/types/participant.types";
import { IParticipation } from "@/types/participation.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CreditCard, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { myParticipationsColumns } from "./myParticipationsColumns";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
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
import ViewEventDialog from "@/components/modules/Organizer/OrganizedEvents/ViewEventDialog";
import { IEvent } from "@/types/event.types";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";

interface MyParticipationsTableProps {
  initialParams: IMyJoinedEventsQueryParams;
}

const MyParticipationsTable = ({ initialParams }: MyParticipationsTableProps) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // ── Modal state ──────────────────────────────────────────────
  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } =
    useRowActionModalState<IParticipation>({
      enableView: true,
      enableEdit: false,
      enableDelete: true, // "delete" = cancel
    });

  // Cancel confirmation state
  const [cancellingItem, setCancellingItem] = useState<IParticipation | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // Pay Now loading state (keyed by eventId)
  const [payingEventId, setPayingEventId] = useState<string | null>(null);

  // ── Table state (search / pagination / sort) ─────────────────
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
    useServerManagedDataTableSearch({ searchParams, updateParams });

  const currentQueryParams: IMyJoinedEventsQueryParams = useMemo(
    () => ({
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
    }),
    [searchParams, initialParams]
  );

  // ── Data fetching ────────────────────────────────────────────
  const { data, isFetching } = useQuery({
    queryKey: ["my-participations", currentQueryParams],
    queryFn: () => getMyJoinedEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  // ── Intercept the "delete" action to open cancel dialog ──────
  const customTableActions = useMemo(
    () => ({
      ...tableActions,
      labels: {
        view: "View Event",
        delete: "Cancel Participation",
      },
      onDelete: (row: IParticipation) => {
        // Only allow cancelling non-terminal statuses
        const nonCancellable: IParticipation["status"][] = ["CANCELLED", "BANNED", "REJECTED"];
        if (nonCancellable.includes(row.status)) {
          toast.error("This participation cannot be cancelled.");
          return;
        }
        setCancellingItem(row);
      },
    }),
    [tableActions]
  );

  // ── Cancel handler ────────────────────────────────────────────
  const handleConfirmCancel = useCallback(async () => {
    if (!cancellingItem) return;
    setIsCancelling(true);
    try {
      await cancelParticipation(cancellingItem.eventId);
      toast.success("Participation cancelled successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-participations"] });
      setCancellingItem(null);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ?? "Failed to cancel. Please try again."
      );
    } finally {
      setIsCancelling(false);
    }
  }, [cancellingItem, queryClient]);

  // ── Pay Now handler ────────────────────────────────────────────
  const handlePayNow = useCallback(async (eventId: string) => {
    setPayingEventId(eventId);
    try {
      const { paymentUrl } = await initiatePaymentForApprovedParticipation(eventId);
      if (paymentUrl) {
        window.location.href = paymentUrl; // redirect to Stripe
      }
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ?? "Failed to initiate payment. Please try again."
      );
    } finally {
      setPayingEventId(null);
    }
  }, []);

  // ── Extra column: Pay Now button (only for APPROVED rows) ─────
  const columnsWithPayAction = useMemo(
    () => [
      ...myParticipationsColumns,
      {
        id: "pay_action",
        header: "",
        enableSorting: false,
        cell: ({ row }: { row: { original: IParticipation } }) => {
          const p = row.original;
          if (p.status !== "APPROVED") return null;
          return (
            <Button
              size="sm"
              className="gap-1.5 text-xs h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handlePayNow(p.eventId)}
              disabled={payingEventId === p.eventId}
            >
              {payingEventId === p.eventId ? (
                <span className="flex items-center gap-1.5">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : (
                <>
                  <CreditCard className="h-3.5 w-3.5" />
                  Pay Now
                </>
              )}
            </Button>
          );
        },
      },
    ],
    [handlePayNow, payingEventId]
  );

  const viewingEvent = viewingItem?.event ?? null;

  return (
    <>
      <DataTable<IParticipation>
        data={data?.data ?? []}
        columns={columnsWithPayAction}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="You haven't requested to join any events yet."
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
        actions={customTableActions}
      />

      {/* View Event Dialog */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingEvent as IEvent | null}
      />

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={!!cancellingItem}
        onOpenChange={(open) => {
          if (!open) setCancellingItem(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Participation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your participation in{" "}
              <span className="font-semibold text-foreground">
                &quot;{cancellingItem?.event?.title}&quot;
              </span>
              ?{" "}
              {cancellingItem?.status === "CONFIRMED" &&
                "This will remove you from the event."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isCancelling}>
              Keep Participation
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={isCancelling}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isCancelling ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Cancelling...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Yes, Cancel
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyParticipationsTable;
