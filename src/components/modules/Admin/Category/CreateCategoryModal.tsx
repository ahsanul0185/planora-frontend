"use client";

import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { createEventCategory } from "@/services/eventCategory.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { categoryValidationSchema } from "@/zod/eventCategory.validation";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateCategoryModal = ({
  open,
  onOpenChange,
}: CreateCategoryModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [iconFile, setIconFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetFileState = () => {
    setIconFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createEventCategory,
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Category created successfully");
        queryClient.invalidateQueries({ queryKey: ["event-categories"] });
        onOpenChange(false);
        form.reset();
        resetFileState();
      } else {
        toast.error(res.message || "Failed to create category");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "An error occurred");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      if (!iconFile) {
        toast.error("Please upload an icon for the category");
        return;
      }
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("icon", iconFile);

      await mutateAsync(formData);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val);
        if (!val) {
          form.reset();
          resetFileState();
        }
      }}
    >
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create Category
          </DialogTitle>
          <DialogDescription>
            Add a new event category with an descriptive icon.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6 pt-4"
        >
          {/* Icon Upload */}
          <div className="space-y-2">
            <Label>Category Icon *</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-colors overflow-hidden aspect-square w-32 mx-auto flex items-center justify-center"
            >
              {previewUrl ? (
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Icon preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetFileState();
                    }}
                    className="absolute top-1 right-1 rounded-full bg-background/80 p-0.5 hover:bg-background"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 text-center p-2 text-muted-foreground">
                  <ImagePlus className="h-6 w-6" />
                  <p className="text-[10px] font-medium leading-tight">
                    Upload Icon
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <form.Field
            name="name"
            validators={{
              onChange: categoryValidationSchema.shape.name,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Category Name *"
                placeholder="e.g. Technology"
              />
            )}
          </form.Field>

          <div className="flex justify-end gap-3 pt-4">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  className="w-full"
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                >
                  Create Category
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
