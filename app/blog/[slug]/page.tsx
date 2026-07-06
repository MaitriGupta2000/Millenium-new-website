import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BLOG_POSTS, getBlogPostBySlug, resolvePostLinks } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) return {};
  return {
    title: `${post.title} - Millennium Technology`,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="max-w-[840px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 pb-20">
        <nav className="flex items-center gap-1.5 text-xs text-[#737373] mb-8 flex-wrap font-body">
          <Link href="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-[#1A1A1A] transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1A1A1A] font-medium truncate max-w-[220px]">{post.title}</span>
        </nav>

        <span className="text-xs uppercase tracking-wider text-amber-600 font-body">{post.category}</span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mt-2 text-balance">
          {post.title}
        </h1>
        <p className="text-sm sm:text-base text-[#737373] mt-4 font-body">{post.metaDescription}</p>

        <article className="prose-blog mt-10 font-body text-[#1A1A1A]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{resolvePostLinks(post.body)}</ReactMarkdown>
        </article>

        <div className="mt-16 pt-8 border-t border-[#E5E5E5]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
