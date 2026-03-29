"use client";

import DateCell from "@/components/shared/cell/DateCell";
import EventStatusBadge from "@/components/shared/cell/EventStatusBadge";
import { Badge } from "@/components/ui/badge";
import { IEvent } from "@/types/event.types";
import { ColumnDef } from "@tanstack/react-table";
import { Globe, Lock, Monitor, MapPin, User } from "lucide-react";

export const adminEventsColumns: ColumnDef<IEvent>[] = [
  {
    accessorKey: "title",
    header: "Event",
    enableSorting: true,
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex flex-col gap-1 max-w-[260px]">
          <span className="font-medium text-sm leading-tight line-clamp-2">{event.title}</span>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {event.isOnline ? (
              <Monitor className="h-3 w-3 shrink-0" />
            ) : (
              <MapPin className="h-3 w-3 shrink-0" />
            )}
            <span className="truncate">{event.isOnline ? "Online" : (event.venueName ?? "In-person")}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "organizer",
    header: "Organizer",
    enableSorting: false,
    cell: ({ row }) => {
      const organizer = row.original.organizer;
      return (
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 overflow-hidden">
            {organizer?.image ? (
               <img src={organizer.image} alt={organizer.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-4 w-4" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{organizer?.name ?? "Unknown"}</span>
            <span className="text-[10px] text-muted-foreground truncate">{organizer?.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    enableSorting: false,
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {category?.name ?? "No Category"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => <EventStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "visibility",
    header: "Visibility",
    enableSorting: false,
    cell: ({ row }) => {
      const isPublic = row.original.visibility === "PUBLIC";
      return (
        <Badge variant={isPublic ? "outline" : "outline"} className="gap-1">
          {isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
          <span className="capitalize text-xs">{row.original.visibility.toLowerCase()}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    enableSorting: true,
    cell: ({ row }) => <DateCell date={row.original.startDate} />,
  },
  {
    accessorKey: "registrationFee",
    header: "Price",
    enableSorting: true,
    cell: ({ row }) => {
      const fee = row.original.registrationFee;
      if (fee === 0 || fee == null) {
        return <span className="text-sm text-green-600 font-medium">Free</span>;
      }
      return <span className="text-sm font-medium">${fee.toFixed(2)}</span>;
    },
  },
  {
    id: "participants",
    header: "Participants",
    enableSorting: false,
    cell: ({ row }) => {
      const count = row.original._count?.participations ?? 0;
      return (
        <div className="flex flex-col text-xs">
          <span className="font-medium text-sm">{count}</span>
          <span className="text-muted-foreground">Joined</span>
        </div>
      );
    },
  },
];
