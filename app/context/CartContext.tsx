"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { productsById } from "@/lib/products";

export type CartItem = {
  id: string;
  quantity: number;
  name: string;
  price: number;
  imageSrc: string; // <- needed for CartPage
};

type CartContextType = {
  items: CartItem[];
  subtotal: number;
  addItem: (id: string, qty?: number) => void;
  increaseQuantity: (id: string, qty?: number) => void;
  decreaseQuantity: (id: string, qty?: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (id: string, qty = 1) => {
    const product = productsById[id];
    if (!product) return;

    setItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i =>
          i.id === id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          id,
          quantity: qty,
          name: product.name,
          price: product.price,
          imageSrc: product.imageSrc, // <- include imageSrc
        },
      ];
    });
  };

  const increaseQuantity = (id: string, qty = 1) => addItem(id, qty);

  const decreaseQuantity = (id: string, qty = 1) => {
    setItems(prev =>
      prev
        .map(i =>
          i.id === id
            ? { ...i, quantity: Math.max(1, i.quantity - qty) }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
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

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};