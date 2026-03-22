import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { SectionShell } from "@/components/section-shell";
import { advancedSystems } from "@/content/site-copy";

export const metadata: Metadata = {
  title: "Advanced Systems",
};

export default function AdvancedSystemsPage() {
  return (
    <>
      <Hero
        eyebrow="Advanced Systems / Research / Reliability"
        title="Advanced systems work for teams that need more than a standard agency or dev shop."
        description="Kestrel Labs supports demanding technical efforts across applied R&D, telemetry, control systems, reliability-focused backend engineering, and infrastructure for environments where performance and failure modes matter."
        primaryCta={{ label: "Discuss a Project", href: "/contact" }}
        secondaryCta={{ label: "See Core Services", href: "/services" }}
        invert
      />

      <SectionShell
        eyebrow="Capability areas"
        title="A sharper posture for systems where behavior under pressure actually matters."
        description="This is work for environments with meaningful constraints, expensive mistakes, or operational realities that punish casual engineering."
        invert
      >
        <div className="grid gap-px border border-white/10 bg-white/10 lg:grid-cols-2 xl:grid-cols-3">
          {advancedSystems.map((item) => (
            <article key={item.title} className="bg-neutral-950 p-5 sm:p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.24em]">{item.title}</p>
              <p className="mt-5 text-sm leading-6 text-white/74">{item.text}</p>
              <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-white/82">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-white" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 border border-white/10 bg-black md:mt-14">
          <div className="grid gap-8 px-5 py-6 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.24em]">
                Product direction
              </p>
              <img
                src="/holtr-banner.png"
                alt="HOLTR"
                className="mt-4 h-auto w-full max-w-[14rem] opacity-95"
              />
            </div>
            <div>
              <p className="text-sm leading-7 text-white/72 md:text-base">
                HOLTR is a Kestrel Labs product effort around clearer control for systems that retrieve,
                reason, and act — with a focus on human oversight and simplifying complex workflows.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href="https://holtr.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center justify-center border border-white bg-white px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white"
                >
                  View HOLTR
                </a>
                <a
                  href="/contact"
                  className="flex min-h-11 items-center justify-center border border-white/24 px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  Discuss related work
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
