"use client";

import { useQuery } from "@tanstack/react-query";
import { getAIRecommendations } from "@/services/ai.services";
import { IEvent } from "@/types/event.types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";

export function ForYou({ isParticipant }: { isParticipant: boolean }) {
  const { data: events, isLoading } = useQuery({
    queryKey: ["aiRecommendations"],
    queryFn: getAIRecommendations,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  // Strict check: Only show for participants
  if (!isParticipant) return null;

  // If not loading and no events, hide
  if (!isLoading && (!events || events.length === 0)) return null;


  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-24 md:mb-40">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="font-newsreader text-3xl md:text-4xl text-primary font-medium">Suggested For You</h2>
          <p className="text-sm md:text-base text-[#404944] mt-2">Hand-picked experiences based on your unique interests and activity.</p>
        </div>
      </div>



      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-[450px] bg-[#edeeeb]/50 rounded-2xl animate-pulse" />
            ))
          : events?.slice(0, 4).map((event: IEvent & { aiReason?: string }) => (
              <div 
                key={event.id} 
                className="group bg-white rounded-2xl border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(25,28,27,0.06)] flex flex-col h-full overflow-hidden"
              >
                {/* Image Section */}
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image
                    src={event.bannerImage || "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                      <Tag className="w-3 h-3" />
                      <span className="uppercase tracking-wider">{(event.category as any)?.name || "Event"}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {event.registrationFee === 0 ? "FREE" : "PAID"}
                    </span>
                  </div>

                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-primary/60 text-[11px] font-bold uppercase tracking-widest mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {format(new Date(event.startDate), "MMMM dd, yyyy")}
                  </div>
                  
                  <h3 className="text-2xl font-newsreader italic text-[#191c1b] mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[#191c1b]/40 text-xs mb-auto">
                    <User className="w-3.5 h-3.5" />
                    <span>Organized by <span className="text-[#191c1b]/80 font-semibold">{(event.organizer as any)?.name || "Planora"}</span></span>
                  </div>

                  <div className="mt-8 pt-6 border-t border-primary/5">
                    <Link href={`/events/${event.id}`}>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between group/btn border-primary/10 hover:border-primary hover:bg-primary hover:text-white rounded-xl py-6 transition-all duration-300"
                      >
                        <span className="font-bold text-xs uppercase tracking-widest">View Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
