"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.types";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-3.5 w-3.5 ${
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted-foreground/30"
        }`}
      />
    ))}
    <span className="ml-1.5 text-xs font-medium text-muted-foreground">
      ({rating}/5)
    </span>
  </div>
);

export const myReviewsColumns: ColumnDef<IReview>[] = [
  {
    accessorKey: "event.title",
    header: "Event",
    enableSorting: false,
    cell: ({ row }) => {
      const event = row.original.event;
      if (!event)
        return <span className="text-muted-foreground text-sm">—</span>;
      return (
        <span className="font-medium text-sm leading-tight line-clamp-2 max-w-[240px] block">
          {event.title}
        </span>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    enableSorting: false,
    cell: ({ row }) => <StarRating rating={row.original.rating} />,
  },
  {
    accessorKey: "body",
    header: "Review",
    enableSorting: false,
    cell: ({ row }) => {
      const body = row.original.body;
      return body ? (
        <p className="text-sm truncate max-w-[300px]" title={body}>
          {body}
        </p>
      ) : (
        <span className="text-xs italic text-muted-foreground">No comment</span>
      );
    },
  },
  {
    accessorKey: "editDeadline",
    header: "Edit Window",
    enableSorting: false,
    cell: ({ row }) => {
      const deadline = row.original.editDeadline;
      if (!deadline)
        return <span className="text-muted-foreground text-xs">—</span>;

      const expired = new Date() > new Date(deadline);
      return (
        <Badge
          variant="outline"
          className={
            expired
              ? "text-muted-foreground border-muted text-xs"
              : "text-amber-700 border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-xs"
          }
        >
          {expired ? "Expired" : "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "event.startDate",
    header: "Event Date",
    enableSorting: false,
    cell: ({ row }) => {
      const date = row.original.event?.startDate;
      return date ? (
        <DateCell date={date} />
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Reviewed On",
    enableSorting: false,
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
