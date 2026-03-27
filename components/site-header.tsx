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
        <Link href="/" className="flex min-w-0 items-center gap-2.5 text-black sm:gap-3">
          <BrandMark className="h-7 w-auto shrink-0 sm:h-8 lg:h-9" />
          <span className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.22em]">
            Kestrel Labs
          </span>
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
            className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.22em] text-black/60 transition-colors hover:text-black"
          >
            <span>HOLTR</span>
            <span aria-hidden="true" className="opacity-55 transition-opacity group-hover:opacity-100">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
              >
                <path
                  d="M6 4H4.75C4.05964 4 3.5 4.55964 3.5 5.25V11.25C3.5 11.9404 4.05964 12.5 4.75 12.5H10.75C11.4404 12.5 12 11.9404 12 11.25V10"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 4H12.5V8.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.25 4.25L7.5 9"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
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
