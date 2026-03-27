import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero";
import { Principles } from "@/components/principles";
import { RepresentativeWork } from "@/components/representative-work";
import { SectionShell } from "@/components/section-shell";
import { ServiceCard } from "@/components/service-card";
import { homeServices } from "@/content/site-copy";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Atlanta / Founder-led / Software Systems"
        title="Serious engineering for the systems your business actually relies on."
        description="Kestrel Labs helps growing organizations with websites, internal tooling, software systems, and infrastructure work — with an engineering-first approach centered on clarity, reliability, and practical outcomes."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "Selected Work", href: "/selected-work" }}
        proofPoints={[
          "Founder-led execution without agency sprawl",
          "Business-facing polish backed by real technical depth",
          "Built for clarity, durability, and calmer operations",
        ]}
      />

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 md:px-10 md:py-10">
          <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
            {[
              {
                label: "Web presence",
                text: "Sites and repositioning work that make a business look more credible and explain itself more clearly.",
              },
              {
                label: "Internal systems",
                text: "Tools, workflows, and operational software shaped around how teams actually work day to day.",
              },
              {
                label: "Infrastructure",
                text: "Backend and reliability work for software that needs to behave well under real operating conditions.",
              },
            ].map((item) => (
              <article key={item.label} className="bg-white px-5 py-6 sm:px-6 md:px-8 md:py-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-black/72">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Services overview"
        title="Web, software, and infrastructure work held to the same engineering standard."
        description="The scope may change, but the bar stays the same: clear thinking, durable implementation, and systems that remain usable after launch."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {homeServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="How we work"
        title="Fast enough to move. Disciplined enough to last."
        description="Kestrel Labs prefers straightforward decisions, explicit tradeoffs, and work that keeps making sense once the initial excitement is gone."
        className="bg-neutral-50"
      >
        <Principles />
      </SectionShell>

      <SectionShell
        eyebrow="Selected work"
        title="Representative work shaped by real constraints, not portfolio theater."
        description="Where public case studies are limited, the examples below show the kinds of technical and business-facing work Kestrel Labs is built to handle."
      >
        <RepresentativeWork />
      </SectionShell>

      <CtaBand />
    </>
  );
}
