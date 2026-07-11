"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" ref={ref} className="py-14 lg:py-20 bg-[#FAFAFA] border-t border-[#E5E5E5]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] mb-2">Get in Touch</h2>
            <p className="text-[#737373] font-body mb-6">Questions about a product or an order? We&apos;re here to help.</p>

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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              required
              placeholder="Name"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white text-sm font-body focus:outline-none focus:border-[#1A1A1A]"
            />
            <input
              name="mobile"
              type="tel"
              required
              placeholder="Mobile Number"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white text-sm font-body focus:outline-none focus:border-[#1A1A1A]"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email ID"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white text-sm font-body focus:outline-none focus:border-[#1A1A1A]"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Message"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] bg-white text-sm font-body focus:outline-none focus:border-[#1A1A1A] resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors text-sm font-body disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
            {status === "sent" && <p className="text-sm text-green-700 font-body">Message sent. We&apos;ll get back to you soon.</p>}
            {status === "error" && <p className="text-sm text-red-600 font-body">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
