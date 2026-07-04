"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CATEGORIES } from "@/lib/products";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { name: "Explore Our Shop", href: "#shop" },
      { name: "Why Choose Millennium", href: "#features" },
      { name: "Real Setups", href: "#lifestyle" },
      { name: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Shop",
    links: CATEGORIES.map((c) => ({ name: c.title, href: `/category/${c.slug}` })),
  },
];

export function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <footer ref={ref} className="bg-background border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div
            className={`lg:col-span-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/" className="font-display text-3xl text-[#1A1A1A] block mb-6">
              Millennium.
            </Link>
            <p className="text-[#737373] leading-relaxed mb-6 font-body">
              Monitor extenders, networking cards, add-on cards, gaming accessories, and compute accessories —
              engineered for real workspaces.
            </p>

            <div className="flex items-center gap-4">
              {["Instagram", "Pinterest", "Twitter"].map((social) => (
                <a key={social} href="#" className="text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {footerLinks.map((column, columnIndex) => (
                <div
                  key={column.title}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${100 + columnIndex * 100}ms` }}
                >
                  <h3 className="text-sm text-[#1A1A1A] font-medium mb-4">{column.title}</h3>
                  <ul className="flex flex-wrap items-center gap-6">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373] font-body">
            © {new Date().getFullYear()} Millennium Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <Link key={link} href="#" className="text-xs text-[#737373] hover:text-[#1A1A1A] transition-colors font-body">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
