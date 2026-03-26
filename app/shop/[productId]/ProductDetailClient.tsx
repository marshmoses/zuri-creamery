"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import type { Product } from "@/lib/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(price);
}

export function ProductDetailClient({
  productId,
  product,
}: {
  productId: string;
  product: Product;
}) {
  const { items, addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const inCartQty = useMemo(() => {
    return items.find((i) => i.id === productId)?.quantity ?? 0;
  }, [items, productId]);

  const priceText = useMemo(() => formatPrice(product.price), [product.price]);

  return (
    <div className="rounded-[2rem] bg-white/60 p-6 ring-1 ring-soft-green/25 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-deep-green">
            {product.name}
          </h1>
          <p className="mt-2 text-charcoal/75">{product.description}</p>
        </div>

        <div className="shrink-0 rounded-full bg-soft-green/20 px-4 py-2 ring-1 ring-soft-green/35">
          <p className="text-sm font-semibold text-deep-green">{priceText}</p>
          {inCartQty > 0 ? (
            <p className="mt-1 text-xs font-semibold text-deep-green/80">
              In cart: {inCartQty}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-deep-green">Quantity</p>
          <div className="inline-flex items-center overflow-hidden rounded-full ring-1 ring-soft-green/30 bg-cream/60">
            <button
              type="button"
              className="h-10 w-10 grid place-items-center text-deep-green transition-colors hover:bg-soft-green/15 active:bg-soft-green/25 disabled:opacity-50"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="min-w-[42px] text-center text-sm font-semibold text-deep-green">
              {quantity}
            </span>
            <button
              type="button"
              className="h-10 w-10 grid place-items-center text-deep-green transition-colors hover:bg-soft-green/15 active:bg-soft-green/25"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addItem(productId, quantity)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-deep-green transition-transform hover:translate-y-[-1px] active:translate-y-[0px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
        >
          Add to Cart
        </button>
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-cream/50 p-4 ring-1 ring-soft-green/20">
        <p className="text-xs font-semibold uppercase tracking-wide text-deep-green/70">
          Why you’ll love it
        </p>
        <ul className="mt-2 space-y-1 text-sm text-charcoal/70">
          <li>Premium small-batch quality</li>
          <li>Clean, rich flavor profile</li>
          <li>Perfect for everyday indulgence</li>
        </ul>
      </div>
    </div>
  );
}

