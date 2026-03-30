"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents, IMyEventsQueryParams } from "@/services/event.services";
import { useMemo } from "react";
import Image from "next/image";
import { Calendar, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface EventsListProps {
  initialParams: IMyEventsQueryParams;
}

const EventsList = ({ initialParams }: EventsListProps) => {
  const searchParams = useSearchParams();

  const currentQueryParams: IMyEventsQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : initialParams.page,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : initialParams.limit,
      sortBy: searchParams.get("sortBy") || initialParams.sortBy,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || initialParams.sortOrder,
      status: searchParams.get("status") || "PUBLISHED",
      visibility: searchParams.get("visibility") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      isFree: searchParams.get("isFree") || undefined,
    };
  }, [searchParams, initialParams]);

  const { data, isFetching } = useQuery({
    queryKey: ["public-events", currentQueryParams],
    queryFn: () => getAllEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const events = data?.data ?? [];

  if (!isFetching && events.length === 0) {
    return (
      <div className="text-center py-24 bg-[#f1f4f1] rounded-[2rem]">
        <h3 className="font-newsreader text-3xl text-[#004337] mb-4">No events found</h3>
        <p className="text-[#3f4945] opacity-60 font-light">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="group bg-white rounded-3xl overflow-hidden shadow-[0_24px_48px_-12px_rgba(24,28,27,0.06)] border border-[#bec9c4]/10 flex flex-col transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(24,28,27,0.12)]"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <Image
              src={event.bannerImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop"}
              alt={event.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#d1e7e2] text-[#374b47] text-[10px] font-bold rounded-md uppercase tracking-wider">
                {event.visibility === "PUBLIC" ? (event.registrationFee === 0 ? "Public Free" : "Public Paid") : (event.registrationFee === 0 ? "Private Free" : "Private Paid")}
              </span>
            </div>
            {event.isFeatured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#004337] text-[#a6f1dc] text-[10px] font-bold rounded-md uppercase tracking-wider">
                  Featured
                </span>
              </div>
            )}
          </div>
          
          <div className="p-8 flex flex-col flex-grow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#004337] font-bold text-[10px] uppercase tracking-widest">
                <Calendar className="h-3 w-3" />
                {format(new Date(event.startDate), "MMM dd, yyyy")}
              </div>
              {event.category && (
                <span className="text-[10px] font-bold text-[#3f4945]/40 uppercase tracking-[0.15rem]">
                  {event.category.name}
                </span>
              )}
            </div>
            
            <h3 className="font-newsreader text-2xl font-bold tracking-tight text-[#181c1b] mb-1 group-hover:text-[#004337] transition-colors leading-tight">
              {event.title}
            </h3>
            <p className="text-[#3f4945] text-[13px] font-medium mb-4 italic opacity-60">
              Curated by {event.organizer?.name}
            </p>

            <p className="text-[#3f4945] text-sm leading-relaxed line-clamp-3 mb-6 opacity-80 font-light">
              {event.description}
            </p>

            {event.venueName && (
              <div className="flex items-start gap-2 text-[#3f4945] text-[11px] mb-8 opacity-70">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#004337]" />
                <span className="line-clamp-1 uppercase tracking-wider">{event.venueName}</span>
              </div>
            )}
            
            <div className="mt-auto pt-6 flex items-center justify-between border-t border-[#bec9c4]/10">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-tighter text-[#3f4945]/60 font-bold">Admission</span>
                <span className="text-xl font-bold text-[#004337]">
                  {event.registrationFee === 0 ? "Free Access" : `${event.currency === "BDT" ? "৳" : "$"}${event.registrationFee}`}
                </span>
              </div>
              <Link 
                href={`/events/${event.slug}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#d9e5e2] text-[#131e1c] font-bold text-xs rounded-xl hover:bg-[#004337] hover:text-white transition-all active:scale-95"
              >
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsList;
