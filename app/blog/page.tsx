import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata = {
  title: "Blog - Millennium Technology",
  description: "Guides, product updates, and workspace tips from Millennium Technology.",
};

const posts = BLOG_POSTS.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  excerpt: p.metaDescription,
}));

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 pb-16 sm:pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors mb-6 font-body"
        >
          <ArrowLeft className="w-4 h-4" />
          Home
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A]">Blog</h1>
        <p className="text-sm sm:text-base text-[#737373] mt-3 max-w-xl font-body">
          Guides, product updates, and workspace tips from Millennium Technology.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-3xl border border-[#E5E5E5] p-6 flex flex-col h-full hover:border-[#1A1A1A] transition-colors"
            >
              <div className="aspect-[16/10] rounded-2xl bg-[#F5F5F5] mb-5" />
              <span className="text-xs uppercase tracking-wider text-amber-600 font-body mb-2">{post.category}</span>
              <h2 className="font-display text-xl text-[#1A1A1A] leading-snug mb-2">{post.title}</h2>
              <p className="text-sm text-[#737373] font-body mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#1A1A1A] font-medium mt-auto">
                Read article
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
