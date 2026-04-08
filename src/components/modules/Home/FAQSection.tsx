"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How can I attend an event on Planora?",
    answer: "Planora makes attending easy. Simply browse our curated categories, select an event that intrigues you, and request an invitation or book directly on the event details page."
  },
  {
    question: "Can I host my own orchestrations?",
    answer: "Absolutely. Planora provides a comprehensive dashboard for organizers. You can create, manage, and track your events, whether they are public festivals or private, invite-only gatherings."
  },
  {
    question: "Is my booking and payment secure?",
    answer: "We prioritize your security. All transactions on Planora are processed through encrypted, industry-standard gateways to ensure your financial data remains private and protected."
  },
  {
    question: "How do I contact an event organizer?",
    answer: "Once you have joined an event, you can communicate directly with the organizer through the contact details provided on your participation dashboard or the event details page."
  },
  {
    question: "What if an event is cancelled?",
    answer: "If an organizer cancels an event, you will be notified immediately via email and your dashboard. Refund policies are handled according to the specific terms set by the organizer for each event."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6 md:px-8 max-w-[1440px] mx-auto mb-24 md:mb-40">
      <div className="flex flex-col items-center text-center mb-12 md:mb-16 gap-4">
        <div className="max-w-2xl">
          <h2 className="font-newsreader text-3xl md:text-4xl text-primary font-medium">Common Inquiries</h2>
    
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">

        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`rounded-2xl border transition-all duration-300 ${
              openIndex === index 
                ? "border-primary/20 bg-primary/2" 
                : "border-primary/5 bg-white hover:border-primary/10"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className={`font-newsreader text-xl md:text-2xl transition-colors duration-300 ${
                openIndex === index ? "text-primary" : "text-[#191c1b]"
              }`}>
                {faq.question}
              </span>
              <div className={`shrink-0 ml-4 transition-transform duration-500 ${
                openIndex === index ? "rotate-180" : ""
              }`}>

                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-[#191c1b]/40" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-[#191c1b]/60 text-base md:text-lg leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
