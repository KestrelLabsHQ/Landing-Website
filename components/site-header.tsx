import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">
          <BrandMark className="h-9 w-9 shrink-0" />
          <span>Kestrel Labs</span>
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

        <details className="group md:hidden">
          <summary className="flex list-none items-center gap-2 border border-black px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] marker:hidden">
            Menu
          </summary>
          <div className="absolute left-0 right-0 top-full border-b border-black/10 bg-white">
            <nav className="mx-auto grid max-w-7xl gap-px border-t border-black/10 bg-black/10 px-6 md:px-10">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="bg-white px-0 py-4 text-sm font-medium text-black">
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="bg-white px-0 py-4 text-sm font-medium text-black">
                Contact
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
