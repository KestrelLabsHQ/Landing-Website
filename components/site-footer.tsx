import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { navigation } from "@/content/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-14">
        <div>
          <div className="flex items-center gap-3 sm:gap-4">
            <BrandMark className="h-9 w-auto sm:h-10 md:h-11" invert />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:text-xs sm:tracking-[0.24em]">
              Kestrel Labs LLC
            </p>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/72">
            Founder-led engineering support for websites, internal tools, software systems, and infrastructure work that needs to hold up under real conditions.
          </p>
          <div className="mt-6 grid gap-2 text-sm text-white/64 sm:grid-cols-2">
            <p>Atlanta, Georgia</p>
            <p>Selective client fit</p>
            <p>Founder-led</p>
            <p>Available for scoped engagements</p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.24em]">Navigation</p>
            <div className="mt-4 grid gap-3">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm text-white/72 transition-colors hover:text-white">
                  {item.label}
                </Link>
              ))}
              <a
                href="https://www.holtr.ai"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/72 transition-colors hover:text-white"
              >
                HOLTR
              </a>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.24em]">Contact</p>
            <div className="mt-4 grid gap-3">
              <a href="mailto:contact@kestrellabshq.com" className="text-sm text-white/72 transition-colors hover:text-white">
                contact@kestrellabshq.com
              </a>
              <Link href="/contact" className="text-sm text-white/72 transition-colors hover:text-white">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-xs text-white/44 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {new Date().getFullYear()} Kestrel Labs LLC</p>
          <p>Quiet systems. Clear delivery.</p>
        </div>
      </div>
    </footer>
  );
}
