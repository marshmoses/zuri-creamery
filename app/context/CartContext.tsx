"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { productsById } from "@/lib/products";

type CartQuantities = Record<string, number>;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string, quantity?: number) => void;
  decreaseQuantity: (productId: string, quantity?: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeQty(quantity: number | undefined) {
  if (!quantity || Number.isNaN(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [quantityById, setQuantityById] = useState<CartQuantities>({});

  const items = useMemo<CartItem[]>(() => {
    return Object.entries(quantityById)
      .filter(([, qty]) => qty > 0)
      .map(([productId, quantity]) => {
        const product = productsById[productId];
        if (!product) return null; // If the product was removed from the catalog.
        return { id: productId, name: product.name, price: product.price, quantity };
      })
      .filter((x): x is CartItem => x !== null);
  }, [quantityById]);

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const addItem = useCallback((productId: string, quantity?: number) => {
    if (!productsById[productId]) return;
    const qty = normalizeQty(quantity);
    setQuantityById((prev) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + qty,
    }));
  }, []);

  const removeItem = useCallback((productId: string) => {
    setQuantityById((prev) => {
      const { [productId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const increaseQuantity = useCallback(
    (productId: string, quantity?: number) => {
      if (!productsById[productId]) return;
      const qty = normalizeQty(quantity);
      setQuantityById((prev) => ({
        ...prev,
        [productId]: (prev[productId] ?? 0) + qty,
      }));
    },
    []
  );

  const decreaseQuantity = useCallback(
    (productId: string, quantity?: number) => {
      if (!productsById[productId]) return;
      const qty = normalizeQty(quantity);
      setQuantityById((prev) => {
        const nextQty = (prev[productId] ?? 0) - qty;
        if (nextQty <= 0) {
          const { [productId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [productId]: nextQty };
      });
    },
    []
  );

  const clearCart = useCallback(() => setQuantityById({}), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [items, itemCount, subtotal, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

