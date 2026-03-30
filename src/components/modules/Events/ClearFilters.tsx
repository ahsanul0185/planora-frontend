"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

const ClearFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasActiveFilters = useMemo(() => {
    const filterableKeys = ["searchTerm", "categoryId", "visibility", "isFree", "sortBy", "sortOrder"];
    return filterableKeys.some(key => searchParams.has(key));
  }, [searchParams]);

  const handleClearAll = () => {
    router.replace(pathname, { scroll: false });
  };

  if (!hasActiveFilters) return null;

  return (
    <div className="flex justify-center mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
      <button
        onClick={handleClearAll}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-full bg-[#004337]/5 text-[#004337] hover:bg-[#004337] hover:text-white transition-all duration-300 group shadow-sm active:scale-95"
        )}
      >
        <XCircle className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.2rem]">
          Clear All Selections
        </span>
      </button>
    </div>
  );
};

export default ClearFilters;
