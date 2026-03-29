"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IParticipation, ParticipationStatus } from "@/types/participation.types";
import { ColumnDef } from "@tanstack/react-table";
import { Globe, Lock, Monitor, MapPin } from "lucide-react";

const participationStatusConfig: Record<
  ParticipationStatus,
  { label: string; className: string }
> = {
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
  },
  APPROVED: {
    label: "Approved",
    className:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
  },
  PENDING: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  },
  REJECTED: {
    label: "Rejected",
    className:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
  },
  BANNED: {
    label: "Banned",
    className:
      "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-zinc-50 text-zinc-500 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400",
  },
};

export const myJoinedEventsColumns: ColumnDef<IParticipation>[] = [
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
    accessorKey: "event.category",
    header: "Category",
    enableSorting: false,
    cell: ({ row }) => {
      const category = row.original.event?.category;
      return (
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {category?.name ?? "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const s = row.original.status;
      const cfg = participationStatusConfig[s];
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
    accessorKey: "event.visibility",
    header: "Visibility",
    enableSorting: false,
    cell: ({ row }) => {
      const visibility = row.original.event?.visibility;
      if (!visibility) return <span className="text-muted-foreground text-sm">—</span>;
      const isPublic = visibility === "PUBLIC";
      return (
        <Badge variant="outline" className="gap-1">
          {isPublic ? (
            <Globe className="h-3 w-3" />
          ) : (
            <Lock className="h-3 w-3" />
          )}
          <span className="capitalize text-xs">{visibility.toLowerCase()}</span>
        </Badge>
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
      return <span className="text-sm font-medium">${fee.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "event.startDate",
    header: "Event Date",
    enableSorting: false,
    cell: ({ row }) => {
      const date = row.original.event?.startDate;
      return date ? <DateCell date={date} /> : <span className="text-muted-foreground text-sm">—</span>;
    },
  },
  {
    accessorKey: "joinedAt",
    header: "Joined",
    enableSorting: false,
    cell: ({ row }) => <DateCell date={row.original.joinedAt} />,
  },
];
