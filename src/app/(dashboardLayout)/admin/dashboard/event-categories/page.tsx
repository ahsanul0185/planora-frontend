import CategoryTable from "@/components/modules/Admin/Category/CategoryTable";
import { getEventCategories } from "@/services/eventCategory.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { LayoutGrid } from "lucide-react";

export const metadata = {
  title: "Event Categories | Admin Dashboard",
  description: "Manage event categories and their icons.",
};

const CategoriesManagementPage2 = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["event-categories"],
    queryFn: () => getEventCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
              <LayoutGrid className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Event Categories
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-14">
            Create, edit, and manage categories for platform events.
          </p>
        </div>

        <CategoryTable />
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesManagementPage2;
