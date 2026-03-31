"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createReviewZodSchema } from "@/zod/review.validation";
import { createReview } from "@/services/review.services";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";

interface WriteReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string | null;
  eventTitle: string | null;
}

const WriteReviewModal = ({
  open,
  onOpenChange,
  eventId,
  eventTitle,
}: WriteReviewModalProps) => {
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      rating: 5,
      body: "",
    },
    onSubmit: async ({ value }) => {
      if (!eventId) return;

      try {
        const res = await createReview(eventId, value);
        if (res.success) {
          toast.success("Review submitted successfully!");
          queryClient.invalidateQueries({ queryKey: ["my-joined-events"] });
          onOpenChange(false);
          form.reset();
        } else {
          toast.error(res.message || "Failed to submit review");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) form.reset();
      }}
    >
      <DialogContent className="sm:max-w-[450px] p-4">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience at{" "}
            <span className="font-semibold text-foreground">
              &quot;{eventTitle}&quot;
            </span>
            . Your feedback helps organizers improve!
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 py-4"
        >
          {/* Star Rating */}
          <form.Field
            name="rating"
            validators={{
              onChange: createReviewZodSchema.shape.rating as any,
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Rating</Label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.handleChange(star)}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        className={cn(
                          "h-8 w-8 transition-colors",
                          star <= field.state.value
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          />

          {/* Review Body */}
          <form.Field
            name="body"
            validators={{
              onChange: createReviewZodSchema.shape.body as any,
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Your Review</Label>
                <textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="What did you like most? Anything to improve? (Optional)"
                  className="flex w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {String(field.state.meta.errors[0])}
                    </p>
                  )}
              </div>
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={Boolean(isSubmitting)}
                  disabled={!canSubmit}
                  pendingLabel="Submitting..."
                  className="w-fit"
                >
                  Submit Review
                </AppSubmitButton>
              )}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewModal;
