"use client";

import DataTable from "@/components/shared/table/DataTable";
import { getMyBookmarks, removeBookmark } from "@/services/bookmark.services";
import { IBookmark } from "@/types/bookmark.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { bookmarksColumns } from "./bookmarksColumns";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import ViewEventDialog from "@/components/modules/Organizer/OrganizedEvents/ViewEventDialog";
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
import { Trash2 } from "lucide-react";
import { useState } from "react";

const BookmarksTable = () => {
  const queryClient = useQueryClient();
  const [isRemoving, setIsRemoving] = useState(false);

  // ── Modal state ──────────────────────────────────────────────
  const { 
    viewingItem, 
    deletingItem,
    isViewDialogOpen, 
    isDeleteDialogOpen,
    onViewOpenChange, 
    onDeleteOpenChange,
    tableActions 
  } = useRowActionModalState<IBookmark>({
    enableView: true,
    enableEdit: false,
    enableDelete: true,
  });

  // ── Data fetching ────────────────────────────────────────────
  const { data, isFetching } = useQuery({
    queryKey: ["my-bookmarks"],
    queryFn: () => getMyBookmarks(),
  });

  // ── Remove handler ────────────────────────────────────────────
  const handleConfirmRemove = async () => {
    if (!deletingItem) return;
    
    setIsRemoving(true);
    const toastId = toast.loading("Removing bookmark...");
    
    try {
      await removeBookmark(deletingItem.eventId);
      toast.success("Bookmark removed successfully.", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["my-bookmarks"] });
      onDeleteOpenChange(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ?? "Failed to remove bookmark. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <DataTable<IBookmark>
        data={data ?? []}
        columns={bookmarksColumns}
        isLoading={isFetching}
        emptyMessage="You haven't bookmarked any events yet."
        actions={{
          ...tableActions,
          labels: {
            view: "View Event",
            delete: "Remove Bookmark",
          },
        }}
      />

      {/* View Event Dialog */}
      <ViewEventDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        event={viewingItem?.event || null}
      />

      {/* Remove Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Bookmark?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <span className="font-semibold text-foreground">
                &quot;{deletingItem?.event?.title}&quot;
              </span>{" "}
              from your bookmarks?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isRemoving}>
              Keep Bookmark
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              disabled={isRemoving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isRemoving ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Removing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Yes, Remove
                </span>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookmarksTable;
