import EventsList from "@/components/modules/Events/EventsList";
import EventSearch from "@/components/modules/Events/EventSearch";
import EventFilters from "@/components/modules/Events/EventFilters";
import QuickSortBar from "@/components/modules/Events/QuickSortBar";
import EventPagination from "@/components/modules/Events/EventPagination";
import ClearFilters from "@/components/modules/Events/ClearFilters";
import { getAllEvents, IMyEventsQueryParams } from "@/services/event.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const buildQueryParams = (urlParams: { [key: string]: string | string[] | undefined }): IMyEventsQueryParams => {
  return {
    searchTerm: urlParams.searchTerm as string | undefined,
    page: urlParams.page ? Number(urlParams.page) : 1,
    limit: urlParams.limit ? Number(urlParams.limit) : 12,
    sortBy: (urlParams.sortBy as string) || "startDate",
    sortOrder: (urlParams.sortOrder as "asc" | "desc") || "asc",
    status: "PUBLISHED",
    visibility: urlParams.visibility as string | undefined,
    categoryId: urlParams.categoryId as string | undefined,
    isFree: urlParams.isFree as string | undefined,
  };
};

interface EventsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const EventsPage = async ({ searchParams }: EventsPageProps) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["public-events", queryParams],
    queryFn: () => getAllEvents(queryParams),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="pt-40 pb-32 min-h-screen bg-[#f7faf7] relative">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Editorial Header */}
          <header className="mb-24">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h1 className="font-newsreader text-7xl md:text-9xl font-medium tracking-tight text-[#004337] leading-[0.8] mb-12">
                  The Curated <br/>Archive.
                </h1>
                <p className="text-[#3f4945] text-lg md:text-xl max-w-2xl font-light leading-relaxed opacity-80">
                  Discover a collection of exclusive editorial experiences, meticulously planned and artfully executed. Navigate by exclusivity, value, and vision.
                </p>
              </div>
              <div className="flex items-center gap-4 text-[#004337]/40">
                <span className="font-newsreader text-4xl italic">Vol. 01</span>
                <div className="h-px w-24 bg-[#004337]/10" />
              </div>
            </div>
          </header>

          <div className="flex flex-col gap-24">
            {/* Search & Filter Section */}
            <section className="bg-[#f1f4f1] rounded-[2.5rem] p-12 transition-all duration-500 shadow-[0_32px_64px_-16px_rgba(24,28,27,0.04)]">
              <div className="flex flex-col gap-12">
                <EventSearch />
                <EventFilters />
                <ClearFilters />
              </div>
            </section>

            {/* Event Grid & Pagination */}
            <section className="flex flex-col gap-20">
              <EventsList initialParams={queryParams} />
              <EventPagination />
            </section>
          </div>
        </div>

        {/* Floating Quick Sort Bar */}
        <QuickSortBar />
      </main>
    </HydrationBoundary>
  );
};

export default EventsPage;
