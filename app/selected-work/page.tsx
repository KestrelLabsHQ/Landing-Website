import type { Metadata } from "next";
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
    </SectionShell>
  );
}
