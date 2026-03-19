import Link from "next/link";
import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { formatPostDate, getAllTags, getPostsByTag } from "@/lib/blog";

export async function generateStaticParams(): Promise<Array<{ tag: string }>> {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: unknown }): Promise<Metadata> {
  const resolved = (await params) as { tag?: string };
  const tag = resolved.tag;
  if (!tag) return {};

  return {
    title: `Tag: ${tag}`,
    description: `Posts tagged “${tag}”.`,
    alternates: {
      canonical: `/blog/tags/${tag}`,
    },
  };
}

export default async function BlogTagPage({ params }: { params: unknown }) {
  const resolved = (await params) as { tag?: string };
  const tag = resolved.tag;
  if (!tag) return null;

  const posts = getPostsByTag(tag);

  return (
    <SectionShell
      eyebrow="Writing"
      title={`Tag: ${tag}`}
      description={`Posts tagged “${tag}”.`}
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="mb-8">
        <Link href="/blog" className="text-sm font-semibold underline decoration-black/30 underline-offset-4 hover:decoration-black/60">
          ← Back to Blog
        </Link>
      </div>

      <div className="grid gap-px border border-black/10 bg-black/10">
        {posts.map((post) => (
          <article key={post.slug} className="bg-white p-5 sm:p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
              {formatPostDate(post.frontmatter.date)} · {post.readingTimeMinutes} min read{post.audioSrc ? " · audio" : ""}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.frontmatter.title}
              </Link>
            </h2>
            {post.frontmatter.description ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/70">{post.frontmatter.description}</p>
            ) : null}
          </article>
        ))}

        {posts.length === 0 ? (
          <div className="bg-white p-5 sm:p-6 md:p-8">
            <p className="text-sm leading-7 text-black/70">No posts for this tag yet.</p>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
