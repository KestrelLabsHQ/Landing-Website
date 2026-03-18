const work = [
  {
    title: "Website redesign for a growing local business",
    label: "Representative engagement",
    text: "Reframed the public site around trust, clear conversion paths, and maintainable front-end structure so the business looked established and easier to buy from.",
  },
  {
    title: "Internal workflow tool for an operations-heavy team",
    label: "Representative engagement",
    text: "Replaced ad hoc spreadsheets and manual handoffs with a purpose-built tool that reduced ambiguity, tightened process flow, and gave leaders better visibility.",
  },
  {
    title: "Backend and infrastructure stabilization",
    label: "Representative engagement",
    text: "Diagnosed recurring reliability issues, reduced operational fragility, and put guardrails in place for a system that needed to perform under real pressure.",
  },
];

export function RepresentativeWork() {
  return (
    <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
      {work.map((item) => (
        <article key={item.title} className="bg-white p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">{item.label}</p>
          <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
          <p className="mt-4 text-sm leading-6 text-black/68">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
