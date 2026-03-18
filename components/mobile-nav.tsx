"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { navigation } from "@/content/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-11 items-center justify-center border border-black px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex min-h-full flex-col bg-white">
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="relative flex items-center justify-between border-b border-black/10 bg-white px-5 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-black">
                <BrandMark className="h-9 w-9 shrink-0" />
                <span>Kestrel Labs</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center justify-center border border-black px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-black hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="relative flex-1 bg-white px-5 pb-6 pt-8">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">
                Navigation
              </p>
              <nav className="grid gap-3">
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border border-black/10 bg-white px-4 py-4 transition-colors hover:border-black hover:bg-black hover:text-white"
                  >
                    <span className="text-base font-medium tracking-[-0.02em] text-black transition-colors group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/35 transition-colors group-hover:text-white/60">
                      0{index + 1}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="relative mt-auto border-t border-black/10 bg-white px-5 py-5">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between border border-black bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
              >
                <span>Start a Project</span>
                <span className="text-white/65">→</span>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
