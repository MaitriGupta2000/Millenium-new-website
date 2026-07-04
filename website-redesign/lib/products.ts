// Inline products data directly
const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: "DermaVerde Cream",
    slug: "dermaverde-cream",
    category: "Moisturizers",
    price: 79,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "A lightweight moisturizing cream that keeps your skin soft and hydrated all day.",
    description: "DermaVerde Cream is a luxurious moisturizer formulated with natural botanical extracts and advanced skincare technology. It provides intense hydration while maintaining a lightweight, non-greasy texture perfect for daily use. The cream absorbs quickly and leaves your skin feeling soft, supple, and refreshed.",
    specs: {
      volume: "50ml",
      texture: "Lightweight Cream",
      bestFor: "All skin types",
      timeToAbsorb: "5-10 minutes"
    },
    ingredients: ["Hyaluronic Acid", "Vitamin E", "Green Tea Extract", "Aloe Vera", "Jojoba Oil", "Squalane"],
    benefits: ["Deep Hydration", "Reduces Fine Lines", "Improves Skin Elasticity", "Soothes Irritation", "Natural Protection"],
    howToUse: "Apply a small amount to clean, dry skin. Massage gently in upward motions until fully absorbed. Use morning and night for best results.",
    rating: 4.8,
    reviews: 342,
    inStock: true
  },
  {
    id: 2,
    name: "PureGlow Serum",
    slug: "pureglow-serum",
    category: "Serums",
    price: 129,
    image: "/images/product-serum-set.jpg",
    shortDescription: "Premium serum with advanced brightening formula for radiant complexion.",
    description: "PureGlow Serum is a concentrated formula packed with active brightening ingredients that work synergistically to enhance skin radiance and promote a more luminous complexion. This lightweight serum absorbs instantly and can be layered under moisturizers for maximum efficacy.",
    specs: {
      volume: "30ml",
      texture: "Lightweight Serum",
      bestFor: "Dull and tired skin",
      timeToAbsorb: "2-3 minutes"
    },
    ingredients: ["Vitamin C", "Niacinamide", "Ferulic Acid", "Alpha Arbutin", "Peptides", "Rose Hip Oil"],
    benefits: ["Brightens Complexion", "Evens Skin Tone", "Reduces Dark Spots", "Enhances Radiance", "Antioxidant Protection"],
    howToUse: "Apply 2-3 drops to clean skin before moisturizer. Gently pat into face and neck. Use twice daily for optimal results.",
    rating: 4.9,
    reviews: 567,
    inStock: true
  },
  {
    id: 3,
    name: "Beauty Essentials Set",
    slug: "beauty-essentials-set",
    category: "Best Sellers",
    price: 199,
    image: "/images/product-gift-set.jpg",
    shortDescription: "Complete beauty collection with essential skincare products for every need.",
    description: "Our Beauty Essentials Set includes everything you need for a complete skincare routine. This curated collection features four best-selling products that work together to cleanse, tone, treat, and moisturize your skin for a healthy, radiant glow.",
    specs: {
      items: 4,
      texture: "Mixed (Cleanser, Toner, Serum, Moisturizer)",
      bestFor: "All skin types",
      packageType: "Gift Set"
    },
    ingredients: ["Hyaluronic Acid", "Vitamin C", "Green Tea Extract", "Aloe Vera", "Glycerin", "Niacinamide"],
    benefits: ["Complete Skincare Routine", "Value for Money", "Travel-Friendly Sizes", "Professional Results", "Perfect Gift"],
    howToUse: "Use each product as directed. Start with cleanser, follow with toner, apply serum, and finish with moisturizer morning and night.",
    rating: 4.7,
    reviews: 423,
    inStock: true
  },
  {
    id: 4,
    name: "Vitamin C Brightening Serum",
    slug: "vitamin-c-brightening-serum",
    category: "Serums",
    price: 95,
    image: "/images/product-serum-set.jpg",
    shortDescription: "Powerful brightening serum with stabilized Vitamin C for enhanced radiance.",
    description: "Formulated with 15% stabilized Vitamin C, this potent serum targets dullness, dark spots, and uneven skin tone. The advanced stabilization technology ensures maximum potency and shelf stability, delivering visible brightening results within weeks.",
    specs: {
      volume: "30ml",
      vitaminCContent: "15%",
      texture: "Lightweight Serum",
      bestFor: "Dull, uneven skin"
    },
    ingredients: ["Stabilized Vitamin C", "Vitamin E", "Ferulic Acid", "Hyaluronic Acid", "Chamomile Extract"],
    benefits: ["Intense Brightening", "Protects from Damage", "Reduces Dark Spots", "Promotes Collagen", "Antioxidant Rich"],
    howToUse: "Use 2-3 drops morning and evening on clean skin. Wait 1 minute before applying other products. Store in cool place away from sunlight.",
    rating: 4.8,
    reviews: 298,
    inStock: true
  },
  {
    id: 5,
    name: "Hyaluronic Hydrator",
    slug: "hyaluronic-hydrator",
    category: "Moisturizers",
    price: 85,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Multi-layered hydration serum with three molecular weights of hyaluronic acid.",
    description: "Our Hyaluronic Hydrator features three molecular weights of hyaluronic acid that work at different skin depths to provide comprehensive hydration. This innovative formula locks in moisture and plumps the skin, reducing the appearance of fine lines and creating a dewy, youthful complexion.",
    specs: {
      volume: "50ml",
      hydrationLayers: "3",
      texture: "Lightweight Gel",
      bestFor: "Dry and dehydrated skin"
    },
    ingredients: ["Triple-Molecular Hyaluronic Acid", "Glycerin", "Panthenol", "Vitamin B5", "Sodium PCA"],
    benefits: ["Deep Hydration", "Plumps Fine Lines", "Boosts Skin Barrier", "Non-sticky Formula", "Lightweight Feel"],
    howToUse: "Apply to damp skin for better absorption. Use morning and night. Can be used under or over other serums.",
    rating: 4.7,
    reviews: 251,
    inStock: true
  },
  {
    id: 6,
    name: "Retinol Night Treatment",
    slug: "retinol-night-treatment",
    category: "Treatments",
    price: 109,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Time-released retinol formula for gentle yet effective anti-aging results.",
    description: "Experience the power of retinol without the irritation. Our Retinol Night Treatment uses a unique encapsulation technology that releases retinol gradually throughout the night, minimizing irritation while maximizing results. Wake up to visibly smoother, firmer, more radiant skin.",
    specs: {
      volume: "30ml",
      retinolType: "Time-Released Encapsulated",
      texture: "Lightweight Cream",
      bestFor: "All skin types (use cautiously if sensitive)"
    },
    ingredients: ["Encapsulated Retinol", "Squalane", "Peptides", "Hyaluronic Acid", "Chamomile Extract"],
    benefits: ["Reduces Fine Lines", "Improves Texture", "Boosts Collagen", "Gentle Formula", "Anti-Aging"],
    howToUse: "Apply a small amount before bed. Start with 2-3 nights per week and gradually increase. Always use SPF during day.",
    rating: 4.6,
    reviews: 189,
    inStock: true
  },
  {
    id: 7,
    name: "Radiant Glow Duo",
    slug: "radiant-glow-duo",
    category: "New Arrivals",
    price: 159,
    image: "/images/product-gift-set.jpg",
    shortDescription: "Dynamic duo designed to maximize skin radiance and luminosity.",
    description: "The Radiant Glow Duo pairs our bestselling brightening serum with a luxurious glow-enhancing moisturizer. Together, they create a synergistic effect that amplifies radiance and leaves your skin luminous and youthful. Perfect for anyone seeking a professional-grade glow at home.",
    specs: {
      items: 2,
      texture: "Serum + Moisturizer",
      bestFor: "Dull, tired complexion",
      packageType: "Set"
    },
    ingredients: ["Vitamin C", "Hyaluronic Acid", "Glycerin", "Niacinamide", "Rose Extract"],
    benefits: ["Boosts Radiance", "Layering-Friendly", "Visible Results", "Complementary Formulas", "Travel-Ready"],
    howToUse: "Apply serum first on clean skin, then follow with moisturizer. Use both morning and night for maximum radiance.",
    rating: 4.8,
    reviews: 312,
    inStock: true
  },
  {
    id: 8,
    name: "Ceramide Repair Set",
    slug: "ceramide-repair-set",
    category: "Best Sellers",
    price: 175,
    image: "/images/product-gift-set.jpg",
    shortDescription: "Barrier-repair collection with ceramides for compromised and sensitive skin.",
    description: "Specially formulated for sensitive and compromised skin, our Ceramide Repair Set focuses on restoring and maintaining the skin barrier. With multiple ceramide types and calming botanicals, this set helps reduce sensitivity and restore skin health.",
    specs: {
      items: 3,
      texture: "Cleanser + Essence + Cream",
      bestFor: "Sensitive and compromised skin",
      packageType: "Set"
    },
    ingredients: ["Ceramides (1, 3, 6-II)", "Cholesterol", "Oat Extract", "Centella Asiatica", "Allantoin"],
    benefits: ["Restores Skin Barrier", "Reduces Sensitivity", "Calming Effect", "Non-Irritating", "Dermatologist Approved"],
    howToUse: "Use all three products as a complete routine. Cleanse, use essence, then apply cream. Twice daily recommended.",
    rating: 4.9,
    reviews: 401,
    inStock: true
  },
  {
    id: 9,
    name: "Daily Defense SPF",
    slug: "daily-defense-spf",
    category: "Treatments",
    price: 65,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Lightweight SPF 50+ sunscreen with antioxidant protection.",
    description: "Our Daily Defense SPF 50+ provides broad-spectrum protection against UVA and UVB rays while infused with powerful antioxidants. This lightweight formula doesn&apos;t leave a white cast and blends seamlessly for everyday wear under makeup or alone.",
    specs: {
      volume: "50ml",
      spf: "SPF 50+",
      texture: "Lightweight Lotion",
      bestFor: "All skin types"
    },
    ingredients: ["Zinc Oxide", "Titanium Dioxide", "Green Tea Extract", "Vitamin E", "Aloe Vera"],
    benefits: ["Broad Spectrum Protection", "No White Cast", "Antioxidant Rich", "Lightweight Feel", "Daily Essential"],
    howToUse: "Apply generously to clean skin 15 minutes before sun exposure. Reapply every 2 hours or after swimming.",
    rating: 4.7,
    reviews: 234,
    inStock: true
  },
  {
    id: 10,
    name: "Niacinamide Essence",
    slug: "niacinamide-essence",
    category: "Serums",
    price: 85,
    image: "/images/product-serum-set.jpg",
    shortDescription: "Balancing essence with 5% niacinamide for pore refinement and control.",
    description: "This lightweight essence harnesses the power of 5% niacinamide to balance sebum production, minimize pores, and strengthen the skin barrier. Perfect as a first step in your skincare routine or as a layering serum for maximum benefits.",
    specs: {
      volume: "150ml",
      niacinamideContent: "5%",
      texture: "Lightweight Essence",
      bestFor: "Oily and combination skin"
    },
    ingredients: ["Niacinamide 5%", "Hyaluronic Acid", "Panthenol", "Glycerin", "Allantoin"],
    benefits: ["Pore Minimizing", "Balances Sebum", "Strengthens Barrier", "Anti-Inflammatory", "Lightweight"],
    howToUse: "Use as the first step after cleansing. Apply with hands or cotton pad and let absorb before applying other products.",
    rating: 4.6,
    reviews: 278,
    inStock: true
  },
  {
    id: 11,
    name: "Rose Water Toner",
    slug: "rose-water-toner",
    category: "Treatments",
    price: 55,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Hydrating toner with rose extract and hyaluronic acid.",
    description: "Our Rose Water Toner is a hydrating and refreshing formula that prepares skin for better absorption of serums and moisturizers. Infused with rose extract and hyaluronic acid, it soothes while providing a boost of hydration and a delicate floral fragrance.",
    specs: {
      volume: "200ml",
      texture: "Liquid Toner",
      bestFor: "All skin types",
      keyIngredient: "Rose Extract"
    },
    ingredients: ["Rose Water Extract", "Hyaluronic Acid", "Glycerin", "Chamomile Extract", "Vitamin E"],
    benefits: ["Hydrating Boost", "Prepares Skin", "Soothing", "Refreshing", "Aromatic"],
    howToUse: "After cleansing, apply with a cotton pad or spray directly onto skin. Use morning and night before serums.",
    rating: 4.5,
    reviews: 156,
    inStock: true
  },
  {
    id: 12,
    name: "Collagen Boost Cream",
    slug: "collagen-boost-cream",
    category: "Moisturizers",
    price: 99,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Rich moisturizer formulated to support natural collagen production.",
    description: "Our Collagen Boost Cream is a luxurious formula designed to nourish skin while supporting its natural collagen synthesis. With peptides and botanical extracts, this cream helps restore firmness and elasticity for a more youthful appearance.",
    specs: {
      volume: "50ml",
      texture: "Rich Cream",
      bestFor: "Mature and sagging skin",
      timeToAbsorb: "10-15 minutes"
    },
    ingredients: ["Collagen Peptides", "Retinol", "Vitamin C", "Ginseng Extract", "Squalane"],
    benefits: ["Boosts Collagen", "Improves Firmness", "Restores Elasticity", "Anti-Aging", "Rich Nourishment"],
    howToUse: "Apply to clean skin morning and night. Use in upward motions and allow to fully absorb before applying makeup.",
    rating: 4.8,
    reviews: 287,
    inStock: true
  },
  {
    id: 13,
    name: "AHA/BHA Exfoliant",
    slug: "aha-bha-exfoliant",
    category: "Treatments",
    price: 75,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Chemical exfoliant with AHA and BHA for smooth, clear complexion.",
    description: "Our dual-acid exfoliant combines the skin-renewing benefits of AHA and BHA. This chemical exfoliator gently removes dead skin cells, unclogs pores, and reveals smoother, brighter skin underneath. Start with 1-2 times per week and increase as tolerated.",
    specs: {
      volume: "100ml",
      acidType: "AHA + BHA Blend",
      texture: "Liquid Exfoliant",
      bestFor: "Dull, congested skin"
    },
    ingredients: ["Glycolic Acid (AHA)", "Salicylic Acid (BHA)", "Hyaluronic Acid", "Aloe Vera", "Chamomile Extract"],
    benefits: ["Exfoliates Gently", "Unclogs Pores", "Brightens Skin", "Smooth Texture", "Reduces Acne"],
    howToUse: "Apply to clean, dry skin 2-3 times per week. Start with once weekly. Follow with hydrating toner and moisturizer.",
    rating: 4.6,
    reviews: 213,
    inStock: true
  },
  {
    id: 14,
    name: "Peptide Power Set",
    slug: "peptide-power-set",
    category: "New Arrivals",
    price: 219,
    image: "/images/product-gift-set.jpg",
    shortDescription: "Anti-aging collection powered by peptides for visible firmness.",
    description: "Our Peptide Power Set features three carefully selected products, each enriched with peptides to target signs of aging. This collection works synergistically to improve skin firmness, elasticity, and overall texture for a more youthful appearance.",
    specs: {
      items: 3,
      texture: "Cleanser + Serum + Moisturizer",
      bestFor: "Mature and aging skin",
      packageType: "Set"
    },
    ingredients: ["Peptides", "Hyaluronic Acid", "Vitamin C", "Retinol", "Green Tea Extract"],
    benefits: ["Firms Skin", "Reduces Wrinkles", "Boosts Elasticity", "Professional Results", "Complete System"],
    howToUse: "Use all three products in sequence. Cleanse, apply serum, then moisturize. Morning and night routine recommended.",
    rating: 4.9,
    reviews: 356,
    inStock: true
  },
  {
    id: 15,
    name: "Squalane Facial Oil",
    slug: "squalane-facial-oil",
    category: "Serums",
    price: 88,
    image: "/images/product-serum-set.jpg",
    shortDescription: "Lightweight plant-derived squalane oil for deep nourishment.",
    description: "Our Squalane Facial Oil is a pure, plant-derived oil that mimics skin&apos;s natural sebum. This lightweight oil absorbs instantly and provides deep nourishment without clogging pores. Perfect for layering or using as a final step in your skincare routine.",
    specs: {
      volume: "30ml",
      source: "Plant-Derived",
      texture: "Lightweight Oil",
      bestFor: "All skin types"
    },
    ingredients: ["Squalane 100%", "No additives"],
    benefits: ["Deep Nourishment", "Lightweight Feel", "Non-Comedogenic", "Barrier Support", "Anti-Inflammatory"],
    howToUse: "Use 2-3 drops as the final step. Can be mixed with moisturizer or applied directly to damp skin.",
    rating: 4.7,
    reviews: 292,
    inStock: true
  },
  {
    id: 16,
    name: "Eye Renewal Cream",
    slug: "eye-renewal-cream",
    category: "Treatments",
    price: 89,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Specialized eye cream for dark circles, puffiness, and fine lines.",
    description: "Our Eye Renewal Cream is specially formulated for the delicate eye area. Packed with caffeine, peptides, and hydrating ingredients, it targets dark circles, reduces puffiness, and minimizes fine lines for a more youthful, refreshed appearance.",
    specs: {
      volume: "15ml",
      texture: "Rich Eye Cream",
      bestFor: "Dark circles and fine lines",
      area: "Eye contour"
    },
    ingredients: ["Caffeine", "Peptides", "Hyaluronic Acid", "Vitamin K", "Arnica Extract"],
    benefits: ["Reduces Dark Circles", "Minimizes Puffiness", "Softens Fine Lines", "Gentle Formula", "Brightening"],
    howToUse: "Apply a small amount around eye area morning and night using ring finger. Pat gently until absorbed.",
    rating: 4.8,
    reviews: 267,
    inStock: true
  },
  {
    id: 17,
    name: "Barrier Repair Moisturizer",
    slug: "barrier-repair-moisturizer",
    category: "Moisturizers",
    price: 92,
    image: "/images/product-detail-skincare.jpg",
    shortDescription: "Barrier-strengthening moisturizer with ceramides and plant oils.",
    description: "This powerful moisturizer is engineered to restore and strengthen your skin barrier. With ceramides, plant oils, and protective botanicals, it locks in hydration and shields skin from environmental stressors while promoting healthy, resilient skin.",
    specs: {
      volume: "60ml",
      texture: "Nourishing Cream",
      bestFor: "Damaged and irritated skin",
      timeToAbsorb: "5 minutes"
    },
    ingredients: ["Ceramides", "Jojoba Oil", "Squalane", "Aloe Vera", "Centella Asiatica"],
    benefits: ["Repairs Barrier", "Locks Hydration", "Soothes Irritation", "Protective Shield", "Resilient Skin"],
    howToUse: "Apply morning and night to clean skin. Use more generously on irritated areas. Can be layered under facial oil.",
    rating: 4.9,
    reviews: 334,
    inStock: true
  },
  {
    id: 18,
    name: "Complete Routine Bundle",
    slug: "complete-routine-bundle",
    category: "Best Sellers",
    price: 299,
    image: "/images/product-gift-set.jpg",
    shortDescription: "Ultimate 6-step skincare system for complete skin transformation.",
    description: "Our Complete Routine Bundle includes everything needed for a professional-grade skincare routine. This comprehensive system covers cleansing, toning, treating, and moisturizing for visible results in just weeks. Perfect for starting your skincare journey or upgrading your existing routine.",
    specs: {
      items: 6,
      texture: "Complete System",
      bestFor: "All skin types",
      packageType: "Bundle"
    },
    ingredients: ["Multiple botanical extracts", "Hyaluronic Acid", "Vitamin C", "Peptides", "Natural oils"],
    benefits: ["Complete System", "Professional Results", "Best Value", "Comprehensive Care", "All Skin Concerns"],
    howToUse: "Follow the 6-step routine morning and night. Each product is numbered for easy reference. See individual product instructions.",
    rating: 4.9,
    reviews: 589,
    inStock: true
  }
];

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  shortDescription: string;
  description: string;
  specs: Record<string, string | number>;
  ingredients: string[];
  benefits: string[];
  howToUse: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export function getAllProducts(): Product[] {
  return PRODUCTS_DATA;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS_DATA.find(product => product.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS_DATA.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS_DATA.filter(product => product.category === category);
}

export function getRelatedProducts(slug: string, limit: number = 3): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  
  return PRODUCTS_DATA
    .filter(p => p.slug !== slug && p.category === product.category)
    .slice(0, limit);
}
