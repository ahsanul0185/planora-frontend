import AdminReviewsTable from "@/components/modules/Admin/Reviews/AdminReviewsTable";
import { getAllReviews } from "@/services/review.services";
import { IReviewQueryParams } from "@/types/review.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { MessageSquareQuote } from "lucide-react";

export const metadata = {
  title: "Reviews Management | Admin Dashboard",
  description: "Monitor and manage all platform reviews and feedback.",
};

const buildQueryParams = (
  urlParams: { [key: string]: string | string[] | undefined }
): IReviewQueryParams => ({
  page: urlParams.page ? Number(urlParams.page) : 1,
  limit: urlParams.limit ? Number(urlParams.limit) : 10,
  sortBy: (urlParams.sortBy as string) || "createdAt",
  sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
});

const ReviewsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-reviews", queryParams],
    queryFn: () => getAllReviews(queryParams),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
              <MessageSquareQuote className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Platform Reviews
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-14">
            A comprehensive look at all the platform-wide reviews and feedback provided by participants.
          </p>
        </div>

        <AdminReviewsTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default ReviewsManagementPage;
