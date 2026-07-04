export type CategorySlug =
  | "monitor-extenders"
  | "networking-cards"
  | "addon-cards"
  | "gaming-accessories"
  | "compute-accessories";

export interface CategoryMeta {
  slug: CategorySlug;
  title: string;
  description: string;
  icon: "monitor" | "network" | "circuit" | "gamepad" | "fan";
}

export interface SpecGroup {
  title: string;
  items: string[];
}

export interface FeatureItem {
  title: string;
  description?: string;
}

export type StockStatus = "in_stock" | "out_of_stock";

export interface Rating {
  value: number;
  count: number;
}

export interface Review {
  author: string;
  rating: number;
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  tag?: string;
  typeLabel: string;
  tagline: string;
  description: string[];
  price: number | null;
  stock: StockStatus;
  cardFeatures: string[];
  features: FeatureItem[];
  specs: SpecGroup[];
  useCases?: string[];
  amazonUrl: string;
  images: string[];
  rating: Rating | null;
  reviews: Review[];
  /** Short tab label for category-page filtering (e.g. "DuoView", "10Gb", "USB"). */
  filterGroup?: string;
}
