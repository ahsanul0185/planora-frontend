"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { Loader2, UserCircle2 } from "lucide-react";

interface ViewUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  ORGANIZER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  PARTICIPANT: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const statusColors: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400",
  BLOCKED: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400",
  DELETED: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400",
};

const ViewUserDialog = ({ open, onOpenChange, userId }: ViewUserDialogProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-details", userId],
    queryFn: () => getUserById(userId as string),
    enabled: !!userId && open,
    retry: false,
  });

  const user = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Account information, roles, and activity summary.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] w-full pr-4">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : isError || !user ? (
            <div className="flex h-40 flex-col items-center justify-center gap-2 text-muted-foreground">
              <UserCircle2 className="h-8 w-8 opacity-40" />
              <p className="text-sm">
                {(error as Error)?.message || "Failed to load user details."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-16 w-16 rounded-full border border-border object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-primary/10 text-primary font-semibold text-xl">
                    {getInitials(user.name)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold leading-none">{user.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className={`text-[11px] font-semibold ${roleColors[user.role] ?? ""}`}
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-[11px] font-semibold ${statusColors[user.status] ?? ""}`}
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Joined
                  </p>
                  <p className="mt-1 font-medium text-sm">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Phone
                  </p>
                  <p className="mt-1 font-medium text-sm">{user.phoneNumber || "—"}</p>
                </div>
                {user.gender && (
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Gender
                    </p>
                    <p className="mt-1 font-medium text-sm">{user.gender}</p>
                  </div>
                )}
                {user.address && (
                  <div className="rounded-md border p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                      Address
                    </p>
                    <p className="mt-1 font-medium text-sm">{user.address}</p>
                  </div>
                )}
              </div>

              {/* Bio */}
              {(user as any)?.bio && (
                <div>
                  <p className="text-sm font-semibold mb-2">Biography</p>
                  <p className="text-sm text-foreground/80 leading-relaxed bg-muted/50 p-3 rounded-md">
                    {(user as any).bio}
                  </p>
                </div>
              )}

              {/* Activity Summary */}
              <div className="grid grid-cols-2 gap-3">
                {user.role === "ORGANIZER" && (
                  <div className="rounded-md border bg-blue-50/40 dark:bg-blue-950/20 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      Organized Events
                    </p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {((user as any).organizedEvents)?.length ?? 0}
                    </p>
                  </div>
                )}
                {(user.role === "PARTICIPANT" || user.role === "ORGANIZER") && (
                  <div className="rounded-md border bg-emerald-50/40 dark:bg-emerald-950/20 p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                      Participations
                    </p>
                    <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {((user as any).participations)?.length ?? 0}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserDialog;
