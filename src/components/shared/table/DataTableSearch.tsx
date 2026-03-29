"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface DataTableSearchProps {
  initialValue?: string;
  placeholder?: string;
  debounceMs?: number;
  onDebouncedChange: (value: string) => void;
  isLoading?: boolean;
}

const DataTableSearch = ({
  initialValue = "",
  placeholder = "Search...",
  debounceMs = 400,
  onDebouncedChange,
}: DataTableSearchProps) => {
  const [value, setValue] = useState(initialValue);

  // Keep a fresh reference to onDebouncedChange
  const callbackRef = useRef(onDebouncedChange);
  useEffect(() => {
    callbackRef.current = onDebouncedChange;
  }, [onDebouncedChange]);

  // Sync strictly when initialValue changes from OUTSIDE (e.g. clear filters)
  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  // Debounce the user input
  useEffect(() => {
    const timer = setTimeout(() => {
      // only trigger if value differs from currently applied initialValue to avoid loops
      // but if we are just typing, it will fire.
      callbackRef.current(value);
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  return (
    <div className="relative w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-8 h-9"
      />
    </div>
  );
};

export default DataTableSearch;
