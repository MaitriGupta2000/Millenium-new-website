"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug } from "@/lib/products";

const ABOUT_IMAGE_SLUG = "triview-14-ultrasleek";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const product = getProductBySlug(ABOUT_IMAGE_SLUG);

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 bg-white border-t border-[#E5E5E5] lg:pb-6">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
              <p className="text-sm text-[#737373] uppercase tracking-wider font-body">About Millennium</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-6">
              Designed Around You
            </h2>
            <p className="text-[#737373] leading-relaxed mb-6 font-body">
              Millennium Technologies builds monitor extenders, networking cards, add-on cards, gaming accessories,
              and compute accessories for people who need more from their setup — more screen, more ports, more
              headroom.
            </p>
            <p className="text-[#737373] leading-relaxed font-body">
              Every product on this site links straight to its real Amazon listing, with genuine specs, photos, and
              customer reviews — no filler, no fabricated claims.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="aspect-[4/3] relative overflow-hidden rounded-3xl bg-[#F5F5F5]">
              {product?.images[0] && (
                <Image src={product.images[0]} alt={product.name} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
