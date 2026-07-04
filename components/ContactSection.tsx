"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="contact" ref={ref} className="py-14 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] mb-2">Get in Touch</h2>
            <p className="text-[#737373] font-body">Questions about a product or an order? We&apos;re here to help.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:sales@millenniumtechnology.in"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors text-sm font-body"
            >
              <Mail className="w-4 h-4" />
              sales@millenniumtechnology.in
            </a>
            <a
              href="tel:+919662545915"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors text-sm font-body"
            >
              <Phone className="w-4 h-4" />
              +91 96625 45915
            </a>
            <a
              href="https://wa.me/+919662545915"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors text-sm font-body"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
