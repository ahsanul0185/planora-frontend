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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/shared/form/DatePicker";
import { createEvent } from "@/services/event.services";
import { IEventCategory } from "@/types/event.types";
import { useForm } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { eventValidationSchema } from "@/zod/event.validation";

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: IEventCategory[];
}

const ShadcnSelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: string;
}) => (
  <div className="space-y-1.5 flex flex-col">
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full h-10">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-sm text-destructive">{error}</p>}
  </div>
);

const CreateEventModal = ({
  open,
  onOpenChange,
  categories,
}: CreateEventModalProps) => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetFileState = () => {
    setBannerFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      registrationDeadline: "",
      registrationFee: 0,
      maxParticipants: "",
      categoryId: "",
      visibility: "PUBLIC",
      status: "PUBLISHED",
      timezone: "UTC",
      onlineLink: "",
      venueName: "",
      venueAddress: "",
      tags: "",
      currency: "USD",
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();

        if (bannerFile) {
          formData.append("bannerImage", bannerFile);
        }

        // Append all fields individually (backend reads req.body directly)
        formData.append("title", value.title);
        if (value.description) formData.append("description", value.description);
        formData.append("startDate", new Date(value.startDate).toISOString());
        formData.append("endDate", new Date(value.endDate).toISOString());
        formData.append("registrationFee", String(Number(value.registrationFee)));
        formData.append("categoryId", value.categoryId);
        formData.append("visibility", value.visibility);
        formData.append("status", value.status);
        formData.append("timezone", value.timezone || "UTC");
        formData.append("isOnline", String(isOnline));
        if (value.registrationDeadline) {
          formData.append("registrationDeadline", new Date(value.registrationDeadline).toISOString());
        }
        if (value.maxParticipants) {
          formData.append("maxParticipants", String(Number(value.maxParticipants)));
        }
        if (isOnline && value.onlineLink) {
          formData.append("onlineLink", value.onlineLink);
        }
        if (!isOnline) {
          if (value.venueName) formData.append("venueName", value.venueName);
          if (value.venueAddress) formData.append("venueAddress", value.venueAddress);
        }
        if (value.tags) {
          formData.append("tags", value.tags.split(",").map((t) => t.trim()).filter(Boolean).join(","));
        }
        formData.append("currency", value.currency || "USD");

        await createEvent(formData);
        toast.success("Event created successfully!");
        queryClient.invalidateQueries({ queryKey: ["my-organized-events"] });
        onOpenChange(false);
        form.reset();
        resetFileState();
        setIsOnline(false);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Failed to create event";
        toast.error(msg);
      }
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
          setIsOnline(false);
        }
      }}
    >
      <DialogContent className="max-w-5xl w-full max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-lg">
        <DialogHeader className="px-8 pt-8 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
          <DialogDescription className="text-base">
            Fill in the details below to launch your next great event.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-8 py-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-8"
            >
            {/* Banner Image */}
            <div className="space-y-2">
              <Label>Banner Image</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:border-primary/50 hover:bg-muted/40 transition-colors overflow-hidden"
              >
                {previewUrl ? (
                  <div className="relative h-44">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Banner preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetFileState();
                      }}
                      className="absolute top-2 right-2 rounded-full bg-background/80 p-1 hover:bg-background"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
                    <ImagePlus className="h-8 w-8" />
                    <p className="text-sm font-medium">Click to upload banner image</p>
                    <p className="text-xs">PNG, JPG, WEBP up to 5MB</p>
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

            <Separator />

            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Basic Information
              </h4>
              <form.Field
                name="title"
                validators={{
                  onChange: eventValidationSchema.shape.title as any
                }}
                children={(field) => (
                  <AppField
                    field={field}
                    label="Event Title *"
                    placeholder="e.g. Tech Conference 2025"
                  />
                )}
              />
              <form.Field
                name="description"
                children={(field) => (
                  <div className="space-y-1.5">
                    <Label htmlFor={field.name}>Description</Label>
                    <textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      rows={3}
                      placeholder="Describe your event..."
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                    />
                  </div>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="categoryId"
                  validators={{
                    onChange: eventValidationSchema.shape.categoryId as any
                  }}
                  children={(field) => (
                    <ShadcnSelectField
                      label="Category *"
                      value={field.state.value}
                      onChange={field.handleChange}
                      options={categories.map((c) => ({
                        label: c.name,
                        value: c.id,
                      }))}
                      placeholder="Select category"
                      error={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? String(field.state.meta.errors[0])
                          : undefined
                      }
                    />
                  )}
                />
                <form.Field
                  name="visibility"
                  children={(field) => (
                    <ShadcnSelectField
                      label="Visibility"
                      value={field.state.value}
                      onChange={field.handleChange}
                      options={[
                        { label: "Public", value: "PUBLIC" },
                        { label: "Private", value: "PRIVATE" },
                      ]}
                    />
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="status"
                  children={(field) => (
                    <ShadcnSelectField
                      label="Status"
                      value={field.state.value}
                      onChange={field.handleChange}
                      options={[
                        { label: "Published", value: "PUBLISHED" },
                        { label: "Draft", value: "DRAFT" },
                      ]}
                    />
                  )}
                />
                <form.Field
                  name="timezone"
                  children={(field) => (
                    <AppField
                      field={field}
                      label="Timezone"
                      placeholder="e.g. UTC, Asia/Dhaka"
                    />
                  )}
                />
              </div>

              <form.Field
                name="tags"
                children={(field) => (
                  <AppField
                    field={field}
                    label="Tags (comma-separated)"
                    placeholder="e.g. tech, music, outdoor"
                  />
                )}
              />
            </div>

            <Separator />

            {/* Dates */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Dates & Time
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="startDate"
                  validators={{
                    onChange: eventValidationSchema.shape.startDate as any
                  }}
                  children={(field) => (
                    <DatePicker
                      label="Start Date *"
                      value={field.state.value}
                      onChange={field.handleChange}
                      error={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? String(field.state.meta.errors[0])
                          : undefined
                      }
                    />
                  )}
                />
                <form.Field
                  name="endDate"
                  validators={{
                    onChange: eventValidationSchema.shape.endDate as any
                  }}
                  children={(field) => (
                    <DatePicker
                      label="End Date *"
                      value={field.state.value}
                      onChange={field.handleChange}
                      error={
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0
                          ? String(field.state.meta.errors[0])
                          : undefined
                      }
                    />
                  )}
                />
              </div>
              <form.Field
                name="registrationDeadline"
                children={(field) => (
                  <DatePicker
                    label="Registration Deadline (optional)"
                    value={field.state.value}
                    onChange={field.handleChange}
                  />
                )}
              />
            </div>

            <Separator />

            {/* Registration */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Registration
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <form.Field
                  name="registrationFee"
                  validators={{
                    onChange: eventValidationSchema.shape.registrationFee as any
                  }}
                  children={(field) => (
                    <AppField
                      field={field}
                      type="number"
                      label="Registration Fee"
                      placeholder="0 for free"
                    />
                  )}
                />
                <form.Field
                  name="currency"
                  children={(field) => (
                    <ShadcnSelectField
                      label="Currency"
                      value={field.state.value}
                      onChange={field.handleChange}
                      options={[
                        { label: "USD", value: "USD" },
                        { label: "BDT", value: "BDT" },
                        { label: "EUR", value: "EUR" },
                        { label: "GBP", value: "GBP" },
                      ]}
                    />
                  )}
                />
              </div>
              <form.Field
                name="maxParticipants"
                children={(field) => (
                  <AppField
                    field={field}
                    type="number"
                    label="Max Participants (optional)"
                    placeholder="Leave blank for unlimited"
                  />
                )}
              />
            </div>

            <Separator />

            {/* Venue */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Venue
              </h4>
              <div className="flex items-center gap-3">
                <Switch
                  id="isOnline"
                  checked={isOnline}
                  onCheckedChange={setIsOnline}
                />
                <Label htmlFor="isOnline" className="cursor-pointer">
                  Online Event
                </Label>
              </div>

              {isOnline ? (
                <form.Field
                  name="onlineLink"
                  children={(field) => (
                    <AppField
                      field={field}
                      label="Online Meeting Link"
                      placeholder="https://zoom.us/..."
                    />
                  )}
                />
              ) : (
                <div className="space-y-4">
                  <form.Field
                    name="venueName"
                    children={(field) => (
                      <AppField
                        field={field}
                        label="Venue Name"
                        placeholder="e.g. Grand Ballroom"
                      />
                    )}
                  />
                  <form.Field
                    name="venueAddress"
                    children={(field) => (
                      <AppField
                        field={field}
                        label="Venue Address"
                        placeholder="Full address..."
                      />
                    )}
                  />
                </div>
              )}
            </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <div className="pt-4 pb-2 flex justify-end w-full">
                    <AppSubmitButton
                      className="w-fit"
                      isPending={Boolean(isSubmitting)}
                      disabled={!canSubmit}
                      pendingLabel="Creating your event..."
                    >
                      Create Event
                    </AppSubmitButton>
                  </div>
                )}
              />
            </form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventModal;
