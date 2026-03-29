"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IParticipation, ParticipationStatus } from "@/types/participation.types";
import { updateParticipationStatus } from "@/services/participation.services";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Cake, CalendarDays, CreditCard, Loader2, Mail, MapPin, Phone, User, Users } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ParticipantDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participation: IParticipation;
  eventId: string;
  isPaidEvent: boolean;
}

export function ParticipantDetailsModal({
  open,
  onOpenChange,
  participation,
  eventId,
  isPaidEvent,
}: ParticipantDetailsModalProps) {
  // Use useMemo to calculate the logical "next status" only once when modal opens
  const recommendedStatus = useMemo(() => {
    if (participation.status !== "PENDING") return participation.status;
    return isPaidEvent ? "APPROVED" : "CONFIRMED";
  }, [participation.status, isPaidEvent]);

  const [newStatus, setNewStatus] = useState<ParticipationStatus>(recommendedStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const handleUpdate = async () => {
    if (newStatus === participation.status) {
      onOpenChange(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateParticipationStatus(eventId, participation.userId, newStatus);
      toast.success(`Status updated to ${newStatus}`);
      queryClient.invalidateQueries({ queryKey: ["event-participants", eventId] });
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const statuses: ParticipationStatus[] = [
    "PENDING",
    "APPROVED",
    "CONFIRMED",
    "REJECTED",
    "BANNED",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "REJECTED":
      case "BANNED":
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden gap-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl">Participant Details</DialogTitle>
          <DialogDescription>
            Comprehensive overview and status management for this participant.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {/* User Profile Section */}
          <div className="flex items-start gap-5 p-5 bg-muted/30 rounded-xl border border-border/50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
               <Badge variant="secondary" className="text-[10px] font-bold tracking-tighter uppercase opacity-70">
                 ID: {participation.userId.slice(-6)}
               </Badge>
            </div>
            <div className="relative size-20 rounded-2xl overflow-hidden bg-muted flex items-center justify-center shrink-0 border-4 border-background shadow-sm transition-transform group-hover:scale-105">
              {participation.user.image ? (
                <Image
                  src={participation.user.image}
                  alt={participation.user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="size-10 text-muted-foreground" />
              )}
            </div>
            <div className="flex flex-col gap-1.5 min-w-0 pt-1">
              <h3 className="font-bold text-xl leading-none truncate">
                {participation.user.name}
              </h3>
              <div className="flex items-center gap-1.5 text-sm text-primary font-medium">
                <Mail className="size-4" />
                <span className="truncate">{participation.user.email}</span>
              </div>
              {participation.user.bio && (
                 <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                   {participation.user.bio}
                 </p>
              )}
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5">
                <Phone className="size-3" /> Phone Number
              </span>
              <p className="text-sm font-semibold truncate">
                {participation.user.phoneNumber || <span className="text-muted-foreground/50 font-normal italic text-xs">Not provided</span>}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5">
                <Users className="size-3" /> Gender
              </span>
              <p className="text-sm font-semibold capitalize">
                {participation.user.gender || <span className="text-muted-foreground/50 font-normal italic text-xs">Unspecified</span>}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5">
                <Cake className="size-3" /> Birth Date
              </span>
              <p className="text-sm font-semibold">
                {participation.user.birthdate ? format(new Date(participation.user.birthdate), "PPP") : <span className="text-muted-foreground/50 font-normal italic text-xs">Not set</span>}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5">
                <CalendarDays className="size-3" /> User Since
              </span>
              <p className="text-sm font-semibold">
                {participation.user.createdAt ? format(new Date(participation.user.createdAt), "PPP") : <span className="text-muted-foreground/50 font-normal italic text-xs">N/A</span>}
              </p>
            </div>
            <div className="col-span-2 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em] flex items-center gap-1.5">
                <MapPin className="size-3" /> Address
              </span>
              <p className="text-sm font-semibold leading-relaxed">
                {participation.user.address || <span className="text-muted-foreground/50 font-normal italic text-xs">No address on file</span>}
              </p>
            </div>
          </div>

          <Separator className="opacity-50" />

          {/* Event Specific Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                Joined Event At
              </span>
              <p className="text-sm font-semibold">
                {format(new Date(participation.joinedAt), "PPP")}
              </p>
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                Participation Status
              </span>
              <div>
                <Badge className={getStatusColor(participation.status)}>
                  {participation.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          {participation.payment && (
            <div className="space-y-3 p-5 bg-primary/5 rounded-xl border border-primary/10 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <CreditCard className="size-3.5" /> Payment Status
                </span>
                <Badge 
                  variant="outline" 
                  className={getStatusColor(participation.payment.status)}
                >
                  {participation.payment.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm mt-3 pt-3 border-t border-primary/10">
                <div>
                  <span className="text-muted-foreground block text-[9px] uppercase font-heavy tracking-widest mb-1 opacity-70">Payable Amount</span>
                  <p className="font-mono font-bold text-base text-primary/80">
                    {participation.payment.amount} {participation.payment.currency}
                  </p>
                </div>
                {participation.payment.transactionId && (
                  <div className="min-w-0">
                    <span className="text-muted-foreground block text-[9px] uppercase font-heavy tracking-widest mb-1 opacity-70">Transaction Reference</span>
                    <p className="font-mono text-[11px] truncate bg-muted/50 p-1 px-2 rounded border border-border/50" title={participation.payment.transactionId}>
                      {participation.payment.transactionId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Change Section */}
          <div className="space-y-3 pt-2 bg-muted/20 p-5 rounded-2xl border border-dashed border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
               Quick Action: Change Status
            </span>
            <div className="flex gap-3">
              <div className="flex-1">
                <Select
                  value={newStatus}
                  onValueChange={(val) => setNewStatus(val as ParticipationStatus)}
                >
                  <SelectTrigger className="h-11 bg-background">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s} disabled={s === participation.status}>
                        {s} {s === recommendedStatus && s !== participation.status && "(Recommended)"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleUpdate} 
                disabled={isUpdating || newStatus === participation.status}
                className="py-3 px-8 font-bold transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Update Status"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
