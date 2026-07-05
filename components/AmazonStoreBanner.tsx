"use client";

import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const AMAZON_STORE_URL =
  "https://www.amazon.in/stores/MillenniumTECHNOLOGY/page/11D7054A-8895-4897-88D3-212BC40E642E?lp_context_asin=B0GJD7H2LT&store_ref=bl_ast_dp_brandlogo_sto&ref_=cm_sw_r_ud_ast_store_GB8WMMV298S30M9K54AV";

export function AmazonStoreBanner() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-10 lg:py-14 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAFAFA] to-white border border-[#E5E5E5] px-8 py-12 lg:py-14 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-4">
            Supercharge Your Productivity Today
          </h2>
          <p className="text-[#737373] max-w-xl mx-auto mb-8 font-body">
            Upgrade your workspace with our products. Enjoy fast shipping and secure checkout - buy directly from us
            or get it fast with Amazon.
          </p>
          <a
            href={AMAZON_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#1A1A1A] font-medium px-8 py-4 rounded-full transition-colors"
          >
            Buy on Amazon
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
