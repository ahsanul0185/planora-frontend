"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/services/event.services";
import Link from "next/link";
import { IEvent } from "@/types/event.types";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useState } from "react";

export function UpcomingEvents() {
  const [api, setApi] = useState<CarouselApi>();

  const { data: response, isLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: () => getAllEvents({ status: "PUBLISHED", visibility: "PUBLIC", limit: 9 }),
  });

  const events = response?.data || [];

  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-24 md:mb-40 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div>
          <h2 className="font-newsreader text-3xl md:text-4xl text-primary font-medium">Upcoming Public Events</h2>
          <p className="text-sm md:text-base text-[#404944] mt-2">Open doors to extraordinary collective experiences.</p>
        </div>
        <div className="flex gap-2 self-end">
          <button
            onClick={() => api?.scrollPrev()}
            className="w-10 h-10 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="w-10 h-10 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-4 md:-ml-6 w-[calc(100%+16px)] md:w-[calc(100%+24px)] pb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <CarouselItem key={i} className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                <div className="h-[350px] md:h-[450px] bg-white rounded-xl animate-pulse" />
              </CarouselItem>
            ))
          ) : events.length === 0 ? (
            <div className="pl-6 w-full">
              <p className="text-[#404944]">No upcoming events at the moment.</p>
            </div>
          ) : (
            events.map((event: IEvent) => (
              <CarouselItem key={event.id} className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/4">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full border border-primary/5">
                  <div className="aspect-video relative bg-[#edeeeb] overflow-hidden">
                    <img
                      alt={event.title}
                      className="w-full h-full object-cover"
                      src={
                        event.bannerImage ||
                        "https://lh3.googleusercontent.com/aida-public/AB6AXuBn-aY_OGBpsCgwIAvt5oHMNsKkTntzIqf88bYFE3IqA_raDyaq9Bj3W4sGkzRg8rGudmTyLWud7dveNrOzx_QSlLyAsQWAwpTEpReL1JnD2DPjBYtNW2W-4-TFzO9iLaPNiEKRq6F0lW_VVs-k9z8b4EsYSdC970s95VDEhaqvyp7KVn0BczNU_3skrgpYByaku6VH4fh_sEcnBuEOXaeomCy30dvXhVz641G4_8PfA-zUVIoczk-bgQ30FKU4UVl-fv_cNbtZsjAg"
                      }
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      {event.registrationFee > 0 ? (
                        <span className="bg-primary/10 text-primary text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded">
                          Paid
                        </span>
                      ) : (
                        <span className="bg-[#d5e7db] text-[#3b4a42] text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded">
                          Free
                        </span>
                      )}
                      <span className="text-[10px] md:text-xs font-medium text-[#404944]">
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-newsreader text-lg md:text-xl text-primary font-bold mb-1 md:mb-2 line-clamp-1">{event.title}</h3>
                    <p className="text-[10px] md:text-xs text-[#404944] mb-4 line-clamp-1">
                      by <span className="font-bold">{event.organizer?.name || "Organizer"}</span>
                    </p>
                    <Link href={`/events/${event.slug}`}>
                      <button className="w-full py-3 rounded-lg border border-primary/20 text-primary text-[0.65rem] md:text-[0.7rem] font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
