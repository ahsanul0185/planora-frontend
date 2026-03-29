"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { IParticipation, ParticipationStatus, PaymentStatus } from "@/types/participation.types";
import { IEvent } from "@/types/event.types";
import { ParticipantActionCell } from "./ParticipantActionCell";
import { Badge } from "@/components/ui/badge";

export const getStatusColor = (status: ParticipationStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200";
    case "CONFIRMED":
    case "APPROVED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200";
    case "REJECTED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200";
    case "BANNED":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-200";
    case "CANCELLED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200";
  }
};

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "COMPLETED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "FAILED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "REFUNDED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

export const useParticipantsColumns = (eventId: string, event: IEvent) => {
  const isPaidEvent = event.registrationFee > 0;

  return useMemo<ColumnDef<IParticipation>[]>(() => {
    const columns: ColumnDef<IParticipation>[] = [
      {
        accessorKey: "user",
        header: "Participant",
        cell: ({ row }) => {
          const user = row.original.user;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image || ""} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium truncate max-w-[150px]">{user.name}</span>
              </div>
            </div>
          );
        },
        enableSorting: false, // Wait, sorting by user name natively supported? The builder supports user.name if configured.
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          return <span className="text-sm text-muted-foreground">{row.original.user.email}</span>;
        },
        enableSorting: false,
      },
      {
        accessorKey: "joinedAt",
        header: "Joined At",
        cell: ({ row }) => format(new Date(row.getValue("joinedAt")), "MMM dd, yyyy"),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as ParticipationStatus;
          return (
            <Badge variant="outline" className={`font-semibold shrink-0 ${getStatusColor(status)}`}>
              {status}
            </Badge>
          );
        },
      },
    ];

    if (isPaidEvent) {
      columns.push({
        id: "paymentStatus",
        header: "Payment",
        cell: ({ row }) => {
          const payment = row.original.payment;
          if (!payment) return <span className="text-muted-foreground text-xs italic">N/A</span>;
          return (
            <Badge variant="secondary" className={`font-semibold shrink-0 ${getPaymentStatusColor(payment.status)}`}>
              {payment.status}
            </Badge>
          );
        },
      });
    }

    columns.push({
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        return <ParticipantActionCell participation={row.original} eventId={eventId} isPaidEvent={isPaidEvent} />;
      },
      enableSorting: false,
    });

    return columns;
  }, [eventId, isPaidEvent]);
};
