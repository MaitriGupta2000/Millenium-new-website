import type { CategoryMeta, CategorySlug, Product, Review } from "./types";
import productsData from "@/data/products.json";

export const PRODUCTS: Product[] = productsData as Product[];

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "monitor-extenders",
    title: "Monitor Extenders",
    description: "Dual, triple, and quad laptop screen extenders for a portable multi-monitor workspace.",
    icon: "monitor",
  },
  {
    slug: "networking-cards",
    title: "Networking Cards",
    description: "Gigabit, 10Gb, and 40Gb PCIe network adapters for desktops and servers.",
    icon: "network",
  },
  {
    slug: "addon-cards",
    title: "Add-on Cards",
    description: "PCIe expansion cards for USB, SATA, Serial, Parallel, FireWire, and audio.",
    icon: "circuit",
  },
  {
    slug: "gaming-accessories",
    title: "Gaming Accessories",
    description: "Cooling docks, controller fans, and console accessories for longer play sessions.",
    icon: "gamepad",
  },
  {
    slug: "compute-accessories",
    title: "Compute Accessories",
    description: "Capture cards and display-expansion accessories for creators and professionals.",
    icon: "fan",
  },
];

export function getCategoryMeta(slug: CategorySlug): CategoryMeta {
  const meta = CATEGORIES.find((c) => c.slug === slug);
  if (!meta) throw new Error(`Unknown category: ${slug}`);
  return meta;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, count);
}

export function formatPriceINR(price: number | null): string {
  if (price === null) return "";
  return `₹${price.toLocaleString("en-IN")}`;
}

/** Real Amazon review snippets across the catalogue, one per product, best-rated/longest first. */
export function getTopReviews(count = 6): { product: Product; review: Review }[] {
  const picks = PRODUCTS.filter((p) => p.reviews.length > 0).map((product) => {
    const review = [...product.reviews].sort((a, b) => b.rating - a.rating || b.text.length - a.text.length)[0];
    return { product, review };
  });
  return picks
    .filter(({ review }) => review.text.length >= 25)
    .sort((a, b) => b.review.rating - a.review.rating || b.review.text.length - a.review.text.length)
    .slice(0, count);
}
