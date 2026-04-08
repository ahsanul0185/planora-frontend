import BookmarksTable from "@/components/modules/Participant/Bookmarks/BookmarksTable";
import { getMyBookmarks } from "@/services/bookmark.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";

export const metadata = {
  title: "My Bookmarks | Planora",
  description: "View and manage your saved events.",
};

const BookmarksPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-bookmarks"],
    queryFn: () => getMyBookmarks(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <Bookmark className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My Bookmarks
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-13">
            Keep track of events you are interested in — save them for later and never miss an update
          </p>
        </div>

        <BookmarksTable />
      </div>
    </HydrationBoundary>
  );
};

export default BookmarksPage;
