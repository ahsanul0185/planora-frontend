"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import AppField from "@/components/shared/form/AppField";
import { KeyRound, Loader2, Key, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { changePassword } from "@/services/auth.services";
import { changePasswordZodSchema } from "@/zod/auth.validation";
import { Separator } from "@/components/ui/separator";

export function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: any) => changePassword(data),
    onSuccess: (res: any) => {
      if (res.success) {
        toast.success("Password updated successfully!");
        form.reset();
      } else {
        toast.error(res.message || "Failed to update password.");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "An unexpected error occurred.");
    },
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate(value);
    },
  });

  return (
    <div className="space-y-10 max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Security Credentials
          </h4>

          <div className="space-y-6">
            <form.Field
              name="currentPassword"
              validators={{
                onChange: changePasswordZodSchema.shape.currentPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Current Password"
                  type={showCurrent ? "text" : "password"}
                  placeholder="Enter current password"
                  append={
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground pointer-events-auto"
                    >
                      {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}
            </form.Field>

            <Separator />

            <form.Field
              name="newPassword"
              validators={{
                onChange: changePasswordZodSchema.shape.newPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="New Password"
                  type={showNew ? "text" : "password"}
                  placeholder="At least 8 characters"
                  append={
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground pointer-events-auto"
                    >
                      {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}
            </form.Field>

            <form.Field
              name="confirmPassword"
              validators={{
                onChange: changePasswordZodSchema.shape.confirmPassword,
              }}
            >
              {(field) => (
                <AppField
                  field={field}
                  label="Confirm New Password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-type new password"
                  append={
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground pointer-events-auto"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              )}
            </form.Field>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || mutation.isPending}
                className="h-11 px-8 min-w-[180px]"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating Security...
                  </>
                ) : (
                  <>
                    <KeyRound className="mr-2 h-4 w-4" />
                    Change Password
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
