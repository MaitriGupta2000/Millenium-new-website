import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Blog - Millennium Technology",
  description: "Guides, product updates, and workspace tips from Millennium Technology.",
};

const posts = [
  {
    title: "How to Build a Portable Multi-Monitor Setup for Travel",
    category: "Guides",
    excerpt: "What to look for in a portable display, how to power it on the go, and how to pack it without damage.",
  },
  {
    title: "Laptop Screen Extenders vs. Traditional Monitors: What's Right for You",
    category: "Buying Guides",
    excerpt: "A breakdown of when a portable extender beats a desk monitor, and when it doesn't.",
  },
  {
    title: "Inside Our 12-Month Warranty: What It Covers and Why",
    category: "Company",
    excerpt: "A closer look at how our warranty process works and what we do to keep claims fast.",
  },
  {
    title: "Setting Up Dual Displays for Trading and Data Work",
    category: "Use Cases",
    excerpt: "Layout tips for keeping charts, spreadsheets, and dashboards visible without desk clutter.",
  },
  {
    title: "New Arrivals: What We Shipped This Quarter",
    category: "Product Updates",
    excerpt: "A roundup of the latest additions to our lineup of extenders, networking cards, and accessories.",
  },
  {
    title: "Networking Cards 101: Choosing the Right Add-on for Your PC",
    category: "Guides",
    excerpt: "Compatibility, speed, and installation basics before you buy your next networking card.",
  },
];

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
          Guides, product updates, and workspace tips from Millennium Technology. New articles are on the way.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {posts.map((post) => (
            <div
              key={post.title}
              className="rounded-3xl border border-[#E5E5E5] p-6 flex flex-col h-full opacity-70 cursor-not-allowed"
            >
              <div className="aspect-[16/10] rounded-2xl bg-[#F5F5F5] mb-5" />
              <span className="text-xs uppercase tracking-wider text-amber-600 font-body mb-2">{post.category}</span>
              <h2 className="font-display text-xl text-[#1A1A1A] leading-snug mb-2">{post.title}</h2>
              <p className="text-sm text-[#737373] font-body mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#1A1A1A] font-medium mt-auto">
                Coming soon
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
