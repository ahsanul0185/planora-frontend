"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEventCategory } from "@/services/eventCategory.services";
import { toast } from "sonner";
import { IEventCategory } from "@/types/event.types";
import { Loader2 } from "lucide-react";

interface DeleteCategoryModalProps {
  category: IEventCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCategoryModal = ({
  category,
  isOpen,
  onClose,
}: DeleteCategoryModalProps) => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: (id: string) => deleteEventCategory(id),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["event-categories"] });
        onClose();
      } else {
        toast.error(res.message || "Failed to delete category");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const handleDelete = () => {
    if (category) {
      deleteCategory(category.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            Delete Category
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the category{" "}
            <span className="font-bold text-foreground">"{category?.name}"</span>? 
            This action cannot be undone and may affect events with this category.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryModal;
