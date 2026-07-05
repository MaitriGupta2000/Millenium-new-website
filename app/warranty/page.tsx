import Link from "next/link";
import { ArrowLeft, ArrowRight, ThumbsUp } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WarrantyRegistrationForm } from "@/components/WarrantyRegistrationForm";

export const metadata = {
  title: "Warranty - Millennium Technology",
  description:
    "Millennium Technology's 12-month warranty policy, claim process, and product warranty registration.",
};

const covered = [
  {
    title: "Manufacturing Defects",
    description:
      "Covers factory-related defects affecting hardware performance, display functionality, or internal components under normal usage conditions.",
  },
  {
    title: "Connectivity Port Issues (Type-C / HDMI)",
    description:
      "Includes coverage for faulty USB-C or HDMI ports affecting display output, power delivery, or signal transmission.",
  },
  {
    title: "Screen & Panel Defects (Dead Pixels / Backlight Issues)",
    description:
      "Protection against display panel faults, including dead pixels, abnormal color patches, flickering, or backlight failures.",
  },
  {
    title: "Structural & Hinge Mechanism Issues",
    description: "Covers hinge instability, frame misalignment, or build defects that impact screen positioning or folding.",
  },
];

const notCovered = [
  {
    title: "Accidental or Physical Damage",
    description: "Damage caused by drops, impact, pressure, or improper handling is not covered under the standard 12-month warranty.",
  },
  {
    title: "Liquid or Moisture Damage",
    description: "Exposure to water, beverages, or other liquids that results in internal or external damage voids warranty eligibility.",
  },
  {
    title: "Unauthorized Repairs or Modifications",
    description: "Any repair, disassembly, or modification performed by non-authorized service providers will void the warranty.",
  },
  {
    title: "Use of Unsupported Cables or Power Adapters",
    description: "Damage caused by incompatible, third-party, or non-recommended power sources or cables is not covered.",
  },
];

const claimSteps = [
  {
    step: "01",
    title: "Submit Your Warranty Claim",
    description: "Complete the online claim form on our Support page with your order details, product serial number, and issue description.",
  },
  {
    step: "02",
    title: "Provide Required Proof (If Applicable)",
    description: "For DOA (Dead on Arrival) cases, an unboxing video is mandatory to verify product condition at delivery.",
  },
  {
    step: "03",
    title: "Claim Review (24-48 Hours)",
    description: "Our technical team reviews your submission within 24-48 business hours and confirms eligibility with next-step instructions.",
  },
  {
    step: "04",
    title: "Repair or Replacement Issued",
    description: "If approved, we arrange repair or replacement as per warranty terms to minimize downtime.",
  },
];

export default function WarrantyPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative bg-[#F0E9DE] pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/complete-hero-bg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.3) 100%)",
            }}
          />
          <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors mb-8 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl leading-[1.1]">
              12-Month Warranty Policy &amp; Priority Customer Support
            </h1>
            <p className="mt-6 text-base text-white/80 max-w-xl font-body">
              Our warranty policy includes 12-month coverage, fast replacements, and dedicated customer support for
              your Millennium Technology device.
            </p>
            <a
              href="#warranty-registration"
              className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] font-medium px-6 py-4 rounded-full text-sm mt-8 hover:bg-[#F5F5F5] transition-colors"
            >
              Activate Your Warranty Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-[#F5F5F5] max-w-md">
              <img src="/warranty/covered.jpg" alt="Warranty coverage" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] leading-tight">
                What&apos;s Covered Under Your Millennium Technology 12-Month Warranty
              </h2>
              <p className="text-[#737373] mt-4 mb-10 font-body">
                This warranty policy outlines the manufacturing defects and hardware issues covered under the
                12-month warranty period.
              </p>
              <div className="flex flex-col gap-8">
                {covered.map((item) => (
                  <div key={item.title}>
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="w-4 h-4 text-[#1A1A1A]" />
                      <h3 className="font-medium text-[#1A1A1A] font-body">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#737373] font-body">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1A1A1A] py-16 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-white leading-tight">What Is Not Covered Under Warranty</h2>
                <div className="flex flex-col gap-6 mt-10">
                  {notCovered.map((item) => (
                    <div key={item.title}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <ArrowRight className="w-4 h-4 text-amber-500 shrink-0" />
                        <h3 className="font-medium text-white font-body">{item.title}</h3>
                      </div>
                      <p className="text-sm text-white/60 font-body">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-white/5">
                <img src="/warranty/not-covered.jpg" alt="Damage not covered under warranty" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A]">How the Warranty Claim Process Works</h2>
            <p className="text-[#737373] mt-4 max-w-xl mx-auto font-body">
              Our warranty policy includes a simple claim process to request repair or replacement if a product
              issue occurs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-0 divide-y divide-x divide-[#E5E5E5]">
            {claimSteps.map((item) => (
              <div
                key={item.step}
                className="p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-display text-lg mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-medium text-[#1A1A1A] mb-2 font-body">{item.title}</h3>
                <p className="text-sm text-[#737373] max-w-sm mx-auto font-body">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="warranty-registration" className="max-w-[1000px] mx-auto px-6 lg:px-12 pb-16 sm:pb-24 scroll-mt-24">
          <h2 className="font-display text-3xl sm:text-4xl text-[#1A1A1A] text-center mb-10">
            Register Your Millennium Technology Warranty
          </h2>
          <WarrantyRegistrationForm />
        </section>
      </main>
      <Footer />
    </>
  );
}
