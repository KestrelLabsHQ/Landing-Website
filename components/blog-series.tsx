import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export function BlogSeries({ name, posts, currentSlug }: { name: string; posts: BlogPost[]; currentSlug: string }) {
  if (!name || posts.length <= 1) return null;

  return (
    <aside className="mb-8 border border-black/10 bg-neutral-50">
      <div className="bg-white p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
          Series
        </p>
        <p className="mt-2 text-sm font-semibold text-black/80">{name}</p>
        <ol className="mt-4 space-y-2 text-sm leading-6 text-black/75">
          {posts.map((p, i) => {
            const active = p.slug === currentSlug;
            const n = typeof p.frontmatter.seriesOrder === "number" ? p.frontmatter.seriesOrder : i + 1;
            return (
              <li key={p.slug} className={active ? "font-semibold text-black" : ""}>
                <span className="mr-2 text-black/40">{String(n).padStart(2, "0")}</span>
                {active ? (
                  <span>{p.frontmatter.title}</span>
                ) : (
                  <Link
                    href={`/blog/${p.slug}`}
                    className="underline decoration-black/25 underline-offset-4 hover:decoration-black/60"
                  >
                    {p.frontmatter.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
