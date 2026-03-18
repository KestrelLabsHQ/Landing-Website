type ServiceCardProps = {
  index: string;
  title: string;
  description: string;
  bullets: string[];
};

export function ServiceCard({ index, title, description, bullets }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col border border-black/10 bg-white p-6 transition-colors duration-200 hover:border-black/25 md:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">{index}</p>
      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-black/68">{description}</p>
      <ul className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm text-black/78">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-black" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
