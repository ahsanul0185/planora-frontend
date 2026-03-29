"use client";

import DataTable from "@/components/shared/table/DataTable";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { getAllUsers } from "@/services/admin.services";
import { IUserQueryParams, IUser } from "@/types/user.types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { usersColumns } from "./usersColumns";
import ViewUserDialog from "./ViewUserDialog";
import ChangeUserStatusDialog from "./ChangeUserStatusDialog";

interface UsersTableProps {
  initialParams: IUserQueryParams;
}

const USER_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
];

const UsersTable = ({ initialParams }: UsersTableProps) => {
  const searchParams = useSearchParams();

  // Modal state
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [changingStatusUser, setChangingStatusUser] = useState<IUser | null>(null);

  const {
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const { searchTermFromUrl, handleDebouncedSearchChange } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  });

  const { filterValues, handleFilterChange, clearAllFilters } = useServerManagedDataTableFilters({
    searchParams,
    definitions: USER_FILTER_DEFINITIONS,
    updateParams,
  });

  const currentQueryParams: IUserQueryParams = useMemo(() => ({
    searchTerm: searchParams.get("searchTerm") || initialParams.searchTerm,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : initialParams.page,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : initialParams.limit,
    sortBy: searchParams.get("sortBy") || initialParams.sortBy,
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || initialParams.sortOrder,
    status: (searchParams.get("status") as any) || initialParams.status,
  }), [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["admin-users", currentQueryParams],
    queryFn: () => getAllUsers(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const filterConfigs = useMemo(() => [
    {
      id: "status",
      label: "Account Status",
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Blocked", value: "BLOCKED" },
        { label: "Deleted", value: "DELETED" },
      ],
    },
  ], []);

  const tableActions = useMemo(() => ({
    labels: {
      view: "View User Details",
      edit: "Change Status",
    },
    onView: (row: IUser) => setViewingUserId(row.id),
    onEdit: (row: IUser) => setChangingStatusUser(row),
  }), []);

  return (
    <>
      <DataTable<IUser>
        data={data?.data ?? []}
        columns={usersColumns}
        isLoading={isFetching || isRouteRefreshPending}
        meta={data?.meta}
        emptyMessage="No users found."
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search by name or email...",
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        actions={tableActions}
      />

      <ViewUserDialog
        open={!!viewingUserId}
        onOpenChange={(open) => !open && setViewingUserId(null)}
        userId={viewingUserId}
      />

      <ChangeUserStatusDialog
        open={!!changingStatusUser}
        onOpenChange={(open) => !open && setChangingStatusUser(null)}
        user={changingStatusUser}
      />
    </>
  );
};

export default UsersTable;
