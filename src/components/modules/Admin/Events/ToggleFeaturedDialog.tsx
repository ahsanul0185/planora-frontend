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
import { toggleFeaturedEvent } from "@/services/event.services";
import { toast } from "sonner";
import { IEvent } from "@/types/event.types";
import { Loader2, Star } from "lucide-react";

interface ToggleFeaturedDialogProps {
  event: IEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const ToggleFeaturedDialog = ({
  event,
  isOpen,
  onClose,
}: ToggleFeaturedDialogProps) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFeature, isPending } = useMutation({
    mutationFn: (id: string) => toggleFeaturedEvent(id),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success(res.message || "Event featured status updated successfully");
        queryClient.invalidateQueries({ queryKey: ["all-events"] });
        // Also invalidate featured-events if we had a separate query key, but we use all-events with isFeatured parameter
        onClose();
      } else {
        toast.error(res.message || "Failed to update featured status");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  });

  const handleToggle = () => {
    if (event) {
      toggleFeature(event.id);
    }
  };

  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            {event.isFeatured ? "Remove from Featured" : "Add to Featured"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {event.isFeatured ? "remove" : "add"}{" "}
            <span className="font-bold text-foreground">"{event.title}"</span>{" "}
            {event.isFeatured ? "from" : "to"} featured events?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <Button variant="ghost" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant={event.isFeatured ? "destructive" : "default"}
            onClick={handleToggle}
            disabled={isPending}
            className={!event.isFeatured ? "bg-amber-500 text-white hover:bg-amber-600" : ""}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : event.isFeatured ? (
              "Remove"
            ) : (
              "Add to Featured"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleFeaturedDialog;
