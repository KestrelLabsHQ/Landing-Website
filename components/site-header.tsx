"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-black">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="truncate">Kestrel Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative pb-1 text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                  isActive ? "text-black" : "text-black/66 hover:text-black"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-[3px] h-px bg-black/70 transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://www.holtr.ai"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.22em] text-black/60 transition-colors hover:text-black"
          >
            HOLTR
          </a>
          <Link href="/contact" className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white">
            Contact
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
