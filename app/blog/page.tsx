import Link from "next/link";
import { SectionShell } from "@/components/section-shell";
import { BlogSubscribeCta } from "@/components/blog-subscribe-cta";
import { formatPostDate, getAllPosts, getAllTags } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description: "Notes, writeups, and updates from Kestrel Labs.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const featured = posts.filter((p) => p.frontmatter.featured);
  const rest = posts.filter((p) => !p.frontmatter.featured);

  return (
    <SectionShell
      eyebrow="Writing"
      title="Blog"
      description="Short notes, longer essays, and practical writeups from Kestrel Labs."
      className="min-h-[calc(100svh-8rem)]"
    >
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Link
          href="/rss.xml"
          className="rounded-full border border-black/12 bg-white px-3 py-1 text-xs font-semibold text-black/70 hover:bg-neutral-50"
        >
          RSS
        </Link>

        {tags.length ? (
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
          </div>
        ) : null}
      </div>

      {featured.length ? (
        <div className="mb-8 grid gap-px border border-black/10 bg-black/10">
          {featured.map((post) => (
            <article key={post.slug} className="bg-white p-5 sm:p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45 sm:text-xs sm:tracking-[0.24em]">
                Featured · {formatPostDate(post.frontmatter.date)} · {post.readingTimeMinutes} min read{post.audioSrc ? " · audio" : ""}
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
        </div>
      ) : null}

      <div className="grid gap-px border border-black/10 bg-black/10">
        {rest.map((post) => (
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
            <p className="text-sm leading-7 text-black/70">No posts yet.</p>
          </div>
        ) : null}
      </div>

      <BlogSubscribeCta />
    </SectionShell>
  );
}
