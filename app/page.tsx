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
        eyebrow="Atlanta / Software Systems / Infrastructure"
        title="Dependable digital systems for growing businesses."
        description="From polished websites and internal tools to more demanding software and infrastructure, Kestrel Labs brings research-grade engineering discipline to practical business problems."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "See Services", href: "/services" }}
      />

      <SectionShell
        eyebrow="Services overview"
        title="Clear, useful work built to hold up after launch."
        description="Kestrel Labs helps businesses improve the systems people actually depend on — externally, internally, and underneath the hood."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {homeServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="How we work"
        title="Engineering discipline without unnecessary theater."
        description="The goal is not to make the work look complex. The goal is to make the result dependable."
        className="bg-neutral-50"
      >
        <Principles />
      </SectionShell>

      <SectionShell
        eyebrow="Selected work"
        title="Representative engagements shaped around real operational needs."
        description="Where public case studies are limited, the examples below show the kinds of practical work Kestrel Labs is built to support."
      >
        <RepresentativeWork />
      </SectionShell>

      <CtaBand />
    </>
  );
}
