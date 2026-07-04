"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FAQS = [
  {
    question: "What is your warranty policy?",
    answer:
      "We provide a reliable manufacturer warranty covering defects in materials or workmanship. Warranty duration varies by product, and claims can be made by contacting our support team with proof of purchase.",
  },
  {
    question: "How does the 7-day return policy work?",
    answer:
      "You may request a return within 7 days of delivery if the item is unused, in original condition, and includes all accessories. Our support team will guide you through the return process.",
  },
  {
    question: "Which countries do you ship to?",
    answer:
      "We ship across India and selected international locations. Availability may vary by region, and customers can check eligible destinations at checkout. International orders may include additional duties or customs fees.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is dispatched, you'll receive a tracking link via email or SMS. You can monitor real-time shipping updates directly through our courier partner's tracking portal.",
  },
  {
    question: "How do I get my product repaired within warranty?",
    answer:
      "To request a warranty repair, contact our support team with your order details. After verification, we'll arrange service or replacement depending on the issue and product eligibility.",
  },
  {
    question: "Are they compatible with my laptop? Is a driver required?",
    answer:
      "All Xavion products list detailed compatibility specifications. Most devices are plug-and-play; however, certain models may require driver installation, which can be downloaded from our support page if needed.",
  },
  {
    question: "How much does shipping cost and how long will it take?",
    answer:
      "Shipping costs depend on delivery location and selected courier service. Estimated delivery timelines appear at checkout, and orders typically arrive within the standard timeframe provided by our logistics partners.",
  },
  {
    question: "What are the differences between your different models?",
    answer:
      "Each model varies in features, performance, design, and intended usage. Product pages include detailed comparisons to help customers choose based on speed, connectivity, compatibility, and functional requirements.",
  },
];

export function FAQSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="py-14 lg:py-20 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`mb-10 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">FAQs</span>
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border border-[#E5E5E5] bg-[#FAFAFA] transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index % 2) * 80}ms` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-3 text-left px-5 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-medium text-[#1A1A1A] font-body">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 mt-0.5 text-[#737373] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#737373] leading-relaxed font-body px-5 pb-5">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
