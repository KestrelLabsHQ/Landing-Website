import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { navigation } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-9 w-9" invert />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">Kestrel Labs LLC</p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/72">
            Dependable digital systems for growing businesses, with room for deeper engineering work when the stakes are higher.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-white/72 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
          <a href="mailto:contact@kestrellabshq.com" className="text-sm text-white/72 transition-colors hover:text-white">
            contact@kestrellabshq.com
          </a>
        </div>
      </div>
    </footer>
  );
}
