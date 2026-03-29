"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyOrganizedEvents } from "@/services/event.services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ParticipantsTable from "./ParticipantsTable";
import { CalendarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ParticipantManager() {
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const { data, isFetching } = useQuery({
    queryKey: ["my-organized-events", { limit: 100 }],
    queryFn: () => getMyOrganizedEvents({ limit: 100 }),
    staleTime: 1000 * 60 * 5,
  });

  const events = data?.data || [];

  useEffect(() => {
    // Auto-select the first event if none is selected
    if (events.length > 0 && !selectedEventId) {
      setSelectedEventId(events[0].id);
    }
  }, [events, selectedEventId]);

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center">
            <CalendarIcon className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
            Participants
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4 max-w-sm">
        <h3 className="font-medium whitespace-nowrap">Select Event:</h3>
        <Select
          value={selectedEventId}
          onValueChange={setSelectedEventId}
          disabled={events.length === 0}
        >
          <SelectTrigger>
            <SelectValue placeholder={isFetching ? "Loading events..." : "Select an event to view participants"} />
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

      {events.length === 0 && !isFetching && (
        <div className="text-center p-8 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">You don't have any organized events yet.</p>
        </div>
      )}

      {selectedEventId && selectedEvent && (
        <div className="pt-4">
          <ParticipantsTable
            key={selectedEventId}
            eventId={selectedEventId}
            event={selectedEvent}
          />
        </div>
      )}
    </div>
  );
}
