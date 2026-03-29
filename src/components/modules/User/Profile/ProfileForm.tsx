"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { IUser } from "@/types/user.types";
import { updateProfileZodSchema } from "@/zod/user.validation";
import { updateMyProfile } from "@/services/user.services";
import { AvatarEditable } from "./AvatarEditable";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AppField from "@/components/shared/form/AppField";
import { cn } from "@/lib/utils";

interface ProfileFormProps {
  user: IUser;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => updateMyProfile(formData),
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update profile.");
    },
  });

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
      gender: (user.gender || "MALE") as any,
      phoneNumber: user.phoneNumber || "",
      address: user.address || "",
      birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split("T")[0] : "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      
      // Handle birthdate separately to ensure ISO format
      if (value.birthdate) {
        try {
          // Add T00:00:00Z to ensure it's a valid UTC date for backend's .datetime()
          const isoDate = new Date(`${value.birthdate}T00:00:00.000Z`).toISOString();
          formData.append("birthdate", isoDate);
        } catch (e) {
          console.error("Invalid date format", e);
        }
      }

      // Append other text fields
      Object.entries(value).forEach(([key, val]) => {
        if (key !== "birthdate" && val) {
          formData.append(key, val as string);
        }
      });

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      mutation.mutate(formData);
    },
  });

  return (
    <div className="space-y-10 max-w-5xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Profile Header / Picture Section */}
        <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
          <AvatarEditable
            currentImage={user.image}
            name={user.name}
            onImageSelect={setSelectedFile}
          />
          <div className="flex flex-col items-center sm:items-start space-y-3">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold tracking-tight">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-0.5 rounded">
                  {user.role}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-muted text-muted-foreground px-2 py-0.5 rounded">
                  {user.status}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="h-9 px-4 text-xs font-semibold"
                onClick={() => document.getElementById("avatar-upload-input")?.click()}
              >
                Change Photo
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        {/* Basic Information */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Basic Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field
              name="name"
              validators={{
                onChange: updateProfileZodSchema.shape.name,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Full Name *"
                  placeholder="Enter your full name"
                />
              )}
            </form.Field>

            <div className="space-y-1.5 flex flex-col">
              <Label className="text-muted-foreground">Email Address</Label>
              <Input
                value={user.email}
                disabled
                className="h-10 bg-muted/50 cursor-not-allowed italic"
              />
              <p className="text-[10px] text-muted-foreground">Contact support to change email.</p>
            </div>

            <form.Field
              name="gender"
              validators={{
                onChange: updateProfileZodSchema.shape.gender,
              }}
            >
              {(field) => (
                <div className="space-y-1.5 flex flex-col">
                  <Label htmlFor={field.name} className={cn(field.state.meta.errors.length > 0 && "text-destructive")}>
                    Gender
                  </Label>
                  <Select
                    value={field.state.value || "MALE"}
                    onValueChange={(val) => field.handleChange(val as any)}
                  >
                    <SelectTrigger className={cn("w-full h-10", field.state.meta.errors.length > 0 && "border-destructive focus:ring-destructive/20")}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message || String(field.state.meta.errors[0])}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="birthdate"
              validators={{
                onChange: updateProfileZodSchema.shape.birthdate,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Birth Date"
                  type="date"
                />
              )}
            </form.Field>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Contact & Bio
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form.Field
              name="phoneNumber"
              validators={{
                onChange: updateProfileZodSchema.shape.phoneNumber,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Phone Number"
                  placeholder="e.g., +1 234 567 890"
                />
              )}
            </form.Field>

            <form.Field
              name="address"
              validators={{
                onChange: updateProfileZodSchema.shape.address,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Address"
                  placeholder="City, Country"
                />
              )}
            </form.Field>
          </div>

          <form.Field
            name="bio"
            validators={{
              onChange: updateProfileZodSchema.shape.bio,
            }}
          >
            {(field) => (
              <div className="space-y-1.5 flex flex-col">
                <Label htmlFor={field.name}>Bio</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  {field.state.meta.errors.length > 0 ? (
                    <p className="text-xs text-destructive font-medium">
                      {field.state.meta.errors[0]?.message || String(field.state.meta.errors[0])}
                    </p>
                  ) : <span />}
                  <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {field.state.value?.length || 0} / 200 CHARS
                  </span>
                </div>
              </div>
            )}
          </form.Field>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end pt-6">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || mutation.isPending}
                className="h-11 px-8 min-w-[160px]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}
