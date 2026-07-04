import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import { ProductSpotlightSection } from "@/components/ProductSpotlightSection";
import { ProductFeaturesSection } from "@/components/ProductFeaturesSection";
import { AmazonStoreBanner } from "@/components/AmazonStoreBanner";
import { LifestyleGallerySection } from "@/components/LifestyleGallerySection";
import { Testimonials } from "@/components/Testimonials";
import { FAQSection } from "@/components/FAQSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <NewArrivalsSection />
      <FeaturedProductsSection />
      <ProductSpotlightSection />
      <ProductFeaturesSection />
      <AmazonStoreBanner />
      <LifestyleGallerySection />
      <Testimonials />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
