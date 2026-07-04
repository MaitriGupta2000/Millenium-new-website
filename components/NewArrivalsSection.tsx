"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug, formatPriceINR } from "@/lib/products";

// Monitor extenders are the best-selling line, so they dominate the rotation.
const EXTENDER_POOL = [
  "quadview-15-6-ultraview-pro",
  "triview-15-6-flexsplit",
  "duoview-16-widestand",
  "triview-18-5-vertimax",
  "quadview-14-flex",
  "duoview-18-5-ultrawide",
];
const OTHER_POOL = ["10gb-dual-sfp-network-adapter-x520-da2", "ps5-rgb-dual-cooling-dock-charging-station"];

function rotate<T>(pool: T[], seed: number, count: number): T[] {
  return Array.from({ length: count }, (_, i) => pool[(seed + i) % pool.length]);
}

export function NewArrivalsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setSeed(new Date().getDate());
  }, []);

  const slugs = [...rotate(EXTENDER_POOL, seed, 3), ...rotate(OTHER_POOL, seed, 1)];
  const products = slugs.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <section ref={ref} className="py-14 lg:py-20 bg-white border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">New Arrivals</h2>
            <p className="text-[#737373] text-sm uppercase tracking-wider mt-2 font-body">Our Selections</p>
          </div>

          <Link
            href="#shop"
            className={`text-sm text-[#737373] hover:text-[#1A1A1A] transition-all duration-700 font-body underline underline-offset-4 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            View All products
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Link
              key={product!.slug}
              href={`/products/${product!.slug}`}
              className={`group transition-all duration-700 text-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="aspect-square relative overflow-hidden rounded-xl bg-[#F5F5F5] mb-3">
                {product!.images[0] && (
                  <Image
                    src={product!.images[0]}
                    alt={product!.name}
                    fill
                    sizes="(min-width: 768px) 22vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-display text-sm text-[#1A1A1A] mb-0.5 line-clamp-1">{product!.name}</h3>
              <p className="text-[#737373] text-xs font-body">{formatPriceINR(product!.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
