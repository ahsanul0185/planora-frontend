import { getUserInfo } from "@/services/auth.services";
import { ProfileForm } from "@/components/modules/User/Profile/ProfileForm";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Planora",
  description: "View and update your personal profile on Planora.",
};

import { User as UserIcon } from "lucide-react";

export default async function ProfilePage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container py-6">
      {/* Header section similar to other dashboard pages */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center">
            <UserIcon className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground leading-none">
              My Account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Manage your personal information and profile picture.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProfileForm user={user} />
      </div>
    </div>
  );
}