"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "@/services/event.services";
import Link from "next/link";
import { IEvent } from "@/types/event.types";

export function FeaturedOrchestrations() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["featuredEvents"],
    queryFn: () => getAllEvents({ isFeatured: true, limit: 4 }),
  });

  const rawEvents = response?.data || [];
  
  // Create an array of exactly 4 items, padding with null if we don't have enough featured events
  const events = Array.from({ length: 4 }).map((_, i) => rawEvents[i] || null);

  const fallbackImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBn-aY_OGBpsCgwIAvt5oHMNsKkTntzIqf88bYFE3IqA_raDyaq9Bj3W4sGkzRg8rGudmTyLWud7dveNrOzx_QSlLyAsQWAwpTEpReL1JnD2DPjBYtNW2W-4-TFzO9iLaPNiEKRq6F0lW_VVs-k9z8b4EsYSdC970s95VDEhaqvyp7KVn0BczNU_3skrgpYByaku6VH4fh_sEcnBuEOXaeomCy30dvXhVz641G4_8PfA-zUVIoczk-bgQ30FKU4UVl-fv_cNbtZsjAg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCEHYcXbRN6IP_5J0xZU391RLdNdHrLvN_F6zxvctGtvwBdsQUMXUOGSwV0yMsFvwBcCzt-cM6GlhMy44tWy18EjB_FdlFK1hogWtXhdqP8Q38ySTKjlchVKgSEVC1iNetbTsrYB9J2B_w5TMA8cEG_btXcJsn97U3Pw95xefm-p7mkLoaV9-foGcOJ59n92lWOs-HhUCO7EoCQ54WjTxTdaWtT8o4aPYf4-0klm9O9d1oWqv6idt0UzJLpWoI0_ZB5f9rtmeLpSN_t",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCx3ZIGq-UpbxPQxlKacV2Ov5664bl1WuqHhcuyz6e_zNza-cm40p7aOllV8jxcG6TCuazY_i4qGKxj0oCo63ykQpKVaz94xRDIa4YmsNLa7_UcEZwASKAT7D3AjHlAjay_1BuHSm6HMQGnSAjqo0s-QJKy1Wf8hObo_U7VbX0wezBA6ESPZ96gLZNTnHuV8iFlbB5f5_OpZPa4MYE-d6lzK3vgOHR3-VPPCh2UEovCI5UzkF3_5R0Qd3L6lcwCc7XMdgT2XBupsO1z",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCyo0zv8MdlQ1uEwtW3sTqoZORQeHSJQ7jedJ_GkADn2DwVagz4suqv6AyqYDU4JFX4IdBsmTa9KWuTEIkMY0BZ8X4B6qL1S4TYTOD7MD66Q-gXlubnHI1I0we3Q1Pw_Y2g-wzfzlHLMXcRguBWkoMsJEduw5KGijo7B2G9GJ2_TnxctuZSyKkTBKEGNOCwpCc0UQoBWDqezIbdKRICoEJaFVfMpWLRrxM7UMkf1gV5Q2o2vNeY9WEHDa3YeSywQk0zmBeM-qDhO3AP"
  ];

  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-24 md:mb-40">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="font-newsreader text-3xl md:text-4xl text-primary font-medium">Featured Orchestrations</h2>
          <p className="text-sm md:text-base text-[#404944] mt-2">Curated selections from the world's most exclusive organizers.</p>
        </div>
        <Link href="/events" className="text-primary font-newsreader border-b-2 border-primary/20 hover:border-primary pb-1 transition-all text-sm md:text-base">
          View All Events
        </Link>
      </div>

      {isLoading ? (
        <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-6 h-auto md:h-[700px]">
           <div className="bg-[#e7e9e5] rounded-xl lg:col-span-2 lg:row-span-2 animate-pulse h-[300px] md:h-auto" />
           <div className="bg-[#e7e9e5] rounded-xl lg:col-span-2 lg:row-span-1 animate-pulse h-[200px] md:h-auto" />
           <div className="bg-[#e7e9e5] rounded-xl lg:col-span-1 lg:row-span-1 animate-pulse h-[200px] md:h-auto" />
           <div className="bg-[#e7e9e5] rounded-xl lg:col-span-1 lg:row-span-1 animate-pulse h-[200px] md:h-auto" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-6 lg:h-[700px]">
          {/* Main Large Item */}
          {events[0] ? (
            <Link href={`/events/${events[0].slug}`} className="md:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-xl bg-[#f3f4f1] aspect-[4/3] md:aspect-auto">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={events[0].title}
                src={events[0].bannerImage || fallbackImages[0]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1rem] font-bold uppercase mb-2">{events[0].category?.name || "Curated"}</span>
                <h3 className="font-newsreader text-2xl md:text-3xl mb-4">{events[0].title}</h3>
                <button className="text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2 group/btn">
                  Request Invitation <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </Link>
          ) : (
            <div className="md:col-span-2 lg:row-span-2 rounded-xl bg-[#f3f4f1] border border-dashed border-[#c0c9c3] flex items-center justify-center h-[300px] md:h-auto">
              <span className="text-[#404944]">Featured Event Slot A</span>
            </div>
          )}

          {/* Top Right Item */}
          {events[1] ? (
            <Link href={`/events/${events[1].slug}`} className="md:col-span-2 lg:row-span-1 relative group overflow-hidden rounded-xl bg-[#f3f4f1] aspect-video md:aspect-auto">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={events[1].title}
                src={events[1].bannerImage || fallbackImages[1]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
                <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1rem] font-bold uppercase mb-1">{events[1].category?.name || "Curated"}</span>
                <h3 className="font-newsreader text-xl md:text-2xl">{events[1].title}</h3>
              </div>
            </Link>
          ) : (
            <div className="md:col-span-2 lg:row-span-1 rounded-xl bg-[#f3f4f1] border border-dashed border-[#c0c9c3] flex items-center justify-center h-[200px] md:h-auto">
              <span className="text-[#404944]">Featured Event Slot B</span>
            </div>
          )}

          {/* Bottom Right Item 1 */}
          {events[2] ? (
            <Link href={`/events/${events[2].slug}`} className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-xl bg-[#f3f4f1] aspect-square lg:aspect-auto">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={events[2].title}
                src={events[2].bannerImage || fallbackImages[2]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
                <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1rem] font-bold uppercase mb-1">{events[2].category?.name || "Corporate"}</span>
                <h3 className="font-newsreader text-lg md:text-xl">{events[2].title}</h3>
              </div>
            </Link>
          ) : (
            <div className="lg:col-span-1 lg:row-span-1 rounded-xl bg-[#f3f4f1] border border-dashed border-[#c0c9c3] flex items-center justify-center h-[200px] md:h-auto">
              <span className="text-[#404944]">Featured Slot C</span>
            </div>
          )}

          {/* Bottom Right Item 2 */}
          {events[3] ? (
            <Link href={`/events/${events[3].slug}`} className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-xl bg-[#f3f4f1] aspect-square lg:aspect-auto">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={events[3].title}
                src={events[3].bannerImage || fallbackImages[3]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-5 md:p-6 text-white">
                <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.1rem] font-bold uppercase mb-1">{events[3].category?.name || "Performance"}</span>
                <h3 className="font-newsreader text-lg md:text-xl">{events[3].title}</h3>
              </div>
            </Link>
          ) : (
            <div className="lg:col-span-1 lg:row-span-1 rounded-xl bg-[#f3f4f1] border border-dashed border-[#c0c9c3] flex items-center justify-center h-[200px] md:h-auto">
              <span className="text-[#404944]">Featured Slot D</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
