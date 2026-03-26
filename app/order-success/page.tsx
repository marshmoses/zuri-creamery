"use client";

import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        
        {/* ICON */}
        <div className="text-5xl mb-4">🎉</div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-green-800">
          Order Placed Successfully!
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 mt-3">
          Thank you for shopping with Zuri Creamery.  
          Your order has been received and we will contact you shortly.
        </p>

        {/* CTA */}
        <Link
          href="/shop"
          className="mt-6 inline-block bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
        >
          Continue Shopping
        </Link>

        {/* EXTRA */}
        <p className="text-xs text-gray-400 mt-4">
          Need help? Contact us via WhatsApp.
        </p>
      </div>
    </main>
  );
}