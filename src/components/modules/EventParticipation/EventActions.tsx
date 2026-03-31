"use client";

import { useState } from "react";
import { Share2, Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { addBookmark, removeBookmark } from "@/services/bookmark.services";
import { IEvent, IDetailedEvent } from "@/types/event.types";
import { UserInfo } from "@/types/user.types";

interface EventActionsProps {
  event: IEvent | IDetailedEvent;
  userInfo: UserInfo | null;
  initialBookmarked: boolean;
}

export default function EventActions({ event, userInfo, initialBookmarked }: EventActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleBookmark = async () => {
    if (!userInfo) {
      setIsModalOpen(true);
      return;
    }

    const previousState = isBookmarked;
    const toastId = toast.loading(previousState ? "Removing bookmark..." : "Saving bookmark...");
    setIsBookmarked(!previousState);

    try {
      if (previousState) {
        await removeBookmark(event.id);
        toast.success("Bookmark removed", { id: toastId });
      } else {
        await addBookmark(event.id);
        toast.success("Bookmark saved!", { id: toastId });
      }
    } catch (error) {
      setIsBookmarked(previousState);
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleShare}
          className="p-3 rounded-xl hover:bg-[#ecefec] transition-colors"
          title="Share Event"
        >
          <Share2 className="h-5 w-5 text-[#004337]" />
        </button>
        <button 
          onClick={handleBookmark}
          className="p-3 rounded-xl hover:bg-[#ecefec] transition-colors group"
          title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
        >
          <Heart 
            className={`h-5 w-5 transition-all duration-300 ${isBookmarked ? "fill-[#004337] text-[#004337]" : "text-[#004337] group-hover:scale-110"}`} 
          />
        </button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md rounded-3xl p-10 bg-[#f7faf7] border-[#004337]/10">
          <DialogHeader className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-[#d1e7e2] rounded-2xl flex items-center justify-center mb-4">
              <Heart className="h-10 w-10 text-[#004337]" />
            </div>
            <DialogTitle className="font-newsreader text-4xl font-bold text-[#004337]">
                Login Required
            </DialogTitle>
            <DialogDescription className="text-lg text-[#3f4945] font-light leading-relaxed">
                You need to be logged in to bookmark events. Secure your spots and keep track of your favorite experiences.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-8">
            <Button 
                onClick={() => router.push(`/login?redirect=/events/${event.slug}`)}
                className="w-full py-6 bg-[#004337] hover:bg-[#005d4d] text-white font-bold rounded-xl active:scale-95 transition-all text-lg shadow-lg shadow-[#004337]/10"
            >
                Continue to Login
            </Button>
            <Button 
                variant="ghost" 
                onClick={() => setIsModalOpen(false)}
                className="w-full text-[#3f4945] font-bold hover:bg-[#ecefec]"
            >
                Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
