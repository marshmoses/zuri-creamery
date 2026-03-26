"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/shop", label: "Shop" },
      { href: "/cart", label: "Cart" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-cream/70 px-4 py-2 text-sm font-semibold text-deep-green ring-1 ring-soft-green/30 backdrop-blur-sm"
          >
            <span className="text-gold">Zuri</span>
            <span className="text-deep-green">Creamery</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={classNames(
                    "relative rounded-full px-3 py-2 text-sm font-medium transition-colors ring-1 ring-transparent",
                    isActive ? "bg-soft-green/20 text-deep-green ring-soft-green/40" : "text-deep-green/80 hover:bg-soft-green/15 hover:text-deep-green"
                  )}
                >
                  {l.label}
                  {l.href === "/cart" && itemCount > 0 ? (
                    <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-deep-green ring-1 ring-gold/40">
                      {itemCount}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/70 ring-1 ring-soft-green/30 backdrop-blur-sm md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 7H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-4">
            <div className="rounded-[1.25rem] border border-soft-green/30 bg-white/70 p-2 backdrop-blur-sm">
              {links.map((l) => {
                const isActive = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={classNames(
                      "flex items-center justify-between rounded-[0.9rem] px-4 py-3 text-sm font-semibold transition-colors",
                      isActive ? "bg-soft-green/20 text-deep-green" : "text-deep-green/80 hover:bg-soft-green/15 hover:text-deep-green"
                    )}
                  >
                    <span>{l.label}</span>
                    {l.href === "/cart" && itemCount > 0 ? (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-deep-green ring-1 ring-gold/40">
                        {itemCount}
                      </span>
                    ) : (
                      <span className="h-5" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

