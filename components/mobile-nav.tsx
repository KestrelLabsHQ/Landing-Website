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
        className="flex min-h-11 items-center gap-2 border border-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex min-h-full flex-col">
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">
                <BrandMark className="h-9 w-9 shrink-0" />
                <span>Kestrel Labs</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center border border-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Close
              </button>
            </div>
            <nav className="grid gap-px border-b border-black/10 bg-black/10 px-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="bg-white py-5 text-base font-medium text-black"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-black/10 px-6 py-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center border border-black bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
