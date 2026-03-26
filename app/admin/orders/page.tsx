"use client";

import { useEffect, useMemo, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  customerName: string;
  phone: string;
  location: string;
  items: OrderItem[];
  totalPrice: number;
  date: string;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES" }).format(price);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return new Intl.DateTimeFormat("en-KE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("zuriOrders");
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        setOrders(parsed as Order[]);
      } else {
        setOrders([]);
      }
    } catch {
      setOrders([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [orders]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-deep-green">
        Zuri Creamery Orders Dashboard
      </h1>

      <p className="mt-2 text-sm text-charcoal/70">
        View all customer orders saved from checkout.
      </p>

      <section className="mt-8 max-h-[70vh] overflow-y-auto pr-1">
        {!isLoaded ? (
          <div className="rounded-[1.5rem] border border-soft-green/30 bg-white/60 p-6 shadow-sm">
            <p className="text-sm text-charcoal/70">Loading orders...</p>
          </div>
        ) : sortedOrders.length === 0 ? (
          <div className="rounded-[1.5rem] border border-soft-green/30 bg-white/60 p-6 shadow-sm">
            <p className="text-deep-green font-semibold">No orders yet.</p>
            <p className="mt-1 text-sm text-charcoal/70">
              Orders placed from checkout will appear here.
            </p>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-soft-green/30 bg-white/60 shadow-sm backdrop-blur-sm overflow-hidden">
            {sortedOrders.map((order, index) => (
              <div key={`${order.phone}-${order.date}-${index}`}>
                <article className="p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <p className="text-base font-semibold text-deep-green">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-charcoal/75">Phone: {order.phone}</p>
                      <p className="text-sm text-charcoal/75">Location: {order.location}</p>
                    </div>
                    <p className="self-start text-xs font-semibold text-deep-green/80 rounded-full bg-soft-green/20 px-3 py-1 ring-1 ring-soft-green/30">
                      {formatDate(order.date)}
                    </p>
                  </div>

                  <div className="mt-4 rounded-[1rem] bg-cream/35 p-3 sm:p-4 ring-1 ring-soft-green/20">
                    <p className="text-sm font-semibold text-deep-green">Items ordered</p>
                    <ul className="mt-2 divide-y divide-soft-green/20">
                      {order.items.map((item) => (
                        <li
                          key={`${item.id}-${item.name}`}
                          className="grid grid-cols-[1fr_auto] gap-3 py-2 text-sm text-charcoal/80"
                        >
                          <span className="min-w-0 truncate">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-deep-green">Total price</p>
                    <p className="text-lg font-bold text-deep-green">
                      {formatPrice(order.totalPrice)}
                    </p>
                  </div>
                </article>
                {index < sortedOrders.length - 1 ? (
                  <div className="h-px bg-soft-green/30 mx-4 sm:mx-6" />
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

