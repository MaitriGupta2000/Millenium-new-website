"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug, formatPriceINR } from "@/lib/products";

const NEW_ARRIVAL_SLUGS = [
  "quadview-15-6-ultraview-pro",
  "10gb-dual-sfp-network-adapter-x520-da2",
  "ps5-rgb-dual-cooling-dock-charging-station",
];

export function NewArrivalsSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const products = NEW_ARRIVAL_SLUGS.map((slug) => getProductBySlug(slug)).filter(Boolean);

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white border-t border-[#E5E5E5]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Link
              key={product!.slug}
              href={`/products/${product!.slug}`}
              className={`group transition-all duration-700 text-center ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-[#F5F5F5] mb-4">
                {product!.images[0] && (
                  <Image
                    src={product!.images[0]}
                    alt={product!.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <h3 className="font-display text-lg text-[#1A1A1A] mb-1">{product!.name}</h3>
              <p className="text-[#737373] text-sm font-body">{formatPriceINR(product!.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
