"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IInvitation, InvitationStatus } from "@/types/invitation.types";
import { ColumnDef } from "@tanstack/react-table";
import { Monitor, MapPin } from "lucide-react";

const statusConfig: Record<
  InvitationStatus,
  { label: string; className: string }
> = {
  ACCEPTED: {
    label: "Accepted",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  },
  DECLINED: {
    label: "Declined",
    className:
      "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400",
  },
  REVOKED: {
    label: "Revoked",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
  },
};

export const pendingInvitationsColumns: ColumnDef<IInvitation>[] = [
  {
    accessorKey: "event.title",
    header: "Event",
    enableSorting: false,
    cell: ({ row }) => {
      const event = row.original.event;
      if (!event) return <span className="text-muted-foreground text-sm">—</span>;
      return (
        <div className="flex flex-col gap-1 max-w-[240px]">
          <span className="font-medium text-sm leading-tight line-clamp-2">
            {event.title}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {event.isOnline ? (
              <Monitor className="h-3 w-3 shrink-0" />
            ) : (
              <MapPin className="h-3 w-3 shrink-0" />
            )}
            <span className="truncate">
              {event.isOnline ? "Online" : (event.venueName ?? "In-person")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sender.name",
    header: "Invited By",
    enableSorting: false,
    cell: ({ row }) => {
      const sender = row.original.sender;
      return (
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {sender?.name ?? "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "event.registrationFee",
    header: "Fee",
    enableSorting: false,
    cell: ({ row }) => {
      const fee = row.original.event?.registrationFee;
      if (fee === 0 || fee == null) {
        return <span className="text-sm text-emerald-600 font-medium">Free</span>;
      }
      return <span className="text-sm font-medium">
        ${fee.toFixed(2)} {row.original.event?.currency || "USD"}
      </span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const s = row.original.status;
      const cfg = statusConfig[s];
      return (
        <Badge
          variant="outline"
          className={`text-xs font-semibold ${cfg?.className ?? ""}`}
        >
          {cfg?.label ?? s}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Received",
    enableSorting: false,
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
