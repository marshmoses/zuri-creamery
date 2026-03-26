"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "../components/ProductCard";

type FilterId = "all" | "mozzarella" | "cheddar";

const filters: Array<{ id: FilterId; label: string }> = [
  { id: "all", label: "All" },
  { id: "mozzarella", label: "Mozzarella" },
  { id: "cheddar", label: "Cheddar" },
];

function matchesFilter(product: Product, filterId: FilterId) {
  if (filterId === "all") return true;

  const name = product.name.toLowerCase();
  if (filterId === "mozzarella") return name.includes("mozzarella");
  if (filterId === "cheddar") return name.includes("cheddar");

  return true;
}

export function ShopClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<FilterId>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => matchesFilter(p, filter));
  }, [products, filter]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-deep-green">Shop</h1>
          <p className="mt-2 text-sm text-charcoal/70">
            Premium small-batch dairy. Choose your favorites.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors ring-1 ring-soft-green/25",
                  active
                    ? "bg-soft-green/20 text-deep-green"
                    : "bg-white/60 text-deep-green/80 hover:bg-cream/60",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[1.75rem] border border-soft-green/30 bg-white/60 p-8 shadow-sm">
          <p className="text-deep-green font-semibold">No products found.</p>
          <p className="mt-2 text-sm text-charcoal/70">Try a different filter.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

