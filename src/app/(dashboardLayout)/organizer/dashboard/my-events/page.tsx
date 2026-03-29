
import MyEventsTable from "@/components/modules/Organizer/OrganizedEvents/MyEventsTable";
import { getMyOrganizedEvents, IMyEventsQueryParams } from "@/services/event.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";

const buildQueryParams = (urlParams: { [key: string]: string | string[] | undefined }): IMyEventsQueryParams => {
  return {
    searchTerm: urlParams.searchTerm as string | undefined,
    page: urlParams.page ? Number(urlParams.page) : 1,
    limit: urlParams.limit ? Number(urlParams.limit) : 10,
    sortBy: (urlParams.sortBy as string) || "startDate",
    sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
    status: urlParams.status as string | undefined,
    visibility: urlParams.visibility as string | undefined,
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
    queryKey: ["my-organized-events", queryParams],
    queryFn: () => getMyOrganizedEvents(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">My Events</h1>
          </div>
          {/* <p className="text-muted-foreground text-sm font-medium pl-13">
              Manage and track all your organized events
          </p> */}
        </div>

        {/* Table */}
        <MyEventsTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default MyEventsPage;