"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MessageCircle, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CATEGORIES } from "@/lib/products";

type FooterLink = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/millenniumtechno?igsh=MWdlcDJ4dnNidGh4Zg==",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-[18px] h-[18px]">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/millenniumtech/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8v3h2.42V21h3.08z" />
      </svg>
    ),
  },
];

const footerLinks: FooterColumn[] = [
  {
    title: "Contact",
    links: [
      { name: "sales@millenniumtechnology.in", href: "mailto:sales@millenniumtechnology.in", icon: Mail },
      { name: "+91 96625 45915", href: "tel:+919662545915", icon: Phone },
      { name: "WhatsApp Us", href: "https://wa.me/+919662545915", icon: MessageCircle },
    ],
  },
  {
    title: "Site Map",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/#about" },
      { name: "Explore Products", href: "/#shop" },
      { name: "Use Cases", href: "/#lifestyle" },
      { name: "Testimonials", href: "/#testimonials" },
      { name: "Contact Us", href: "/#contact" },
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
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div
            className={`lg:col-span-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/" className="block mb-6">
              <Image src="/logo.png" alt="Millennium Technology" width={196} height={40} className="h-10 w-auto" />
            </Link>
            <p className="text-[#737373] leading-relaxed mb-6 font-body">
              Laptop screen extenders, networking cards, add-on cards, gaming accessories, and compute accessories -
              engineered for real workspaces.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#737373] hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerLinks.map((column, columnIndex) => (
                <div
                  key={column.title}
                  className={`transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${100 + columnIndex * 100}ms` }}
                >
                  <h3 className="text-sm text-[#1A1A1A] font-medium mb-4">{column.title}</h3>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        {link.href.startsWith("/") ? (
                          <Link href={link.href} className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body">
                            {link.name}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#1A1A1A] transition-colors font-body"
                          >
                            {link.icon ? <link.icon className="w-4 h-4 shrink-0" /> : null}
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                  {column.title === "Contact" && (
                    <p className="text-sm text-[#737373] font-body leading-relaxed mt-5 max-w-[240px]">
                      Millennium Online India Limited 
                      <br />
                      208-209, Regent Square, Above D-Mart, Near Mahalaxmi Temple, Anand Mahal Road, Adajan, Surat -
                      395009
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#737373] font-body">
            © {new Date().getFullYear()} Millennium Technology. All rights reserved.
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
