"use client";

import DateCell from "@/components/shared/cell/DateCell";
import { IAdmin } from "@/types/admin.types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";

interface AdminColumnProps {
  onDelete: (admin: IAdmin) => void;
  currentUserId?: string;
}

export const getAdminsColumns = ({
  onDelete,
  currentUserId,
}: AdminColumnProps): ColumnDef<IAdmin>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.original.name}</span>
        {row.original.userId === currentUserId && (
          <Badge variant="secondary" className="text-[10px] py-0 h-4 px-1.5">
            You
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span>,
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
    cell: ({ row }) => <span>{row.original.contactNumber || "—"}</span>,
  },
  {
    accessorKey: "createdAt",
    header: "Joined at",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(admin)}
              disabled={admin.userId === currentUserId}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Admin
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
