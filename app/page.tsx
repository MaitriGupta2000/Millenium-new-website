import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { NewArrivalsSection } from "@/components/NewArrivalsSection";
import { FeaturedProductsSection } from "@/components/FeaturedProductsSection";
import { ProductSpotlightSection } from "@/components/ProductSpotlightSection";
import { ProductFeaturesSection } from "@/components/ProductFeaturesSection";
import { LifestyleGallerySection } from "@/components/LifestyleGallerySection";
import { Testimonials } from "@/components/Testimonials";
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
      <LifestyleGallerySection />
      <Testimonials />
      <Footer />
    </main>
  );
}
