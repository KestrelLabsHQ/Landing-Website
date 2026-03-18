import Link from "next/link";
import { navigation } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">
          <span className="flex h-9 w-9 items-center justify-center border border-black text-base tracking-[-0.08em]">K</span>
          <span className="hidden sm:inline">Kestrel Labs</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-xs font-semibold uppercase tracking-[0.22em] text-black/66 transition-colors hover:text-black">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white">
          Contact
        </Link>
      </div>
    </header>
  );
}
