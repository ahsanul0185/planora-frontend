"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeUserStatus } from "@/services/admin.services";
import { IUser, UserStatus } from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ChangeUserStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: IUser | null;
}

const ChangeUserStatusDialog = ({
  open,
  onOpenChange,
  user,
}: ChangeUserStatusDialogProps) => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>("ACTIVE");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && open) {
      setSelectedStatus(user.status);
    }
  }, [user, open]);

  const handleSubmit = async () => {
    if (!user) return;
    if (selectedStatus === user.status) {
      onOpenChange(false);
      return;
    }

    setIsSubmitting(true);
    try {
      await changeUserStatus({
        userId: user.id,
        userStatus: selectedStatus,
      });
      toast.success(`User status changed to ${selectedStatus} successfully`);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update user status.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            Change User Status
          </DialogTitle>
          <DialogDescription>
            Modify standard access for <b>{user?.name}</b>.
            Deleted users cannot be restored.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform Status</label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setSelectedStatus(val as UserStatus)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active (Accessible)</SelectItem>
                <SelectItem value="BLOCKED">Blocked (Restricted)</SelectItem>
                <SelectItem value="DELETED" className="text-red-500 focus:text-red-600 focus:bg-red-50">
                  Suspended / Deleted
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || selectedStatus === user?.status}>
            {isSubmitting ? "Updating..." : "Save Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserStatusDialog;
