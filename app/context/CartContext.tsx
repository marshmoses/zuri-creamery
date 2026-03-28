"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { productsById } from "@/lib/products";

/* =========================
   TYPES
========================= */

export type CartItem = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  imageSrc: string;
};

type CartContextType = {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addItem: (id: string, qty?: number) => void;
  increaseQuantity: (id: string, qty?: number) => void;
  decreaseQuantity: (id: string, qty?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

/* =========================
   CONTEXT
========================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  /* -------------------------
     ADD ITEM
  ------------------------- */
  const addItem = (id: string, qty = 1) => {
    const product = productsById[id];
    if (!product) return;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);

      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          id,
          quantity: qty,
          name: product.name,
          price: product.price,
          imageSrc: product.imageSrc,
        },
      ];
    });
  };

  /* -------------------------
     INCREASE
  ------------------------- */
  const increaseQuantity = (id: string, qty = 1) => {
    addItem(id, qty);
  };

  /* -------------------------
     DECREASE
  ------------------------- */
  const decreaseQuantity = (id: string, qty = 1) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, quantity: Math.max(1, i.quantity - qty) }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  /* -------------------------
     REMOVE ITEM
  ------------------------- */
  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* -------------------------
     CLEAR CART
  ------------------------- */
  const clearCart = () => {
    setItems([]);
  };

  /* -------------------------
     DERIVED VALUES
  ------------------------- */

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* -------------------------
     PROVIDER VALUE
  ------------------------- */

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        itemCount,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};