"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getTopReviews } from "@/lib/products";

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  const picks = getTopReviews(6);

  if (picks.length === 0) return null;

  const nextTestimonial = () => setActiveIndex((prev) => (prev === picks.length - 1 ? 0 : prev + 1));
  const prevTestimonial = () => setActiveIndex((prev) => (prev === 0 ? picks.length - 1 : prev - 1));

  return (
    <section id="testimonials" ref={ref} className="py-14 lg:py-20 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`text-center mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <p className="text-sm text-[#737373] uppercase tracking-wider font-body">Testimonials</p>
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[#1A1A1A]">What Our Customers Say</h2>
          <p className="text-sm text-[#737373] mt-3 font-body">Real reviews, pulled straight from Amazon.</p>
        </div>

        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            key={activeIndex}
            className="flex flex-col items-center text-center px-8 lg:px-20 animate-[fade-in_400ms_ease-out]"
          >
            <blockquote className="mb-8 max-w-3xl">
              <p className="font-display text-lg md:text-xl lg:text-2xl text-[#1A1A1A] leading-relaxed line-clamp-6">
                &ldquo;{picks[activeIndex].review.text}&rdquo;
              </p>
            </blockquote>
            <footer>
              <p className="text-[#1A1A1A] font-medium mb-1">{picks[activeIndex].review.author}</p>
              <a
                href={picks[activeIndex].product.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body underline underline-offset-4"
              >
                Verified Buyer — on {picks[activeIndex].product.name}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </footer>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              type="button"
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {picks.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-[#1A1A1A] w-6" : "bg-[#E5E5E5] hover:bg-[#737373] w-2"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
