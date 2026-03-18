import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SectionShell
      eyebrow="About"
      title="An engineering-led firm built for both polished delivery and deeper technical work."
      description="Kestrel Labs is positioned between a conventional web shop and a pure R&D outfit: disciplined enough for demanding systems work, practical enough for everyday business needs."
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="bg-white p-6 md:p-8">
          <p className="text-sm leading-7 text-black/72">
            The firm’s approach is straightforward: understand the system, reduce unnecessary complexity, and build solutions that remain usable after the initial excitement wears off. That applies whether the work is a marketing site, an internal workflow tool, backend stabilization, or a more demanding reliability-oriented effort.
          </p>
        </article>
        <div className="grid gap-px bg-black/10">
          {[
            "Disciplined delivery over flashy output",
            "Thoughtful architecture with practical tradeoffs",
            "Comfortable in business-facing and technical environments",
            "Built to support clear execution, not churn",
          ].map((item) => (
            <div key={item} className="bg-white p-6 text-sm leading-6 text-black/76 md:p-8">{item}</div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
