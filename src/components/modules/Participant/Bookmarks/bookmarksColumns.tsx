"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { IBookmark } from "@/types/bookmark.types";
import { ColumnDef } from "@tanstack/react-table";
import { Monitor, MapPin } from "lucide-react";

export const bookmarksColumns: ColumnDef<IBookmark>[] = [
  {
    accessorKey: "event.title",
    header: "Event",
    enableSorting: false,
    cell: ({ row }) => {
      const event = row.original.event;
      return (
        <div className="flex flex-col gap-1 max-w-[300px]">
          <span className="font-medium text-sm leading-tight line-clamp-2 text-foreground">
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
    accessorKey: "event.registrationFee",
    header: "Fee",
    enableSorting: false,
    cell: ({ row }) => {
      const fee = row.original.event.registrationFee;
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
      const date = row.original.event.startDate;
      return date ? (
        <DateCell date={date} />
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      );
    },
  },
];
