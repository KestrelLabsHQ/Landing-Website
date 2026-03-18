import Link from "next/link";
import { BackgroundSignal } from "@/components/background-signal";

type HeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  invert?: boolean;
};

export function Hero({ eyebrow, title, description, primaryCta, secondaryCta, invert = false }: HeroProps) {
  return (
    <section className={invert ? "relative overflow-hidden bg-black text-white" : "relative overflow-hidden bg-white text-black"}>
      <BackgroundSignal invert={invert} className="hidden md:block" />
      <div className="mx-auto grid min-h-[64svh] max-w-7xl items-center gap-12 px-5 py-16 md:min-h-[70svh] md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-28">
        <div className="relative z-10 max-w-3xl">
          <p className={invert ? "text-[11px] font-semibold uppercase tracking-[0.24em] text-white/58 sm:text-xs sm:tracking-[0.28em]" : "text-[11px] font-semibold uppercase tracking-[0.24em] text-black/50 sm:text-xs sm:tracking-[0.28em]"}>{eyebrow}</p>
          <h1 className="mt-5 max-w-[14ch] text-4xl font-semibold tracking-[-0.06em] text-balance sm:text-5xl md:max-w-none md:text-7xl">{title}</h1>
          <p className={invert ? "mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8" : "mt-5 max-w-2xl text-base leading-7 text-black/68 sm:text-lg sm:leading-8"}>{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link href={primaryCta.href} className={invert ? "flex min-h-12 items-center justify-center border border-white bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white" : "flex min-h-12 items-center justify-center border border-black bg-black px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-black"}>
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className={invert ? "flex min-h-12 items-center justify-center border border-white/24 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-black" : "flex min-h-12 items-center justify-center border border-black/16 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:border-black hover:bg-black hover:text-white"}>
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative hidden min-h-[26rem] md:block">
          <div className={invert ? "absolute right-0 top-6 h-80 w-80 border border-white/16" : "absolute right-0 top-6 h-80 w-80 border border-black/12"} />
          <div className={invert ? "absolute right-14 top-14 h-px w-96 rotate-[22deg] bg-white/25" : "absolute right-14 top-14 h-px w-96 rotate-[22deg] bg-black/18"} />
          <div className={invert ? "absolute right-16 top-44 h-px w-72 -rotate-[14deg] bg-white/14" : "absolute right-16 top-44 h-px w-72 -rotate-[14deg] bg-black/12"} />
          <div className={invert ? "absolute bottom-8 right-12 grid w-72 grid-cols-4 gap-3 text-[10px] uppercase tracking-[0.25em] text-white/45" : "absolute bottom-8 right-12 grid w-72 grid-cols-4 gap-3 text-[10px] uppercase tracking-[0.25em] text-black/38"}>
            <span>Signal</span><span>Trace</span><span>Control</span><span>Load</span>
          </div>
        </div>
      </div>
    </section>
  );
}
