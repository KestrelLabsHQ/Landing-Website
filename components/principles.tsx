const principles = [
  {
    title: "Correctness over novelty",
    text: "Trendy stacks do not rescue brittle systems. The work should be understandable, supportable, and right.",
  },
  {
    title: "Design for failure, not only success",
    text: "Healthy systems account for edge cases, operational mistakes, downtime, and imperfect inputs from the start.",
  },
  {
    title: "Simple systems survive",
    text: "Restraint is a feature. Clear architecture usually beats complexity disguised as ambition.",
  },
  {
    title: "Speed comes from clarity",
    text: "When the problem is framed correctly, teams move faster, rework drops, and delivery becomes calmer.",
  },
];

export function Principles() {
  return (
    <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
      {principles.map((item) => (
        <article key={item.title} className="bg-white p-6 md:p-7">
          <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
          <p className="mt-4 text-sm leading-6 text-black/68">{item.text}</p>
        </article>
      ))}
    </div>
  );
}
