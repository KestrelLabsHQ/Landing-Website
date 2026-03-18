import Link from "next/link";

export function CtaBand() {
  return (
    <section className="border-t border-white/10 bg-neutral-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-14 sm:px-6 md:flex-row md:items-end md:justify-between md:px-10 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 sm:text-xs sm:tracking-[0.24em]">Start the conversation</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-balance sm:text-4xl md:text-5xl">Practical delivery for business needs. Serious engineering when the work demands it.</h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">Whether you need a sharper website, a useful internal system, or help with a more demanding platform problem, Kestrel Labs can scope the work clearly and build it with discipline.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
          <Link href="/contact" className="flex min-h-12 items-center justify-center border border-white bg-white px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white">Get in Touch</Link>
          <Link href="/advanced-systems" className="flex min-h-12 items-center justify-center border border-white/24 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white">Advanced Systems</Link>
        </div>
      </div>
    </section>
  );
}
