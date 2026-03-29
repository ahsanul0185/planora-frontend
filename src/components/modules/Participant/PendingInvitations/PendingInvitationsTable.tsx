"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import {
  acceptInvitation,
  declineInvitation,
  getMyInvitations,
  payAndAcceptInvitation,
} from "@/services/invitation.services";
import { IInvitation, IInvitationQueryParams } from "@/types/invitation.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, CreditCard, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { pendingInvitationsColumns } from "./pendingInvitationsColumns";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
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

interface PendingInvitationsTableProps {
  initialParams: IInvitationQueryParams;
}

const PendingInvitationsTable = ({ initialParams }: PendingInvitationsTableProps) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // Modal states for standard View action and Decline action via Dropdown 
  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } =
    useRowActionModalState<IInvitation>({
      enableView: true,
      enableEdit: false,
      enableDelete: true, // "delete" hijacked for "Decline" via ... menu
    });

  const [decliningItem, setDecliningItem] = useState<IInvitation | null>(null);
  const [isDeclining, setIsDeclining] = useState(false);

  // States for inline Accept / Pay 
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Note: Only pagination is hooked in, search/sorting are omitted by omitting the props to DataTable
  const {
    optimisticPaginationState,
    isRouteRefreshPending,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentQueryParams: IInvitationQueryParams = useMemo(
    () => ({
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : initialParams.page,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : initialParams.limit,
    }),
    [searchParams, initialParams]
  );

  const { data, isFetching } = useQuery({
    queryKey: ["my-invitations", currentQueryParams],
    queryFn: () => getMyInvitations(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const customTableActions = useMemo(
    () => ({
      ...tableActions,
      labels: {
        view: "View Event Details",
        delete: "Decline Invitation",
      },
      onDelete: (row: IInvitation) => {
        if (row.status !== "PENDING") {
          toast.error(`Cannot decline an invitation that is already ${row.status.toLowerCase()}`);
          return;
        }
        setDecliningItem(row);
      },
    }),
    [tableActions]
  );

  const handleConfirmDecline = useCallback(async () => {
    if (!decliningItem) return;
    setIsDeclining(true);
    try {
      await declineInvitation(decliningItem.id);
      toast.success("Invitation declined.");
      queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
      setDecliningItem(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to decline.");
    } finally {
      setIsDeclining(false);
    }
  }, [decliningItem, queryClient]);

  const handleAccept = useCallback(async (invitation: IInvitation) => {
    setProcessingId(invitation.id);
    const isPaid = (invitation.event?.registrationFee ?? 0) > 0;

    try {
      if (isPaid) {
        // Pay & Accept
        const res = await payAndAcceptInvitation(invitation.id);
        const paymentUrl = res.data?.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl; // Redirect to Stripe
        }
      } else {
        // Free event -> just Accept
        await acceptInvitation(invitation.id);
        toast.success("Invitation accepted! You have joined the event.");
        queryClient.invalidateQueries({ queryKey: ["my-invitations"] });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to accept invitation.");
    } finally {
      setProcessingId(null);
    }
  }, [queryClient]);

  const columnsWithAcceptAction = useMemo(
    () => [
      ...pendingInvitationsColumns,
      {
        id: "accept_action",
        header: "",
        enableSorting: false,
        cell: ({ row }: { row: { original: IInvitation } }) => {
          const inv = row.original;
          if (inv.status !== "PENDING") return null;

          const isPaid = (inv.event?.registrationFee ?? 0) > 0;
          const isProcessing = processingId === inv.id;

          return (
            <Button
              size="sm"
              className={`gap-1.5 text-xs h-8 px-3 ${
                isPaid ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"
              } text-white`}
              onClick={() => handleAccept(inv)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span className="flex items-center gap-1.5">
                  <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </span>
              ) : isPaid ? (
                <>
                  <CreditCard className="h-3.5 w-3.5" />
                  Pay & Accept
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Accept
                </>
              )}
            </Button>
          );
        },
      },
    ],
    [handleAccept, processingId]
  );

  const viewingEvent = viewingItem?.event ?? null;

  return (
    <>
      <DataTable<IInvitation>
        data={data?.data ?? []}
        columns={columnsWithAcceptAction}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="You have no pending invitations."
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        actions={customTableActions}
      />

      {/* View Event Details */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingEvent as IEvent | null}
      />

      {/* Decline Confirmation */}
      <AlertDialog
        open={!!decliningItem}
        onOpenChange={(open) => {
          if (!open) setDecliningItem(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Decline Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to decline this invitation to{" "}
              <span className="font-semibold text-foreground">
                &quot;{decliningItem?.event?.title}&quot;
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeclining}>Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDecline}
              disabled={isDeclining}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeclining ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Declining...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  Decline
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PendingInvitationsTable;
