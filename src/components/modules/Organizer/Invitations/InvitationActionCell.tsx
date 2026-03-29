"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Ban } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { IInvitation } from "@/types/invitation.types";
import { revokeInvitation } from "@/services/invitation.services";

interface InvitationActionCellProps {
  invitation: IInvitation;
  eventId: string;
}

export const InvitationActionCell = ({ invitation, eventId }: InvitationActionCellProps) => {
  const queryClient = useQueryClient();
  const [isRevokeAlertOpen, setIsRevokeAlertOpen] = useState(false);

  const { mutate: handleRevoke, isPending: isRevoking } = useMutation({
    mutationFn: (id: string) => revokeInvitation(id),
    onSuccess: () => {
      toast.success("Invitation revoked successfully of " + invitation.receiverEmail);
      queryClient.invalidateQueries({ queryKey: ["event-invitations", eventId] });
      setIsRevokeAlertOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to revoke invitation");
    },
  });

  const canRevoke = invitation.status === "PENDING";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsRevokeAlertOpen(true)}
            disabled={!canRevoke}
            className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
          >
            <Ban className="mr-2 h-4 w-4" />
            Revoke Invitation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Revoke Confirmation Dialog */}
      <AlertDialog open={isRevokeAlertOpen} onOpenChange={setIsRevokeAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately revoke the invitation sent to <span className="font-semibold text-foreground">{invitation.receiverEmail}</span>. They will no longer be able to accept it and join your event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRevoking}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => handleRevoke(invitation.id)}
              disabled={isRevoking}
            >
              {isRevoking ? "Revoking..." : "Revoke Invitation"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
