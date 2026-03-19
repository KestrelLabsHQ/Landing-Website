import Link from "next/link";
import type { TocItem } from "@/lib/blog";

export function BlogToc({ items }: { items: TocItem[] }) {
  if (!items.length) return null;

  return (
    <aside className="mb-8 border border-black/10 bg-neutral-50">
      <div className="bg-white p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
          On this page
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-6 text-black/75">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
              <Link
                href={`#${item.id}`}
                className="underline decoration-black/25 underline-offset-4 hover:decoration-black/60"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
