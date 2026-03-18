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
            <article key={item.title} className="bg-neutral-950 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/45">{item.title}</p>
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
      </SectionShell>
    </>
  );
}
