"use client";

import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllEvents, IMyEventsQueryParams } from "@/services/event.services";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

const EventPagination = () => {
  const searchParams = useSearchParams();
  const { handlePaginationChange } = useServerManagedDataTable({
    searchParams,
  });

  const currentQueryParams: IMyEventsQueryParams = useMemo(() => {
    return {
      searchTerm: searchParams.get("searchTerm") || undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
      sortBy: searchParams.get("sortBy") || "startDate",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
      status: searchParams.get("status") || "PUBLISHED",
      visibility: searchParams.get("visibility") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      isFree: searchParams.get("isFree") || undefined,
      isFeatured: searchParams.get("isFeatured") || undefined,
    };
  }, [searchParams]);

  const { data } = useQuery({
    queryKey: ["public-events", currentQueryParams],
    queryFn: () => getAllEvents(currentQueryParams),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });

  const totalPages = data?.meta?.totalPages || 1;
  const currentPage = currentQueryParams.page || 1;
  const limit = currentQueryParams.limit || 12;

  const onPageChange = (page: number) => {
    handlePaginationChange({
      pageIndex: page - 1,
      pageSize: limit,
    });
  };

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 active:scale-90",
            currentPage === i
              ? "bg-[#004337] text-[#a6f1dc] shadow-[0_8px_16px_-4px_rgba(0,67,55,0.2)]"
              : "bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2]"
          )}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-20">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 active:scale-90"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-3">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-12 h-12 rounded-full flex items-center justify-center bg-[#e0e3e0] text-[#3f4945] hover:bg-[#d9e5e2] disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 active:scale-90"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default EventPagination;
