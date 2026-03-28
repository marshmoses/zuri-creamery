"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(price);
}

export default function CartPage() {
  const router = useRouter();
  const { items, increaseQuantity, decreaseQuantity, subtotal } = useCart();

  const isEmpty = items.length === 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 relative z-10">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Your Cart
      </h1>

      {isEmpty ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="text-green-700 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          
          {/* CART ITEMS */}
          <section className="bg-white rounded-2xl shadow p-6 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-3"
              >
                <div>
                  <p className="font-semibold text-green-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </section>

          {/* SUMMARY */}
          <aside className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4 font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              onClick={() => router.push("/checkout")}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}