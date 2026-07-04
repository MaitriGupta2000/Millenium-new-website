"use client";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductBySlug } from "@/lib/products";

const FEATURES = [
  {
    title: "Engineered for Real Workspaces",
    description:
      "Every monitor extender and accessory is built for how people actually work — long sessions, cramped desks, and setups that need to travel.",
    slug: "duoview-16-widestand",
  },
  {
    title: "Backed by Genuine Reviews",
    description:
      "No fabricated testimonials. Every rating and review shown on this site is pulled directly from the product's real Amazon listing.",
    slug: "pcie-quad-port-server-network-adapter-i350-t4",
  },
  {
    title: "Fast, Reliable Fulfilment",
    description:
      "Every product ships and is fulfilled through Amazon, so you get the delivery speed and buyer protection you already trust.",
    slug: "ai-magnetic-mobile-cooling-fan",
  },
];

export function ProductFeaturesSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-amber-50/60 to-white border-t border-[#E5E5E5]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Our Promise</span>
            <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
          </div>
          <h2
            className={`font-display text-4xl md:text-5xl lg:text-6xl mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Why Choose Millennium Technologies
          </h2>
          <p
            className={`text-[#737373] text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Real hardware, real reviews, real performance.
          </p>
        </div>

        <div className="space-y-32">
          {FEATURES.map((feature, index) => {
            const product = getProductBySlug(feature.slug);
            return (
              <div
                key={feature.title}
                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="font-display text-3xl md:text-4xl mb-6">{feature.title}</h3>
                  <p className="text-[#737373] text-lg leading-relaxed">{feature.description}</p>
                </div>

                <div
                  className={`aspect-[3/2] relative overflow-hidden bg-[#F5F5F5] rounded-3xl ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  {product?.images[0] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[0]}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
