"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

type NavLink = {
  label: string;
  href?: string;
  dropdown?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    label: "Products",
    href: "/#shop",
    dropdown: CATEGORIES.map((c) => ({ name: c.title, href: `/category/${c.slug}` })),
  },
  { href: "/#about", label: "About us" },
  { href: "/#contact", label: "Contact us" },
  {
    label: "Support",
    dropdown: [
      { name: "Setups", href: "/#lifestyle" },
      { name: "Testimonials & Reviews", href: "/#testimonials" },
      { name: "FAQ", href: "/#faq" },
      { name: "Warranty Registration", href: "/warranty" },
      { name: "Blog", href: "/blog" },
    ],
  },
];

export function Nav() {
  const [scrollOpacity, setScrollOpacity] = useState(0.8);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 200, 1);
      setScrollOpacity(0.8 + progress * 0.2);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bgOpacity = mobileMenuOpen ? 1 : scrollOpacity;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav
        className={`max-w-5xl mx-auto mt-6 px-4 pointer-events-auto backdrop-blur-xl shadow-lg shadow-black/5 transition-[border-radius] duration-300 ${
          mobileMenuOpen ? "rounded-3xl" : "rounded-full"
        }`}
        style={{ backgroundColor: `rgba(255, 255, 255, ${bgOpacity})` }}
      >
        <div className="flex items-center justify-between h-14 px-2">
          <Link href="/" className="block shrink-0">
            <Image src="/logo.png" alt="Millennium Technology" width={196} height={40} priority className="h-9 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group">
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 text-sm text-[#1A1A1A] hover:text-[#737373] transition-colors duration-300"
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center gap-1 text-sm text-[#1A1A1A] hover:text-[#737373] transition-colors duration-300"
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                    <div className="bg-white rounded-2xl shadow-lg shadow-black/10 border border-[#E5E5E5]/70 py-2 min-w-[200px]">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors whitespace-nowrap"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  className="text-sm text-[#1A1A1A] hover:text-[#737373] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-full hover:bg-[#F5F5F5] text-[#1A1A1A] transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <div
          className={`md:hidden grid transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="py-6 border-t border-[#E5E5E5]/50 bg-white flex flex-col gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(openMobileGroup === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between font-display text-2xl text-[#1A1A1A] px-2 py-3"
                    >
                      {link.label}
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${openMobileGroup === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        openMobileGroup === link.label ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden flex flex-col gap-1 pl-4">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-[#737373] hover:text-[#1A1A1A] transition-colors px-2 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href!}
                    className="font-display text-2xl text-[#1A1A1A] hover:text-[#737373] transition-colors px-2 py-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
