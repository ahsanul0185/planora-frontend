"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Layers, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IEventCategory } from "@/types/event.types";
import { cn } from "@/lib/utils";

interface CategoryDropdownProps {
  categories: IEventCategory[];
}

export function CategoryDropdown({ categories }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (id: string) => {
    setIsOpen(false);
    router.push(`/events?categoryId=${id}`);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 py-1.5 font-medium transition-colors outline-none cursor-pointer",
          isOpen ? "text-primary" : "text-[#191c1b]/60 hover:text-primary"
        )}
      >
        <span>Categories</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, rotateX: -15, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: -15, scale: 0.95, y: 10 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.23, 1, 0.32, 1],
              opacity: { duration: 0.2 } 
            }}
            style={{ transformOrigin: "top", perspective: "1000px" }}
            className="absolute top-full left-0 mt-3 w-64 bg-white backdrop-blur-2xl border border-[#004337]/5 rounded-[1.5rem] shadow-[0_32px_64px_-16px_rgba(0,67,55,0.12)] overflow-hidden z-[100]"
          >
            <div className="p-3 flex flex-col gap-1">
              
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full group flex items-center justify-between p-3 rounded-xl hover:bg-[#004337]/5 transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#f1f4f1] p-1.5 flex items-center justify-center">
                      {category.icon ? (
                        <Image 
                          src={category.icon} 
                          alt={category.name} 
                          fill 
                          className="object-contain p-1.5"
                        />
                      ) : (
                        <Layers className="h-4 w-4 text-[#004337]/40" />
                      )}
                    </div>
                    <span className="text-sm font-semibold text-[#181c1b] group-hover:text-[#004337] transition-colors line-clamp-1">
                      {category.name}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#004337] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
