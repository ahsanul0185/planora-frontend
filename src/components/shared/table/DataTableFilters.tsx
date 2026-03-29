"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DataTableFilterOption {
  label: string;
  value: string;
}

export interface DataTableFilterConfig {
  id: string;
  label: string;
  options: DataTableFilterOption[];
}

export type RangeOperator = "lte" | "gte" | "lt" | "gt" | "eq" | "ne";
export type DataTableRangeValue = Partial<Record<RangeOperator, string>>;
export type DataTableFilterValue = string | string[] | DataTableRangeValue | undefined;
export type DataTableFilterValues = Record<string, DataTableFilterValue | any>;

interface DataTableFiltersProps {
  filters: DataTableFilterConfig[];
  values: DataTableFilterValues;
  onFilterChange: (filterId: string, value: DataTableFilterValue) => void;
  onClearAll?: () => void;
  isLoading?: boolean;
}

const DataTableFilters = ({
  filters,
  values,
  onFilterChange,
  onClearAll,
  isLoading,
}: DataTableFiltersProps) => {
  const activeCount = Object.values(values).filter((v) => v !== undefined && v !== "" && (Array.isArray(v) ? v.length > 0 : true)).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        const rawValue = values[filter.id];
        // Treat empty string as no selection
        const currentValue = rawValue === "" ? undefined : rawValue;
        const selectedOption = filter.options.find((o) => o.value === currentValue);

        return (
          <DropdownMenu key={filter.id}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 gap-1.5 transition-all duration-200",
                  currentValue ? "border-primary bg-primary/5 text-primary" : "text-muted-foreground"
                )}
                disabled={isLoading}
              >
                <span className="font-medium">
                  {selectedOption ? (
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs opacity-70 font-normal">{filter.label}:</span>
                      <span>{selectedOption.label}</span>
                    </span>
                  ) : (
                    filter.label
                  )}
                </span>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", currentValue && "rotate-180")} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-40">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {filter.label}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filter.options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  className={currentValue === option.value ? "bg-accent font-medium" : ""}
                  onClick={() =>
                    onFilterChange(
                      filter.id,
                      currentValue === option.value ? undefined : option.value
                    )
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              {currentValue && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onFilterChange(filter.id, undefined)}
                    className="text-muted-foreground text-xs"
                  >
                    Clear filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}

      {activeCount > 0 && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-2 text-muted-foreground hover:text-foreground"
          onClick={onClearAll}
          disabled={isLoading}
        >
          <X className="mr-1 h-4 w-4" />
          Clear all
        </Button>
      )}
    </div>
  );
};

export default DataTableFilters;
