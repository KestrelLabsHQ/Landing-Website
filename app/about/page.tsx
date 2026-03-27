import Image from "next/image";
import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";

export const metadata: Metadata = {
  title: "About",
};

const founderSections = [
  {
    title: "Background",
    text:
      "The founder comes from an engineering-first background shaped by systems work, implementation detail, and the habit of understanding how things behave beyond the presentation layer. That perspective shows up in client work through clear tradeoffs, durable architecture, and a preference for fixing root causes instead of decorating around them.",
  },
  {
    title: "Bio",
    text:
      "Kestrel Labs was built to serve organizations that need both polish and technical judgment. Some engagements are outward-facing — websites, digital positioning, and business-facing software — while others live deeper in the stack, where reliability, operational clarity, and careful implementation matter more than theatrics.",
  },
  {
    title: "Motivation",
    text:
      "The motivation behind the firm is simple: too many teams are forced to choose between a shop that understands presentation and one that understands systems. Kestrel Labs exists to close that gap by delivering work that looks credible, behaves well, and continues to make sense after launch.",
  },
];

export default function AboutPage() {
  return (
    <SectionShell
      eyebrow="About"
      title="An engineering-led firm for teams that need polished delivery without losing technical judgment."
      description="Kestrel Labs works in the space between a conventional web shop and a pure engineering consultancy: credible on the surface, disciplined underneath, and built for practical business needs."
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="bg-white p-5 sm:p-6 md:p-8">
          <p className="text-sm leading-7 text-black/72">
            The approach is straightforward: understand the system, reduce unnecessary complexity, and leave behind something that is easier to operate than what came before. That applies whether the work is a marketing site, an internal workflow tool, backend stabilization, or a more demanding reliability effort.
          </p>
        </article>
        <div className="grid gap-px bg-black/10">
          {[
            "Disciplined delivery over flashy output",
            "Thoughtful architecture with practical tradeoffs",
            "Comfortable in business-facing and technical environments",
            "Built to support clear execution, not churn",
          ].map((item) => (
            <div key={item} className="bg-white p-5 text-sm leading-6 text-black/76 sm:p-6 md:p-8">{item}</div>
          ))}
        </div>
      </div>

      <div className="mt-10 border border-black/10 bg-neutral-50 md:mt-14">
        <div className="grid gap-px bg-black/10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="bg-white p-5 sm:p-6 md:p-8">
            <div className="mt-1 max-w-sm border border-black/12 bg-neutral-100 p-[6px] sm:p-2">
              <div className="overflow-hidden border border-black/10 bg-white">
                <div className="border-b border-black/10 bg-white/92 px-4 py-3 text-center backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                    Founder & Principal Engineer
                  </p>
                </div>
                <div className="relative aspect-[7/8] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src="/founder/founder-ds-update.png"
                    alt="Founder of Kestrel Labs"
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 360px, 100vw"
                    className="object-cover object-[62%_22%]"
                    priority
                  />
                </div>
                <div className="border-t border-black/10 bg-white/92 px-4 py-3 text-center backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                    Daymian
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-px bg-black/10">
            <div className="bg-white p-5 sm:p-6 md:p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-3xl">
                Founder
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/70">
                Kestrel Labs is led by a founder who approaches digital work as engineering first: not as ornament, not as churn, and not as a collection of disconnected deliverables. The aim is to build systems and interfaces that are clear, resilient, and genuinely useful to the people relying on them.
              </p>
            </div>

            {founderSections.map((section) => (
              <article key={section.title} className="bg-white p-5 sm:p-6 md:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                  {section.title}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-black/72">{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
