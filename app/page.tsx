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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8E1] via-white to-[#E8F5E9]">
        
        {/* SOFT GLOW */}
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-green-200/30 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* LEFT SIDE */}
            <div className="max-w-xl animate-fade-in">
              
              {/* LOGO */}
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/logo.jpg"
                  alt="Zuri Creamery"
                  width={42}
                  height={42}
                  className="rounded-full"
                  priority
                />
                <span className="text-lg font-semibold text-green-800">
                  Zuri Creamery
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-green-900 leading-tight">
                Premium cheese, <br />
                crafted for everyday indulgence.
              </h1>

              <p className="mt-4 text-gray-600 text-lg">
                Fresh, locally made dairy with rich taste and smooth texture.
              </p>

              <div className="mt-8 flex gap-4">
                <Link
                  href="/shop"
                  className="bg-green-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-800 transition"
                >
                  Shop Now
                </Link>

                <Link
                  href="#featured"
                  className="bg-white px-6 py-3 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                  Explore
                </Link>
              </div>

              {/* TRUST BADGES */}
              <div className="mt-10 grid grid-cols-3 gap-4 text-center bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
                <div>
                  <p className="font-semibold text-green-800">Fresh Daily</p>
                  <p className="text-xs text-gray-500">Small batches</p>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Locally Made</p>
                  <p className="text-xs text-gray-500">Kenyan sourced</p>
                </div>
                <div>
                  <p className="font-semibold text-green-800">Premium</p>
                  <p className="text-xs text-gray-500">Top quality</p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="grid grid-cols-3 gap-4">
              {heroProducts.map((p, i) => (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl shadow-md p-4 text-center hover:scale-105 transition duration-300 ${
                    i === 1 ? "translate-y-4" : ""
                  }`}
                >
                  <div className="relative w-full h-[100px]">
                    <Image
                      src={p.imageSrc}
                      alt={p.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <p className="mt-3 text-sm font-semibold text-green-800">
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
          <div>
            <h2 className="text-3xl font-semibold text-green-800">
              Featured Products
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our most loved cheeses
            </p>
          </div>

          <Link
            href="/shop"
            className="text-sm text-green-700 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="relative">
              
              {/* BADGE */}
              <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded z-10">
                Best Seller
              </span>

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-[#FFF8E1] py-16 text-center">
        <h2 className="text-3xl font-semibold text-green-800">
          Why Choose Zuri Creamery?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-5xl mx-auto px-4">
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">🧀 Fresh Daily</h3>
            <p className="text-gray-600 mt-2">
              Crafted fresh every day for rich flavor.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">🌿 Locally Made</h3>
            <p className="text-gray-600 mt-2">
              Supporting Kenyan farmers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold">⭐ Premium Quality</h3>
            <p className="text-gray-600 mt-2">
              Consistent taste you can trust.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}