"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(price);
}

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeItem, subtotal } =
    useCart();

  const isEmpty = items.length === 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-deep-green">
          Your Cart
        </h1>
        <p className="text-sm text-charcoal/70">
          Review your items and adjust quantities.
        </p>
      </div>

      {isEmpty ? (
        <div className="rounded-[1.75rem] border border-soft-green/30 bg-white/60 p-8 shadow-sm">
          <p className="text-deep-green/90 font-semibold">Your cart is empty.</p>
          <p className="mt-2 text-sm text-charcoal/70">
            Explore our collection and add something delicious.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-deep-green transition-colors hover:bg-gold/90"
          >
            Shop now
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* CART ITEMS */}
          <section className="rounded-[1.75rem] border border-soft-green/30 bg-white/60 p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-[1.25rem] border border-soft-green/25 bg-white/70 p-4 sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
                >
                  {/* LEFT (IMAGE + INFO) */}
                  <div className="flex items-center gap-4 min-w-0">
                    <Image
                      src={item.imageSrc || "/products/placeholder.jpg"}
                      alt={item.name}
                      width={70}
                      height={70}
                      className="rounded-lg"
                      unoptimized
                    />
                    <div>
                      <p className="truncate text-sm font-semibold text-deep-green">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-charcoal/70">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* QUANTITY CONTROLS */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-cream/70 p-1 ring-1 ring-soft-green/25">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-deep-green hover:bg-soft-green/15"
                        onClick={() => decreaseQuantity(item.id, 1)}
                      >
                        <span className="text-xl leading-none">-</span>
                      </button>

                      <span className="min-w-8 text-center text-sm font-semibold text-deep-green">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-deep-green hover:bg-soft-green/15"
                        onClick={() => increaseQuantity(item.id, 1)}
                      >
                        <span className="text-xl leading-none">+</span>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT (PRICE + REMOVE) */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-deep-green">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SUMMARY */}
          <aside className="rounded-[1.75rem] border border-soft-green/30 bg-white/60 p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-deep-green">Total</p>
                <p className="text-sm font-semibold text-deep-green">
                  {formatPrice(subtotal)}
                </p>
              </div>

              <div className="h-px bg-soft-green/25" />

              <button
                type="button"
                disabled={isEmpty}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-deep-green hover:bg-gold/90 disabled:opacity-50"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-charcoal/60">
                Secure checkout powered on-site.
              </p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}