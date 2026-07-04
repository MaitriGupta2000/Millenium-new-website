import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getAllProducts } from '@/lib/products';
import { Navigation } from '@/components/navigation';
import { FooterSection } from '@/components/sections/footer-section';
import { Star, ArrowLeft, Leaf, Shield, Droplet } from 'lucide-react';

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} | LUMERA`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  const relatedProducts = getRelatedProducts(params.slug);

  if (!product) {
    return (
      <main className="overflow-x-hidden">
        <Navigation />
        <section className="py-20 text-center">
          <h1 className="font-display text-4xl text-[#1A1A1A] mb-4">Product Not Found</h1>
          <p className="text-[#737373] mb-6">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Navigation />

      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-12 border-b border-[#E5E5E5]">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#737373] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
            {/* Product Image */}
            <div className="flex items-center">
              <div className="w-full aspect-[4/5] relative overflow-hidden rounded-3xl bg-[#F5F5F5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              {/* Category Badge */}
              <div className="inline-flex w-fit mb-4">
                <span className="text-sm font-medium text-amber-600 bg-amber-50 px-4 py-2 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl lg:text-5xl text-[#1A1A1A] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-[#E5E5E5]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#737373]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Short Description */}
              <p className="text-lg text-[#737373] mb-6 leading-relaxed font-body">
                {product.shortDescription}
              </p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-[#E5E5E5]">
                <p className="text-3xl font-display text-[#1A1A1A] mb-2">
                  USD ${product.price}
                </p>
                <p className="text-sm text-[#737373]">
                  {product.inStock ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4 mb-8">
                <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg hover:bg-[#333333] transition-colors font-medium">
                  Add to Cart
                </button>
                <button className="w-full border border-[#E5E5E5] text-[#1A1A1A] py-4 rounded-lg hover:bg-[#F5F5F5] transition-colors font-medium">
                  Add to Wishlist
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5]">
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-amber-600 mb-2" />
                  <p className="text-sm font-medium text-[#1A1A1A]">Safe &amp; Tested</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Leaf className="w-6 h-6 text-amber-600 mb-2" />
                  <p className="text-sm font-medium text-[#1A1A1A]">Natural Formula</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Droplet className="w-6 h-6 text-amber-600 mb-2" />
                  <p className="text-sm font-medium text-[#1A1A1A]">Derma Tested</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div className="mb-20">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-6">About This Product</h2>
            <p className="text-[#737373] text-lg leading-relaxed mb-8 font-body">
              {product.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div className="mb-20">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-8">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F5F5F5] rounded-2xl text-center hover:shadow-lg transition-shadow"
                >
                  <p className="font-display text-lg text-[#1A1A1A]">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-20">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-8">Specifications</h2>
            <div className="bg-[#F5F5F5] rounded-2xl p-8">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key}>
                    <dt className="font-medium text-[#1A1A1A] capitalize mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </dt>
                    <dd className="text-[#737373] font-body">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-20">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-8">Key Ingredients</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-[#F5F5F5] rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                  <p className="text-[#1A1A1A] font-body">{ingredient}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <div className="mb-20 bg-amber-50 p-8 rounded-2xl">
            <h2 className="font-display text-3xl text-[#1A1A1A] mb-6">How to Use</h2>
            <p className="text-[#737373] text-lg leading-relaxed font-body">
              {product.howToUse}
            </p>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-32 pt-20 border-t border-[#E5E5E5]">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
                <h2 className="font-display text-3xl text-[#1A1A1A]">You Might Also Like</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relProduct) => (
                  <Link key={relProduct.id} href={`/products/${relProduct.slug}`}>
                    <div className="group cursor-pointer">
                      <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-[#F5F5F5] mb-4">
                        <Image
                          src={relProduct.image}
                          alt={relProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-display text-lg text-[#1A1A1A] mb-2">
                        {relProduct.name}
                      </h3>
                      <p className="text-[#737373] text-sm font-body mb-2">
                        {relProduct.shortDescription}
                      </p>
                      <p className="font-display text-lg text-[#1A1A1A]">
                        USD ${relProduct.price}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
