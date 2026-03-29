import MyJoinedEventsTable from "@/components/modules/Participant/MyJoinedEvents/MyJoinedEventsTable";
import { getMyJoinedEvents } from "@/services/user.services";
import { IMyJoinedEventsQueryParams } from "@/types/participant.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Ticket } from "lucide-react";

const buildQueryParams = (
  urlParams: { [key: string]: string | string[] | undefined }
): IMyJoinedEventsQueryParams => {
  return {
    searchTerm: urlParams.searchTerm as string | undefined,
    page: urlParams.page ? Number(urlParams.page) : 1,
    limit: urlParams.limit ? Number(urlParams.limit) : 10,
    sortBy: (urlParams.sortBy as string) || "joinedAt",
    sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
  };
};

const MyEventsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-joined-events", queryParams],
    queryFn: () => getMyJoinedEvents(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <Ticket className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My Events
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-13">
            All the events you&apos;ve joined or requested to join
          </p>
        </div>

        {/* Table */}
        <MyJoinedEventsTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default MyEventsPage;
