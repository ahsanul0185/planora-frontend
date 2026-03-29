"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { IInvitation, InvitationStatus } from "@/types/invitation.types";
import { Badge } from "@/components/ui/badge";
import { InvitationActionCell } from "./InvitationActionCell";
import { getInvitationStatusColor } from "@/lib/statusColorUtils";

export const useInvitationsColumns = (eventId: string) => {
  return useMemo<ColumnDef<IInvitation>[]>(() => {
    const columns: ColumnDef<IInvitation>[] = [
      {
        accessorKey: "receiverEmail",
        header: "Invitee",
        cell: ({ row }) => {
          const receiverEmail = row.getValue("receiverEmail") as string;
          const receiver = row.original.receiver;

          return (
            <div className="flex items-center gap-3">
              {receiver ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={receiver.image || ""} alt={receiver.name} />
                  <AvatarFallback>{receiver.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary uppercase">
                  {receiverEmail.charAt(0)}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-medium truncate max-w-[200px]">
                  {receiver ? receiver.name : receiverEmail}
                </span>
                {receiver && (
                  <span className="text-xs text-muted-foreground">{receiverEmail}</span>
                )}
              </div>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as InvitationStatus;
          return (
            <Badge variant="outline" className={`font-semibold shrink-0 ${getInvitationStatusColor(status)}`}>
              {status}
            </Badge>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: "Sent At",
        cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM dd, yyyy"),
      },
      {
        id: "actions",
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-end">
            <InvitationActionCell invitation={row.original} eventId={eventId} />
          </div>
        ),
        enableSorting: false,
      },
    ];

    return columns;
  }, [eventId]);
};
