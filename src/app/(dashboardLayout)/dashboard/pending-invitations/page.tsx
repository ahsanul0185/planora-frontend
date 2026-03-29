import PendingInvitationsTable from "@/components/modules/Participant/PendingInvitations/PendingInvitationsTable";
import { getMyInvitations } from "@/services/invitation.services";
import { IInvitationQueryParams } from "@/types/invitation.types";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { MailOpen } from "lucide-react";

const buildQueryParams = (
  urlParams: { [key: string]: string | string[] | undefined }
): IInvitationQueryParams => ({
  page: urlParams.page ? Number(urlParams.page) : 1,
  limit: urlParams.limit ? Number(urlParams.limit) : 10,
});

const PendingInvitationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryParams = buildQueryParams(queryParamsObjects);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["my-invitations", queryParams],
    queryFn: () => getMyInvitations(queryParams),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div className="flex flex-col gap-1 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center">
              <MailOpen className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Pending Invitations
            </h1>
          </div>
          <p className="text-muted-foreground text-sm font-medium pl-13">
            Manage your incoming event invitations
          </p>
        </div>

        <PendingInvitationsTable initialParams={queryParams} />
      </div>
    </HydrationBoundary>
  );
};

export default PendingInvitationsPage;
