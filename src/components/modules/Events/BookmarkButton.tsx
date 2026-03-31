"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { addBookmark, removeBookmark } from "@/services/bookmark.services";
import { IEvent } from "@/types/event.types";
import { UserInfo } from "@/types/user.types";
import { Button } from "@/components/ui/button";

interface BookmarkButtonProps {
  event: IEvent;
  userInfo: UserInfo | null;
  initialBookmarked: boolean;
}

export default function BookmarkButton({ event, userInfo, initialBookmarked }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
        toast.success("Saved to bookmarks", { id: toastId });
      }
    } catch {
      setIsBookmarked(previousState);
      toast.error("Failed to update bookmark", { id: toastId });
    }
  };

  return (
    <>
      <button 
        onClick={handleBookmark}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md bg-white/20 border border-white/40 hover:bg-white transition-all duration-500 group shadow-lg"
        title={isBookmarked ? "Remove from Bookmarks" : "Save to Bookmarks"}
      >
        <Heart 
          className={`h-4 w-4 transition-all duration-300 ${isBookmarked ? "fill-[#004337] text-[#004337]" : "text-white group-hover:text-[#004337]"}`} 
        />
      </button>

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
