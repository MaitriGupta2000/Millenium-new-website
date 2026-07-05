"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug } from "@/lib/products";

const STATS = [
  { value: "25+", label: "Years of Trust" },
  { value: "Est. 1999", label: "Founded in Surat" },
  { value: "Pan-India", label: "Reach" },
  { value: "Pro-grade", label: "Hardware" },
];

const FEATURES = [
  {
    title: "Engineered for Real Workspaces",
    description:
      "Every monitor extender and accessory is built for how people actually work - long sessions, cramped desks, and setups that need to travel.",
    slug: "duoview-16-widestand",
  },
  {
    title: "Built on Quality",
    description:
      "Every card and extender is tested for durability and performance before it ships, so what reaches your desk holds up to daily, real-world use.",
    slug: "pcie-quad-port-server-network-adapter-i350-t4",
  },
];

export function ProductFeaturesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/60 to-white border-t border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Our Story</span>
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
          </div>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-5 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A Legacy Built on Trust
          </h2>
          <p
            className={`text-[#737373] text-base md:text-lg max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Millennium Online India Limited has been the trusted choice of professionals, traders, coders, and
            institutions across India since 1999. From our roots in Surat, we&apos;ve spent over two decades
            engineering reliability into every product we ship - from server-grade networking cards and PCIe add-on
            cards to portable multi-screen setups that let you work the way you think.
          </p>

          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl sm:max-w-none mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center text-center px-4 py-4 rounded-2xl border border-[#E5E5E5] bg-white/60"
              >
                <p className="font-display text-2xl md:text-3xl text-[#1A1A1A]">{stat.value}</p>
                <p className="text-xs text-[#737373] uppercase tracking-wider font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((feature, index) => {
            const product = getProductBySlug(feature.slug);
            const fromRight = index % 2 === 1;

            const imageBlock = (
              <div className="aspect-[16/10] relative overflow-hidden bg-[#F5F5F5] rounded-2xl mb-4">
                {product?.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                )}
              </div>
            );

            const textBlock = (
              <div>
                <h3 className="font-display text-lg md:text-xl mb-2">{feature.title}</h3>
                <p className="text-[#737373] text-sm leading-relaxed">{feature.description}</p>
              </div>
            );

            return (
              <div
                key={feature.title}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${fromRight ? "translate-x-6" : "-translate-x-6"}`
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {textBlock}
                {imageBlock}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
