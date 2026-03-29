import AdminsTable from "@/components/modules/Admin/Admins/AdminsTable";
import { getAllAdmins } from "@/services/admin.services";
import { getUserInfo } from "@/services/auth.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Admin Management | Admin Dashboard",
  description: "Manage administrator accounts and system access.",
};

const AdminsManagementPage = async () => {
  const queryClient = new QueryClient();
  const user = await getUserInfo();

  await queryClient.prefetchQuery({
    queryKey: ["admin-list"],
    queryFn: getAllAdmins,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-primary/10 rounded-full">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Admin Management
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-14">
            Manage administrative privileges, create new accounts, and control system-wide access.
          </p>
        </div>

        <AdminsTable currentUserId={user?.id} />
      </div>
    </HydrationBoundary>
  );
};

export default AdminsManagementPage;
