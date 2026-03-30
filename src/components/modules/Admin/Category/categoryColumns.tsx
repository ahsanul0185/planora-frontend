"use client";

import { IEventCategory } from "@/types/event.types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface CategoryColumnProps {
  onEdit: (category: IEventCategory) => void;
  onDelete: (category: IEventCategory) => void;
}

export const getCategoryColumns = ({
  onEdit,
  onDelete,
}: CategoryColumnProps): ColumnDef<IEventCategory>[] => [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
        const icon = row.original.icon;
        return (
            <div className="relative size-10 rounded-lg overflow-hidden border bg-muted/30">
                {icon ? (
                    <img
                        src={icon}
                        alt={row.original.name}
                        // fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No Icon
                    </div>
                )}
            </div>
        )
    }
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

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
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Category
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(category)}
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
