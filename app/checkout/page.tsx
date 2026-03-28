"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(price);
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const isEmpty = items.length === 0;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  const totalText = useMemo(() => formatPrice(subtotal), [subtotal]);

  const handleWhatsAppOrder = () => {
    const name = fullName.trim();
    const phone = phoneNumber.trim();
    const location = deliveryLocation.trim();

    if (!name || !phone || !location || isEmpty) {
      alert("Please fill all fields");
      return;
    }

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const deliveryFee = 100;
    const total = subtotal + deliveryFee;

    const message = `🧀 *Zuri Creamery Order*

🆔 Order ID: #${orderId}

👤 Name: ${name}
📞 Phone: ${phone}
📍 Location: ${location}

🛒 Order:
${items
  .map(
    (item) =>
      `• ${item.name} x${item.quantity} = KES ${
        item.price * item.quantity
      }`
  )
  .join("\n")}

🚚 Delivery: KES ${deliveryFee}
💰 Total: KES ${total}

⏱ Delivery: Within 2–4 hours
🙏 Thank you for choosing Zuri Creamery!`;

    const encoded = encodeURIComponent(message);

    alert("Redirecting to WhatsApp to complete your order...");

    const url = `https://api.whatsapp.com/send?phone=254717244403&text=${encoded}`;

    clearCart();

    window.location.href = url;
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
          <section className="bg-white rounded-2xl shadow-lg p-6 space-y-5 border border-green-100">
            <h2 className="text-xl font-semibold text-green-800">
              Delivery Details
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="tel"
                placeholder="Phone Number (07XXXXXXXX)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Delivery Location (e.g. Westlands)"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* TRUST */}
            <div className="bg-green-50 p-3 rounded-lg text-sm text-green-800">
              ✅ Freshly made daily  
              <br />
              🚚 Same-day delivery in Nairobi  
              <br />
              💳 Pay via M-Pesa on delivery  
            </div>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
            >
              Place Order via WhatsApp
            </button>
          </section>

          {/* RIGHT - SUMMARY */}
          <aside className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-green-800">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
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