"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/lib/products";
import { ProductCard } from "./components/ProductCard";

export default function Home() {
  const heroProducts = featuredProducts.slice(0, 3);

  return (
    <main className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8E1] to-[#E8F5E9]">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 animate-fade-in">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            
            {/* LEFT SIDE */}
            <div className="max-w-xl">
              
              {/* LOGO + BRAND */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Zuri Creamery"
                  width={40}
                  height={40}
                />
                <span className="text-lg font-semibold text-green-800">
                  Zuri Creamery
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-green-800">
                Beautifully crafted dairy for everyday indulgence.
              </h1>

              <p className="mt-4 text-gray-600 text-lg">
                Fresh, local, premium cheese made with care.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/shop"
                  className="bg-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90"
                >
                  Shop Now
                </Link>

                <Link
                  href="#featured"
                  className="bg-white px-6 py-3 rounded-full text-sm font-semibold border"
                >
                  Explore
                </Link>
              </div>

              {/* TRUST BADGES */}
              <div className="mt-10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-semibold text-green-800">Fresh Daily</p>
                  <p className="text-xs text-gray-500">Small batches</p>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Locally Made</p>
                  <p className="text-xs text-gray-500">Kenyan sourced</p>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Premium Quality</p>
                  <p className="text-xs text-gray-500">Best taste</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (PRODUCT DISPLAY) */}
            <div className="grid grid-cols-3 gap-4">
              {heroProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl shadow-md p-3 text-center hover:scale-105 transition duration-300"
                > 
         
                  <Image
                    src={p.imageSrc}
                    alt={p.name}
                    width={120}
                    height={120}
                    className="mx-auto"
                    unoptimized
                  />
                  <p className="mt-2 text-sm font-semibold text-green-800">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    KES {p.price}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="featured" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-green-800">
            Featured Products
          </h2>

          <Link href="/shop" className="text-sm text-green-700">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#FFF8E1] py-16 text-center">
        <h2 className="text-3xl font-semibold text-green-800">
          Why Choose Zuri Creamery?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto px-4">
          <div>
            <h3 className="text-lg font-semibold">🧀 Fresh Daily</h3>
            <p className="text-gray-600 mt-2">
              Crafted fresh every day for the best flavor.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">🌿 Locally Made</h3>
            <p className="text-gray-600 mt-2">
              Supporting Kenyan farmers and ingredients.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">⭐ Premium Quality</h3>
            <p className="text-gray-600 mt-2">
              Consistent taste and high quality standards.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}