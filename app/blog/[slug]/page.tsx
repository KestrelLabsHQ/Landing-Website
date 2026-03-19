import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { SectionShell } from "@/components/section-shell";
import { mdxComponents } from "@/components/mdx-components";
import Link from "next/link";
import { BlogAuthorCard } from "@/components/blog-author-card";
import { BlogAudioPlayer } from "@/components/blog-audio-player";
import { BlogToc } from "@/components/blog-toc";
import { BlogSeries } from "@/components/blog-series";
import { authors, defaultAuthor } from "@/content/authors";
import { extractToc, formatPostDate, getAllPosts, getPostBySlug, getPostSlugs, getPostsBySeries } from "@/lib/blog";

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  return getPostSlugs().map((slug) => ({ slug }));
}

async function resolveParams(params: unknown): Promise<{ slug?: string }> {
  // Some Next.js versions/type configs model params as a Promise.
  // This makes the route resilient either way.
  return (await params) as { slug?: string };
}

export async function generateMetadata({ params }: { params: unknown }): Promise<Metadata> {
  const resolved = await resolveParams(params);
  const slug = resolved.slug;
  if (!slug) return {};

  const { frontmatter } = getPostBySlug(slug);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: unknown }) {
  const resolved = await resolveParams(params);
  const slug = resolved.slug;
  if (!slug) {
    // Shouldn't happen, but prevents a hard build failure with opaque errors.
    return null;
  }

  const { frontmatter, content, readingTimeMinutes, audioSrc } = getPostBySlug(slug);

  const author = (frontmatter.author && authors[frontmatter.author]) ? authors[frontmatter.author] : defaultAuthor;

  const toc = extractToc(content);
  const seriesPosts = frontmatter.series ? getPostsBySeries(frontmatter.series) : [];

  const ordered = getAllPosts();
  const index = ordered.findIndex((p) => p.slug === slug);
  const prev = index >= 0 ? ordered[index + 1] : undefined;
  const next = index > 0 ? ordered[index - 1] : undefined;

  return (
    <SectionShell
      eyebrow={`${formatPostDate(frontmatter.date)} · ${readingTimeMinutes} min read`}
      title={frontmatter.title}
      description={frontmatter.description ?? ""}
      className="min-h-[calc(100svh-8rem)]"
    >
      <article className="border border-black/10 bg-white p-5 sm:p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-black/55">
          <span>Published {formatPostDate(frontmatter.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTimeMinutes} min read</span>
          {frontmatter.updated ? (
            <>
              <span aria-hidden="true">·</span>
              <span>Updated {formatPostDate(frontmatter.updated)}</span>
            </>
          ) : null}
        </div>

        {audioSrc ? <BlogAudioPlayer src={audioSrc} title={frontmatter.title} /> : null}

        {frontmatter.series ? (
          <BlogSeries name={frontmatter.series} posts={seriesPosts} currentSlug={slug} />
        ) : null}

        {toc.length >= 2 ? <BlogToc items={toc} /> : null}

        {(frontmatter.tags?.length ?? 0) > 0 ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {frontmatter.tags!.map((tag) => (
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

        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
            },
          }}
        />

        <BlogAuthorCard author={author} />

        <div className="mt-10 border-t border-black/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav className="grid gap-2">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="text-sm font-semibold underline decoration-black/30 underline-offset-4 hover:decoration-black/60"
                >
                  ← {prev.frontmatter.title}
                </Link>
              ) : null}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="text-sm font-semibold underline decoration-black/30 underline-offset-4 hover:decoration-black/60"
                >
                  {next.frontmatter.title} →
                </Link>
              ) : null}
            </nav>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-black/15 bg-white px-4 py-2 text-sm font-semibold hover:bg-neutral-50"
              >
                Get updates / get in touch
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SectionShell>
  );
}
