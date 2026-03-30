"use client";

import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const QuickSortBar = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  
  const { updateParams } = useServerManagedDataTable({
    searchParams,
  });

  const currentSortBy = searchParams.get("sortBy") || "startDate";
  const currentSortOrder = searchParams.get("sortOrder") || "asc";

  const sortOptions = [
    { label: "Most Recent", sortBy: "startDate", sortOrder: "desc" },
    { label: "Price: Low to High", sortBy: "registrationFee", sortOrder: "asc" },
    { label: "Price: High to Low", sortBy: "registrationFee", sortOrder: "desc" },
  ];

  return (
    <div 
      className={cn(
        "fixed bottom-10 left-10 z-50 transition-all duration-500 ease-in-out h-14 max-w-[600px]",
        isOpen ? "w-[calc(100%-80px)] bg-white/95" : "w-14 bg-[#004337]"
      )}
      style={{
        borderRadius: "9999px",
        backdropFilter: isOpen ? "blur(16px)" : "none",
        boxShadow: "0 24px 48px -12px rgba(24,28,27,0.2)"
      }}
    >
      <div className="relative h-full w-full flex items-center px-2 overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-500 active:scale-90",
            isOpen ? "bg-[#d1e7e2] text-[#004337]" : "bg-transparent text-white"
          )}
        >
          <SlidersHorizontal className={cn("h-5 w-5 transition-transform duration-500", isOpen && "rotate-90")} />
        </button>

        <div className={cn(
          "flex items-center gap-6 ml-6 transition-all duration-300",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"
        )}>
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2rem] text-[#3f4945] opacity-40">Sort By</span>
          <div className="h-4 w-px bg-[#bec9c4]/30" />
          
          <div className="flex items-center gap-6 pr-4">
            {sortOptions.map((option) => {
              const isActive = currentSortBy === option.sortBy && currentSortOrder === option.sortOrder;
              return (
                <button
                  key={`${option.sortBy}-${option.sortOrder}`}
                  onClick={() => {
                    updateParams((params) => {
                      if (isActive) {
                        params.delete("sortBy");
                        params.delete("sortOrder");
                      } else {
                        params.set("sortBy", option.sortBy);
                        params.set("sortOrder", option.sortOrder);
                      }
                    }, { resetPage: true });
                  }}
                  className={cn(
                    "text-[0.7rem] font-bold transition-all hover:opacity-70 whitespace-nowrap uppercase tracking-tighter",
                    isActive ? "text-[#004337]" : "text-[#3f4945]/60"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSortBar;
