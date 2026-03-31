"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IEvent, IDetailedEvent } from "@/types/event.types";
import { UserInfo } from "@/types/user.types";
import { joinPublicFreeEvent, requestPrivateFreeEvent, joinPublicPaidEvent, requestPrivatePaidEvent } from "@/services/participation.services";
import { Loader2 } from "lucide-react";
import { getCurrencySymbol } from "@/lib/utils";

interface JoinEventButtonProps {
  event: IEvent | IDetailedEvent;
  userInfo: UserInfo | null;
  className?: string;
  isPast?: boolean;
}

export default function JoinEventButton({
  event,
  userInfo,
  className,
  isPast,
}: JoinEventButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isOrganizer = userInfo?.id === event.organizerId;
  const isPublic = event.visibility === "PUBLIC";
  const isFree = event.registrationFee === 0;

  // Determine button text
  let buttonText = "Join now";
  if (!userInfo) {
    buttonText = "Login to Join";
  } else if (isOrganizer) {
    buttonText = "Manage Event";
  } else if (isPublic) {
    buttonText = isFree ? "Join now" : "Pay & Join now";
  } else {
    buttonText = "Request Join";
  }

  const handleAction = async () => {
    if (isPast && !isOrganizer) return;

    if (!userInfo) {
      setIsOpen(true);
      return;
    }

    if (isOrganizer) {
      router.push(`/organizer/dashboard/my-events`);
      return;
    }

    setIsOpen(true);
  };

  const confirmJoin = async () => {
    setLoading(true);
    try {
      if (isPublic) {
        if (isFree) {
          await joinPublicFreeEvent(event.id);
          toast.success("Successfully joined the event!");
          router.push("/dashboard/my-participations");
        } else {
          const res = await joinPublicPaidEvent(event.id);
          if (res.paymentUrl) {
            window.location.href = res.paymentUrl;
          }
        }
      } else {
        if (isFree) {
          await requestPrivateFreeEvent(event.id);
          toast.success("Join request sent to host!");
          setIsOpen(false);
        } else {
          await requestPrivatePaidEvent(event.id);
          toast.success("Request sent! You can pay after host approval.");
          setIsOpen(false);
        }
      }
    } catch (error: any) {
      toast.error(error?.message || error?.response?.data?.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAction}
        disabled={loading || (isPast && !isOrganizer)}
        className={className}
      >
        {loading ? (
            <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing...</span>
            </div>
        ) : (
            isPast && !isOrganizer ? "Event Concluded" : buttonText
        )}
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl p-4">
          <DialogHeader>
            <DialogTitle className="text-2xl font-newsreader font-bold text-[#004337]">
              {!userInfo ? "Authentication Required" : (isPublic ? "Confirm Participation" : "Send Join Request")}
            </DialogTitle>
            <DialogDescription className="text-[#3f4945] mt-2">
              {!userInfo ? (
                "You need to be logged in to participate in events. Join our community to access exclusive sessions and connect with hosts."
              ) : isPublic ? (
                isFree 
                  ? `You are about to join "${event.title}". This event is public and free to attend. Confirm to secure your spot.`
                  : `This event requires an entry fee of ${getCurrencySymbol(event.currency || 'USD')}${event.registrationFee}. You will be redirected to our secure payment gateway.`
              ) : (
                `"${event.title}" is a private session. Your request will be sent to ${event.organizer?.name} for review. ${!isFree ? "Payment will be required once your request is approved." : ""}`
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 gap-3">
            <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="rounded-lg border-[#e0e3e0] text-[#3f4945]"
            >
              Cancel
            </Button>
            {!userInfo ? (
              <Button 
                onClick={() => router.push(`/login?redirect=/events/${event.slug}`)}
                className="bg-[#004337] hover:bg-[#005d4d] text-white rounded-lg px-6"
              >
                Go to Login
              </Button>
            ) : (
              <Button 
                onClick={confirmJoin} 
                disabled={loading}
                className="bg-[#004337] hover:bg-[#005d4d] text-white rounded-lg px-8"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPublic ? (isFree ? "Confirm & Join" : "Pay & Join Now") : "Submit Request"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
