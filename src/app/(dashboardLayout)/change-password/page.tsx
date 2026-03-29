import { Metadata } from "next";
import { KeyRound } from "lucide-react";
import { ChangePasswordForm } from "@/components/modules/User/ChangePassword/ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password | Planora",
  description: "Update your security credentials on Planora.",
};

export default async function ChangePasswordPage() {
  return (
    <div className="container py-6">
      {/* Header section similar to other dashboard pages */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center">
            <KeyRound className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              Account Security
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ChangePasswordForm />
      </div>
    </div>
  );
}