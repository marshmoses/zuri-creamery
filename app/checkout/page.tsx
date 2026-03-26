"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(price);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const isEmpty = items.length === 0;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const totalText = useMemo(() => formatPrice(subtotal), [subtotal]);

  const handlePlaceOrder = () => {
    if (!fullName || !phoneNumber || !deliveryLocation || isEmpty) {
      alert("Please fill all fields");
      return;
    }

    const newOrder = {
      name: fullName,
      phone: phoneNumber,
      location: deliveryLocation,
      items,
      total: subtotal,
      date: new Date().toISOString(),
    };

    const existing = localStorage.getItem("zuriOrders");
    const orders = existing ? JSON.parse(existing) : [];
    orders.push(newOrder);
    localStorage.setItem("zuriOrders", JSON.stringify(orders));

    clearCart();
    router.push("/order-success");
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        Checkout
      </h1>

      {isEmpty ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="text-green-700 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          
          {/* LEFT - FORM */}
          <section className="bg-white rounded-2xl shadow p-6 space-y-5">
            <h2 className="text-xl font-semibold text-green-800">
              Delivery Details
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Delivery Location"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Place Order
            </button>
          </section>

          {/* RIGHT - SUMMARY */}
          <aside className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-green-800">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>{totalText}</span>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}