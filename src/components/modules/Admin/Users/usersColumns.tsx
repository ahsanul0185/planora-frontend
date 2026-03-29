import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IUser, UserRole, UserStatus } from "@/types/user.types";
import { ColumnDef } from "@tanstack/react-table";

const roleConfig: Record<UserRole, { label: string; className: string }> = {
  ADMIN: {
    label: "Admin",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300",
  },
  ORGANIZER: {
    label: "Organizer",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300",
  },
  PARTICIPANT: {
    label: "Participant",
    className: "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300",
  },
};

const statusConfig: Record<UserStatus, { label: string; className: string }> = {
  ACTIVE: {
    label: "Active",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
  },
  BLOCKED: {
    label: "Blocked",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  },
  DELETED: {
    label: "Deleted",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
  },
};

export const usersColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.email}</span>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: false,
    cell: ({ row }) => {
      const cfg = roleConfig[row.original.role];
      return (
        <Badge variant="secondary" className={`font-semibold text-[11px] ${cfg?.className ?? ""}`}>
          {cfg?.label ?? row.original.role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const cfg = statusConfig[row.original.status];
      return (
        <Badge variant="outline" className={`font-semibold text-[11px] ${cfg?.className ?? ""}`}>
          {cfg?.label ?? row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined at",
    enableSorting: true,
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
];
