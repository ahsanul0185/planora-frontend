"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { IReview } from "@/types/review.types";
import { ColumnDef } from "@tanstack/react-table";
import { Star, User } from "lucide-react";
import Image from "next/image";

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

export const adminReviewsColumns: ColumnDef<IReview>[] = [
  {
    accessorKey: "user.name",
    header: "Reviewer",
    enableSorting: false,
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-muted flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground leading-none">
              {user?.name || "Unknown User"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "event.title",
    header: "Event",
    enableSorting: false,
    cell: ({ row }) => {
      const event = row.original.event;
      if (!event)
        return <span className="text-muted-foreground text-sm">—</span>;
      return (
        <span className="font-medium text-sm leading-tight line-clamp-2 max-w-[200px] block">
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
        <p className="text-sm truncate max-w-[250px]" title={body}>
          {body}
        </p>
      ) : (
        <span className="text-xs italic text-muted-foreground">No comment</span>
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
