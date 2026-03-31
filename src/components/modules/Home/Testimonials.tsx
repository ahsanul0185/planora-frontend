"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Julian Montgomery",
    role: "Founding Director, Apex Curations",
    quote: "Planora has transformed how we approach high-ticket event management. The editorial interface isn't just a skin; it's a statement of quality that our clients recognize immediately.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Elena Rossi",
    role: "Creative Lead, Venetian Galas",
    quote: "The attention to detail in the orchestration tools is unparalleled. We've managed to scale our exclusive gatherings by 40% while actually increasing the personalized feel for each attendee.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Chief Concierge, Obsidian Events",
    quote: "In a world of noisy platforms, Planora is the silent partner every luxury organizer needs. It handles the complexity with a grace that allows us to focus entirely on the guest experience.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
  }
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section className="px-8 max-w-[1440px] mx-auto my-40">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden w-full max-w-md mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0"
                alt={current.name}
                src={current.image}
              />
            </AnimatePresence>
          </div>
          <motion.div 
            key={`quote-icon-${index}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-2xl flex items-center justify-center -translate-y-1/2 z-10"
          >
            <span className="material-symbols-outlined text-white text-8xl">format_quote</span>
          </motion.div>
        </div> 
        <div className="overflow-hidden">
          <h2 className="font-newsreader text-4xl text-primary font-medium mb-12">
            Voices of the Circle
          </h2>
          
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <p className="font-newsreader text-3xl leading-tight text-[#191c1b] mb-8">
                  "{current.quote}"
                </p>
                <cite className="not-italic">
                  <span className="block font-bold text-primary uppercase tracking-[0.1rem] text-sm">
                    {current.name}
                  </span>
                  <span className="block text-[#404944] text-sm mt-1">
                    {current.role}
                  </span>
                </cite>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex gap-4 mt-12">
            <button 
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all outline-none"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button 
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#c0c9c3] flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all outline-none"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
