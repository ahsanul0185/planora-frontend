"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IReview } from "@/types/review.types";
import { Star } from "lucide-react";
import { useMemo } from "react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-3.5 w-3.5 ${
          star <= rating
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted"
        }`}
      />
    ))}
    <span className="ml-1 text-xs font-medium text-muted-foreground">({rating}/5)</span>
  </div>
);

export const useReviewColumns = () => {
  return useMemo<ColumnDef<IReview>[]>(() => [
    {
      accessorKey: "user",
      header: "Reviewer",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-medium truncate max-w-[150px]">{user.name}</span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => <StarRating rating={row.getValue("rating")} />,
    },
    {
      accessorKey: "body",
      header: "Review",
      cell: ({ row }) => {
        const body = row.getValue("body") as string | null;
        if (!body) return <span className="text-xs italic text-muted-foreground">No comment</span>;
        return (
          <p className="text-sm max-w-[350px] truncate" title={body}>
            {body}
          </p>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "editDeadline",
      header: "Edit Deadline",
      cell: ({ row }) => {
        const deadline = row.getValue("editDeadline") as string | null;
        if (!deadline) return <span className="text-xs text-muted-foreground">—</span>;
        const expired = new Date() > new Date(deadline);
        return (
          <Badge
            variant="outline"
            className={expired
              ? "text-muted-foreground border-muted"
              : "text-amber-700 border-amber-300 bg-amber-50 dark:bg-amber-950/30"}
          >
            {expired ? "Expired" : format(new Date(deadline), "MMM dd, yyyy")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Posted At",
      cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM dd, yyyy"),
    },
  ], []);
};
