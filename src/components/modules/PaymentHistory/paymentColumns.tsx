import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IPayment, PaymentStatus } from "@/types/payment.types";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
  },
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
  },
};

export const paymentColumns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-[12px] text-muted-foreground">
        {row.original.transactionId || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "event.title",
    header: "Event",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium text-sm line-clamp-1">{row.original.event.title}</span>
        <span className="text-[11px] text-muted-foreground italic">
          Event ID: {row.original.eventId.split("-")[0]}...
        </span>
      </div>
    ),
  },
  {
    accessorKey: "user.name",
    header: "User",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm">{row.original.user.name}</span>
        <span className="text-[11px] text-muted-foreground">{row.original.user.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.original.amount;
      const currency = row.original.currency;
      return (
        <span className="font-semibold text-primary">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const cfg = statusConfig[row.original.status];
      return (
        <Badge variant="outline" className={`font-semibold text-[10px] uppercase ${cfg?.className ?? ""}`}>
          {cfg?.label ?? row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    header: "Invoice",
    cell: ({ row }) => {
      const invoiceUrl = row.original.invoiceUrl;
      if (!invoiceUrl) return <span className="text-muted-foreground text-xs italic">N/A</span>;

      return (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10"
          asChild
        >
          <a href={invoiceUrl} target="_blank" rel="noopener noreferrer" title="View Invoice">
            <FileDown className="h-4 w-4" />
          </a>
        </Button>
      );
    },
  },
];
