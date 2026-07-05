import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CategoryProductGrid } from "@/components/CategoryProductGrid";
import { CATEGORIES, getCategoryMeta, getProductsByCategory } from "@/lib/products";
import type { CategorySlug } from "@/lib/types";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const meta = CATEGORIES.find((c) => c.slug === resolvedParams.slug);
  if (!meta) return {};
  return { title: `${meta.title} - Millennium Technology`, description: meta.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const isValid = CATEGORIES.some((c) => c.slug === resolvedParams.slug);
  if (!isValid) notFound();

  const category = resolvedParams.slug as CategorySlug;
  const meta = getCategoryMeta(category);
  const products = getProductsByCategory(category);

  return (
    <>
      <Nav />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 pb-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors mb-6 font-body">
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">{meta.title}</h1>
        <p className="text-sm sm:text-base text-[#737373] mt-3 max-w-xl font-body">{meta.description}</p>

        <div className="mt-10">
          <CategoryProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  );
}
