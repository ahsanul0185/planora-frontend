"use client";

import { useServerManagedDataTableFilters, serverManagedFilter } from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { getEventCategories } from "@/services/eventCategory.services";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const EVENT_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.single("visibility"),
  serverManagedFilter.single("categoryId"),
  serverManagedFilter.single("isFree"),
];

const EventFilters = () => {
  const searchParams = useSearchParams();
  
  const { updateParams } = useServerManagedDataTable({
    searchParams,
  });

  const { filterValues, handleFilterChange } = useServerManagedDataTableFilters({
    searchParams,
    definitions: EVENT_FILTER_DEFINITIONS,
    updateParams,
  });

  const { data: categoryResponse } = useQuery({
    queryKey: ["event-categories"],
    queryFn: getEventCategories,
    staleTime: 1000 * 60 * 60,
  });
  const categories = categoryResponse?.data ?? [];

  const activeCategory = filterValues.categoryId || "all";
  const activeVisibility = filterValues.visibility || "all";
  const activeIsFree = filterValues.isFree || "all";

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2rem] text-[#3f4945] mr-4 opacity-60">Categories</span>
        <button
          onClick={() => handleFilterChange("categoryId", undefined)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
            activeCategory === "all" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
          )}
        >
          All Categories
        </button>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilterChange("categoryId", category.id)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 whitespace-nowrap",
                activeCategory === category.id ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">
        {/* Visibility Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2rem] text-[#3f4945] mr-4 opacity-60">Exclusivity</span>
          <button
            onClick={() => handleFilterChange("visibility", undefined)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeVisibility === "all" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Any Access
          </button>
          <button
            onClick={() => handleFilterChange("visibility", "PUBLIC")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeVisibility === "PUBLIC" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Public
          </button>
          <button
            onClick={() => handleFilterChange("visibility", "PRIVATE")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeVisibility === "PRIVATE" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Private
          </button>
        </div>

        {/* Fee Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.2rem] text-[#3f4945] mr-4 opacity-60">Admission</span>
          <button
            onClick={() => handleFilterChange("isFree", undefined)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeIsFree === "all" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Any
          </button>
          <button
            onClick={() => handleFilterChange("isFree", "true")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeIsFree === "true" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Free
          </button>
          <button
            onClick={() => handleFilterChange("isFree", "false")}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all active:scale-95",
              activeIsFree === "false" ? "bg-[#004337] text-white" : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
            )}
          >
            Paid
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
