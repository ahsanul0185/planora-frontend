"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, ShieldCheck, ShieldX } from "lucide-react";
import { IParticipation } from "@/types/participation.types";
import { updateParticipationStatus } from "@/services/participation.services";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { ParticipantDetailsModal } from "./ParticipantDetailsModal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { participationStatusUpdateSchema } from "@/zod/participation.validation";

interface ParticipantActionCellProps {
  eventId: string;
  participation: IParticipation;
  isPaidEvent: boolean;
}

export function ParticipantActionCell({ eventId, participation, isPaidEvent }: ParticipantActionCellProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleQuickStatusChange = async (newStatus: "CONFIRMED" | "REJECTED" | "APPROVED" | "BANNED") => {
    const parsed = participationStatusUpdateSchema.safeParse({ status: newStatus });
    if (!parsed.success) {
      toast.error("Invalid status value");
      return;
    }
    setIsUpdating(true);
    try {
      await updateParticipationStatus(eventId, participation.userId, parsed.data.status);
      toast.success(`Participant ${newStatus.toLowerCase()} successfully`);
      queryClient.invalidateQueries({ queryKey: ["event-participants", eventId] });
    } catch {
      toast.error(`Failed to update participant status`);
    } finally {
      setIsUpdating(false);
    }
  };

  const isPending = participation.status === "PENDING";
  
  // For paid private events, we move to APPROVED so they can pay.
  // For free events, we move directly to CONFIRMED.
  const approvalStatus = isPaidEvent ? "APPROVED" : "CONFIRMED";

  return (
    <div className="flex items-center justify-end gap-2 text-primary font-bold">
      {isPending && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
            onClick={() => handleQuickStatusChange(approvalStatus)}
            disabled={isUpdating}
          >
            <ShieldCheck className="h-4 w-4 mr-1.5" />
            Approve
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            onClick={() => handleQuickStatusChange("REJECTED")}
            disabled={isUpdating}
          >
            <ShieldX className="h-4 w-4 mr-1.5" />
            Reject
          </Button>
        </>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 w-8 p-0 border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors" 
              disabled={isUpdating}
              onClick={() => setIsModalOpen(true)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View Details</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">View Full Details</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ParticipantDetailsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        participation={participation}
        eventId={eventId}
        isPaidEvent={isPaidEvent}
      />
    </div>
  );
}
