import Link from "next/link";

const representativeWork = [
  {
    title: "Website repositioning for a growing local business",
    label: "Representative engagement",
    situation:
      "The business had a dated public site, soft messaging, and no clear path from first impression to inquiry. The offering itself was stronger than the site made it appear.",
    approach:
      "Reworked the site around trust, clearer service framing, tighter information architecture, and a maintainable front-end implementation that could be updated without creating long-term content debt.",
    outcome:
      "A more credible digital front door, a clearer conversion path, and a presentation that felt aligned with the quality of the business behind it.",
  },
  {
    title: "Internal workflow tool for an operations-heavy team",
    label: "Representative engagement",
    situation:
      "Daily work depended on spreadsheets, manual status tracking, and handoffs that were easy to miss and hard to audit. The process existed, but the tooling did not support it well.",
    approach:
      "Designed a purpose-built internal tool around the actual workflow: task states, ownership, approvals, and visibility for the people managing throughput rather than just reporting on it after the fact.",
    outcome:
      "Cleaner handoffs, less ambiguity, better operational visibility, and a system that matched the team’s real process instead of forcing it into generic software assumptions.",
  },
  {
    title: "Backend and infrastructure stabilization",
    label: "Representative engagement",
    situation:
      "A production system was experiencing recurring reliability problems, weak operational visibility, and deployment friction that made even routine changes feel higher-risk than they should have been.",
    approach:
      "Traced failure patterns, tightened weak spots in the service and deployment path, and added guardrails so the system became easier to reason about under normal load and degraded conditions alike.",
    outcome:
      "A calmer operating posture, fewer repeated reliability incidents, and a technical foundation that was easier to support without constant firefighting.",
  },
];

const publicEngineeringWork = {
  title: "tiny64os — public educational x86_64 operating-system project",
  label: "Public engineering work",
  situation:
    "Built as a compact public systems project that others can inspect, build, and run, with the goal of making low-level engineering depth visible in a concrete and teachable form.",
  approach:
    "Implemented a minimal x86_64 operating system with GRUB/Multiboot2 boot, long-mode entry, interrupt handling, exception diagnostics, VGA console output, keyboard input, serial boot logging, and a tiny interactive shell.",
  outcome:
    "A public proof of systems-level competence that reflects the same engineering habits Kestrel brings to client work: clear architecture, disciplined debugging, and comfort below the application layer.",
  link: "https://github.com/dmtomczyk/tiny64os",
  linkLabel: "View repository",
  note: "Published separately under the founder's personal GitHub.",
};

function WorkCard({
  item,
  compact = false,
}: {
  item: {
    title: string;
    label: string;
    situation: string;
    approach: string;
    outcome: string;
    link?: string;
    linkLabel?: string;
    note?: string;
  };
  compact?: boolean;
}) {
  return (
    <article className="bg-white p-5 sm:p-6 md:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">{item.label}</p>
      <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] sm:mt-5 sm:text-2xl">{item.title}</h3>

      <div className={`mt-6 ${compact ? "grid gap-6 lg:grid-cols-3" : "space-y-5"}`}>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">Situation</p>
          <p className="mt-2 text-sm leading-6 text-black/70">{item.situation}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">What Kestrel did</p>
          <p className="mt-2 text-sm leading-6 text-black/70">{item.approach}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">Outcome</p>
          <p className="mt-2 text-sm leading-6 text-black/70">{item.outcome}</p>
        </div>
      </div>

      {item.link ? (
        <div className="pt-6">
          <Link
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center border border-black/16 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            {item.linkLabel}
          </Link>
          {item.note ? <p className="mt-3 text-xs leading-6 text-black/52">{item.note}</p> : null}
        </div>
      ) : null}
    </article>
  );
}

export function RepresentativeWork() {
  return (
    <div className="space-y-px border border-black/10 bg-black/10">
      <WorkCard item={publicEngineeringWork} compact />

      <div className="grid gap-px bg-black/10 lg:grid-cols-3">
        {representativeWork.map((item) => (
          <WorkCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
