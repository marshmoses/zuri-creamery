"use client";

import Image from "next/image";
import { Product } from "@/lib/products";
import { useCart } from "@/app/context/CartContext";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
      
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
          unoptimized
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-green-800">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="mt-3 text-lg font-bold text-green-700">
          KES {product.price}
        </p>

        {/* BUTTON */}
        <button
          onClick={() => {
            addItem(product.id, 1);
            alert("🧀 Added to cart!");
          }}
          className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}