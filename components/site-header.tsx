import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/mobile-nav";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link href="/" className="flex min-w-0 items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-black">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="truncate">Kestrel Labs</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.22em] text-black/66 transition-colors hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white">
            Contact
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
