import UsersTable from "@/components/modules/Admin/Users/UsersTable";
import { getAllUsers } from "@/services/admin.services";
import { IUserQueryParams } from "@/types/user.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UsersRound } from "lucide-react";

export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Global user directory and platform access controls.",
};

const buildQueryParams = (
  urlParams: { [key: string]: string | string[] | undefined }
): IUserQueryParams => ({
  page: urlParams.page ? Number(urlParams.page) : 1,
  limit: urlParams.limit ? Number(urlParams.limit) : 10,
  sortBy: (urlParams.sortBy as string) || "createdAt",
  sortOrder: (urlParams.sortOrder as "asc" | "desc") || "desc",
  searchTerm: (urlParams.searchTerm as string) || undefined,
  status: (urlParams.status as any) || undefined,
});

const AdminUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin-users", queryParams],
    queryFn: () => getAllUsers(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
              <UsersRound className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              All Users
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-14">
            Manage global platform access, edit statuses, and review participant accounts.
          </p>
        </div>

        <UsersTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default AdminUsersPage;
