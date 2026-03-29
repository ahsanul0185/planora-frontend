import EventsTable from "@/components/modules/Admin/Events/EventsTable";
import { getAllEvents } from "@/services/event.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Events Management | Admin Dashboard",
  description: "Monitor and manage all events across the platform.",
};

const EventsManagementPage = async () => {
  const queryClient = new QueryClient();

  const initialParams = {
    page: 1,
    limit: 10,
  };

  await queryClient.prefetchQuery({
    queryKey: ["all-events", initialParams],
    queryFn: () => getAllEvents(initialParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Events Management
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-14">
            Monitor all events, filter by category or status, and view detailed event information.
          </p>
        </div>

        <EventsTable initialParams={initialParams} />
      </div>
    </HydrationBoundary>
  );
};

export default EventsManagementPage;
