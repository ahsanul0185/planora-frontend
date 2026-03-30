"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const EventSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTermFromUrl = searchParams.get("searchTerm") || "";
  const [value, setValue] = useState(searchTermFromUrl);

  // Sync strictly when searchTermFromUrl changes (e.g. back button or clear)
  useEffect(() => {
    setValue(searchTermFromUrl);
  }, [searchTermFromUrl]);

  const updateSearch = useCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedTerm = term.trim();
    const currentTerm = searchParams.get("searchTerm") || "";

    if (normalizedTerm === currentTerm) return;

    if (normalizedTerm) {
      params.set("searchTerm", normalizedTerm);
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1"); // Always reset to page 1 on new search

    // Bypass shared hook's heavy router.refresh() by using router.replace directly
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  // Handle local debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== searchTermFromUrl) {
        updateSearch(value);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value, searchTermFromUrl, updateSearch]);

  return (
    <div className="relative w-full max-w-3xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bec9c4] h-5 w-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by event title or curator name..."
        className="w-full pl-12 pr-6 py-4 bg-[#e0e3e0] border-none rounded-2xl focus:ring-2 focus:ring-[#004337]/40 focus:bg-white transition-all text-[#181c1b] placeholder:text-[#3f4945]/40 text-lg font-medium outline-none"
      />
    </div>
  );
};

export default EventSearch;
