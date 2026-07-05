"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function CategoryProductGrid({ products }: { products: Product[] }) {
  const groups = useMemo(() => {
    const seen: string[] = [];
    for (const p of products) {
      if (p.filterGroup && !seen.includes(p.filterGroup)) seen.push(p.filterGroup);
    }
    return seen;
  }, [products]);

  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.filterGroup === active);

  return (
    <div>
      {groups.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-8">
          {["All", ...groups].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setActive(g)}
              className={`shrink-0 rounded-full text-sm font-medium px-4 py-2 transition-colors font-body ${
                active === g
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white border border-[#E5E5E5] text-[#737373] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10 lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
