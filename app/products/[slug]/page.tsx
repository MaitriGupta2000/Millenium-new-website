import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Star } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { SpecsTable } from "@/components/SpecsTable";
import { ProductCard } from "@/components/ProductCard";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PRODUCTS, formatPriceINR, getCategoryMeta, getProductBySlug, getRelatedProducts } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Millennium Technologies`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) notFound();

  const meta = getCategoryMeta(product.category);
  const related = getRelatedProducts(product);

  return (
    <>
      <Nav />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 pb-20">
        <nav className="flex items-center gap-1.5 text-xs text-[#737373] mb-8 flex-wrap font-body">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/category/${product.category}`} className="hover:text-[#1A1A1A] transition-colors">{meta.title}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A] font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery product={product} />

          <div>
            {product.tag && (
              <span className="text-xs font-semibold tracking-wide text-amber-600">{product.tag}</span>
            )}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-1 text-balance">{product.name}</h1>
            <p className="text-sm text-[#737373] mt-2 font-body">{product.typeLabel}</p>
            {product.rating && product.rating.count > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-sm font-semibold text-[#1A1A1A]">{product.rating.value}</span>
                <span className="text-sm text-[#737373] font-body">({product.rating.count} ratings)</span>
              </div>
            )}
            <p className="text-base text-[#1A1A1A]/80 mt-4 font-body">{product.tagline}</p>

            <div className="mt-6">
              {product.stock === "out_of_stock" ? (
                <span className="inline-block text-sm font-semibold text-white bg-[#737373] rounded-full px-3 py-1.5">
                  Out of Stock
                </span>
              ) : (
                <span className="text-3xl font-semibold text-[#1A1A1A]">{formatPriceINR(product.price)}</span>
              )}
            </div>

            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full text-base font-medium px-8 py-4 transition-colors ${
                product.stock === "out_of_stock"
                  ? "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#1A1A1A]"
                  : "bg-[#1A1A1A] text-white hover:bg-[#333]"
              }`}
            >
              Buy on Amazon
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <div className="mt-8 space-y-3">
              {product.description.map((paragraph, i) => (
                <p key={i} className="text-sm text-[#737373] leading-relaxed font-body">{paragraph}</p>
              ))}
            </div>

            {product.useCases && product.useCases.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-medium text-[#1A1A1A] mb-3 font-body">Great for</p>
                <div className="flex flex-wrap gap-2">
                  {product.useCases.map((useCase) => (
                    <span key={useCase} className="text-xs font-medium text-[#1A1A1A] bg-white border border-[#E5E5E5] rounded-full px-3 py-1.5 font-body">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-3xl text-[#1A1A1A] mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {product.features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] font-body">{feature.title}</p>
                  {feature.description && (
                    <p className="text-xs text-[#737373] mt-0.5 font-body">{feature.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {product.specs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-6">Specifications</h2>
            <SpecsTable groups={product.specs} />
          </section>
        )}

        <ReviewsSection product={product} />

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-6">More from {meta.title}</h2>
            <div className="grid gap-x-6 gap-y-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
