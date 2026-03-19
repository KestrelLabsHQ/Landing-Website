import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { getAllTags } from "@/lib/blog";

export const metadata = {
  title: "Tags",
  description: "Browse posts by tag.",
};

export default function BlogTagsIndexPage() {
  const tags = getAllTags();

  return (
    <SectionShell eyebrow="Writing" title="Tags" description="Browse posts by topic." className="min-h-[calc(100svh-8rem)]">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tags/${tag}`}
            className="rounded-full border border-black/12 bg-white px-3 py-1 text-xs font-semibold text-black/70 hover:bg-neutral-50"
          >
            {tag}
          </Link>
        ))}
        {tags.length === 0 ? <p className="text-sm leading-7 text-black/70">No tags yet.</p> : null}
      </div>
    </SectionShell>
  );
}
