"use client";

import DataTable from "@/components/shared/table/DataTable";
import { Button } from "@/components/ui/button";
import { getAllAdmins, deleteAdmin } from "@/services/admin.services";
import { IAdmin } from "@/types/admin.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAdminsColumns } from "./adminsColumns";
import CreateAdminModal from "./CreateAdminModal";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminsTable = ({ currentUserId }: { currentUserId?: string }) => {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<IAdmin | null>(null);

  const { data, isFetching } = useQuery({
    queryKey: ["admin-list"],
    queryFn: getAllAdmins,
  });

  const { mutateAsync: deleteMutate, isPending: isDeletePending } = useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: () => {
      toast.success("Admin account deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      setDeletingAdmin(null);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete admin");
    },
  });

  const columns = useMemo(
    () => getAdminsColumns({ onDelete: setDeletingAdmin, currentUserId }),
    [currentUserId]
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Active Administrators</h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 "
        >
          <PlusCircle className="h-4 w-4" />
          Create Admin
        </Button>
      </div>

      <DataTable<IAdmin>
        data={data?.data ?? []}
        columns={columns}
        isLoading={isFetching}
        emptyMessage="No administrators found."
        meta={data?.meta}
      />

      <CreateAdminModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />

      <AlertDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the admin account for{" "}
              <span className="font-semibold text-foreground">{deletingAdmin?.name}</span> and
              revoke all platform access.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletePending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (deletingAdmin) deleteMutate(deletingAdmin.id);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeletePending}
            >
              {isDeletePending ? "Deleting..." : "Delete Admin"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminsTable;
