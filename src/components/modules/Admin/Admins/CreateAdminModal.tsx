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
import { createAdmin } from "@/services/admin.services";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import z from "zod";

interface CreateAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const adminFormSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters").max(30, "Name must be at most 30 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
  contactNumber: z.string().refine((val) => val === "" || (val.length >= 11 && val.length <= 14), {
    message: "Contact number must be between 11 and 14 characters",
  }),
});

const CreateAdminModal = ({ open, onOpenChange }: CreateAdminModalProps) => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      toast.success("New admin account created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-list"] });
      onOpenChange(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create admin");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        password: value.password,
        admin: {
          name: value.name,
          email: value.email,
          contactNumber: value.contactNumber || undefined,
        },
      };
      await mutateAsync(payload);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Create Admin
          </DialogTitle>
          <DialogDescription>
            Register a new administrator with platform access.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4 py-2"
        >
          <form.Field
            name="name"
            validators={{
              onChange: adminFormSchema.shape.name,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name *"
                placeholder="Admin's full name"
              />
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: adminFormSchema.shape.email,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Email Address *"
                type="email"
                placeholder="admin@example.com"
              />
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: adminFormSchema.shape.password,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Temporary Password *"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                append={
                  <Button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    variant="ghost"
                    size="icon"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="contactNumber"
            validators={{
              onChange: adminFormSchema.shape.contactNumber,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Contact Number (Optional)"
                placeholder="e.g. 01700000000"
              />
            )}
          </form.Field>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <form.Subscribe
              selector={(s) => [s.canSubmit, s.isSubmitting] as const}
            >
              {([canSubmit, isSubmitting]) => (
                <AppSubmitButton
                  isPending={isSubmitting || isPending}
                  disabled={!canSubmit}
                >
                  Create Admin
                </AppSubmitButton>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminModal;
