import type { Metadata } from "next";
import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { RepresentativeWork } from "@/components/representative-work";

export const metadata: Metadata = {
  title: "Selected Work",
};

const credibilitySignals = [
  {
    title: "Representative, not inflated",
    text: "Where engagements are private or operationally sensitive, Kestrel Labs favors representative summaries over exaggerated claims. The goal is to show the shape of the work honestly, not to over-market it.",
  },
  {
    title: "Built around real constraints",
    text: "The work is shaped by the things that actually make delivery difficult: changing requirements, operational pressure, awkward integrations, reliability issues, and systems that have to keep functioning after launch day.",
  },
  {
    title: "Comfortable above and below the surface",
    text: "Some engagements are presentation-heavy and business-facing. Others live deeper in operations, software, and infrastructure. The common thread is disciplined implementation and practical judgment.",
  },
];

const engagementNotes = [
  "Public case studies are not always available, especially where internal systems or operational details are involved.",
  "Representative examples are intended to show engagement fit, technical range, and the standard of thinking behind the work.",
  "Additional detail can be shared in direct conversations when context and confidentiality allow.",
];

const process = [
  {
    step: "01",
    title: "Initial conversation",
    text: "Start with the problem, the system, or the constraint. The first goal is simply to understand what matters, what is already known, and whether the engagement is a good fit.",
  },
  {
    step: "02",
    title: "Scope and fit",
    text: "If the work makes sense to pursue, the next step is clarifying scope, decision points, risks, and the level of technical depth required so expectations are clean before implementation begins.",
  },
  {
    step: "03",
    title: "Build and refine",
    text: "Implementation is shaped around usable delivery, not theater. That means practical iteration, clear tradeoffs, and attention to the parts of the system that will still matter after launch.",
  },
  {
    step: "04",
    title: "Handoff or continued support",
    text: "Some work ends with a clean handoff. Some benefits from continued engineering support. Either way, the goal is a result that remains understandable and operable after the engagement closes.",
  },
];

export default function SelectedWorkPage() {
  return (
    <SectionShell
      eyebrow="Selected Work"
      title="Representative engagements that show how Kestrel Labs approaches real-world delivery."
      description="This is not a volume portfolio. It is a more useful view of the kinds of business, software, and infrastructure work Kestrel Labs is built to support."
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="bg-white p-5 sm:p-6 md:p-8">
          <p className="text-sm leading-7 text-black/72">
            Credibility in this context does not come from sounding grander than the work itself. It comes from showing clear judgment, respecting constraints, and delivering systems that hold up when they meet actual users, actual teams, and actual operating conditions.
          </p>
        </article>
        <div className="grid gap-px bg-black/10">
          {engagementNotes.map((note) => (
            <div key={note} className="bg-white p-5 text-sm leading-6 text-black/76 sm:p-6 md:p-8">
              {note}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <RepresentativeWork />
      </div>

      <div className="mt-10 border border-black/10 bg-neutral-50 md:mt-14">
        <div className="border-b border-black/10 bg-white px-5 py-6 sm:px-6 md:px-8 md:py-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
            Engagement process
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-3xl">
            A simple process designed to reduce ambiguity.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/70">
            Serious work does not need an elaborate ritual around it. The process is straightforward: establish fit, clarify scope, build carefully, and leave behind something that is easier to understand and operate.
          </p>
        </div>
        <div className="grid gap-px bg-black/10 lg:grid-cols-4">
          {process.map((item) => (
            <article key={item.step} className="bg-white p-5 sm:p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                {item.step}
              </p>
              <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-black/70">{item.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3 md:mt-14">
        {credibilitySignals.map((item) => (
          <article key={item.title} className="bg-white p-5 sm:p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
              Why it matters
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-black/70">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:gap-4">
        <Link href="/contact" className="flex min-h-12 items-center justify-center border border-black bg-black px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-transparent hover:text-black">
          Start a Project
        </Link>
        <Link href="/services" className="flex min-h-12 items-center justify-center border border-black/16 px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:border-black hover:bg-black hover:text-white">
          See Services
        </Link>
      </div>
    </SectionShell>
  );
}
