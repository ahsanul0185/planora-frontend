"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOrganizedEvents } from "@/services/event.services";
import { getEventReviews } from "@/services/review.services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, StarIcon } from "lucide-react";
import { format } from "date-fns";
import { IReview } from "@/types/review.types";

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
    <span className="ml-1.5 text-xs font-medium text-muted-foreground">({rating}/5)</span>
  </div>
);

export default function ReviewManager() {
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const { data: eventsData, isFetching: isLoadingEvents } = useQuery({
    queryKey: ["my-organized-events", { limit: 100 }],
    queryFn: () => getMyOrganizedEvents({ limit: 100 }),
    staleTime: 1000 * 60 * 5,
  });

  const events = eventsData?.data || [];

  useEffect(() => {
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  const { data: reviewsData, isFetching: isLoadingReviews } = useQuery({
    queryKey: ["event-reviews", selectedEventId],
    queryFn: () => getEventReviews(selectedEventId),
    enabled: !!selectedEventId,
    staleTime: 1000 * 60 * 5,
  });

  const reviews: IReview[] = reviewsData?.data || [];
  const averageRating = (reviewsData?.meta as any)?.averageRating as number | null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center">
            <StarIcon className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
            Reviews
          </h1>
        </div>

        {averageRating !== null && averageRating !== undefined && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-muted/30">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-sm">{averageRating}</span>
            <span className="text-xs text-muted-foreground">avg. rating</span>
            <span className="text-xs text-muted-foreground">· {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Event Selector */}
      <div className="flex items-center space-x-4 max-w-sm">
        <h3 className="font-medium whitespace-nowrap">Select Event:</h3>
        <Select
          value={selectedEventId}
          onValueChange={setSelectedEventId}
          disabled={events.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder={isLoadingEvents ? "Loading events..." : "Select an event"} />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {events.length === 0 && !isLoadingEvents ? (
        <div className="text-center p-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">You don&apos;t have any organized events yet.</p>
        </div>
      ) : selectedEventId ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reviewer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Edit Deadline</TableHead>
                <TableHead>Posted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingReviews ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Loading reviews...
                  </TableCell>
                </TableRow>
              ) : reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No reviews yet for this event.
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => {
                  const deadlineExpired = review.editDeadline
                    ? new Date() > new Date(review.editDeadline)
                    : true;

                  return (
                    <TableRow key={review.id}>
                      {/* Reviewer */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.user.image || ""} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium truncate max-w-[140px]">{review.user.name}</span>
                        </div>
                      </TableCell>

                      {/* Rating */}
                      <TableCell>
                        <StarRating rating={review.rating} />
                      </TableCell>

                      {/* Review body */}
                      <TableCell className="max-w-[300px]">
                        {review.body ? (
                          <p className="text-sm truncate" title={review.body}>
                            {review.body}
                          </p>
                        ) : (
                          <span className="text-xs italic text-muted-foreground">No comment</span>
                        )}
                      </TableCell>

                      {/* Edit deadline */}
                      <TableCell>
                        {review.editDeadline ? (
                          <Badge
                            variant="outline"
                            className={
                              deadlineExpired
                                ? "text-muted-foreground border-muted text-xs"
                                : "text-amber-700 border-amber-300 bg-amber-50 dark:bg-amber-950/30 text-xs"
                            }
                          >
                            {deadlineExpired
                              ? "Expired"
                              : format(new Date(review.editDeadline), "MMM dd, yyyy")}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </TableCell>

                      {/* Posted at */}
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
