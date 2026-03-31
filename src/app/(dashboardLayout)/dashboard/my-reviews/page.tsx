import MyReviewsTable from "@/components/modules/Participant/MyReviews/MyReviewsTable";
import { getMyReviews } from "@/services/review.services";
import { IReviewQueryParams } from "@/types/review.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";

export const metadata = {
  title: "My Reviews | Planora",
  description: "View all reviews you have written for events you attended.",
};

const buildQueryParams = (
  urlParams: { [key: string]: string | string[] | undefined }
): IReviewQueryParams => {
  return {
    page: urlParams.page ? Number(urlParams.page) : 1,
    limit: urlParams.limit ? Number(urlParams.limit) : 10,
    sortBy: (urlParams.sortBy as string) || "createdAt",
    sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
  };
};

const MyReviewsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-reviews", queryParams],
    queryFn: () => getMyReviews(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <Star className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My Reviews
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-13">
            All the reviews you&apos;ve written for events you attended
          </p>
        </div>

        {/* Table */}
        <MyReviewsTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default MyReviewsPage;
