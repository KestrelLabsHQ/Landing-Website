import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export type BlogFrontmatter = {
  title: string;
  date: string; // YYYY-MM-DD recommended
  updated?: string; // YYYY-MM-DD (optional)
  description?: string;
  tags?: string[];
  author?: string; // author id (see content/authors.ts)
  featured?: boolean; // pin to top of /blog
  series?: string;
  seriesOrder?: number;
  draft?: boolean;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTimeMinutes: number;
  audioSrc?: string;
};

export const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const AUDIO_DIR = path.join(process.cwd(), "public", "audio");

function assertPostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    throw new Error(`Posts directory not found: ${POSTS_DIR}`);
  }
}

export function getPostSlugs(): string[] {
  assertPostsDir();
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string): { frontmatter: BlogFrontmatter; content: string; readingTimeMinutes: number; audioSrc?: string } {
  assertPostsDir();
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const content = parsed.content;

  return {
    frontmatter: parsed.data as BlogFrontmatter,
    content,
    readingTimeMinutes: estimateReadingTimeMinutes(content),
    audioSrc: getAudioSrc(slug),
  };
}

function getAudioSrc(slug: string): string | undefined {
  const filePath = path.join(AUDIO_DIR, `${slug}.mp3`);
  return fs.existsSync(filePath) ? `/audio/${slug}.mp3` : undefined;
}

function estimateReadingTimeMinutes(text: string): number {
  // Rough heuristic: 200 words/minute.
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeTags(tags?: string[]): string[] {
  return (tags ?? [])
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.toLowerCase());
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const { frontmatter, readingTimeMinutes, audioSrc } = getPostBySlug(slug);

    // normalize tags for routing
    frontmatter.tags = normalizeTags(frontmatter.tags);

    return { slug, frontmatter, readingTimeMinutes, audioSrc };
  });

  const published = posts.filter((p) => !p.frontmatter.draft);

  // Featured first, then newest first.
  // For equal dates, keep series posts together (by seriesOrder), then fall back to slug.
  published.sort((a, b) => {
    const af = a.frontmatter.featured ? 1 : 0;
    const bf = b.frontmatter.featured ? 1 : 0;
    if (af !== bf) return bf - af;

    if (a.frontmatter.date !== b.frontmatter.date) {
      return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
    }

    const aSeries = (a.frontmatter.series ?? "").trim();
    const bSeries = (b.frontmatter.series ?? "").trim();

    // If one is part of a series and the other isn't, keep series posts first.
    if (!!aSeries !== !!bSeries) return aSeries ? -1 : 1;

    // If both are in the same series, order by seriesOrder.
    if (aSeries && bSeries && aSeries.toLowerCase() === bSeries.toLowerCase()) {
      const ao = a.frontmatter.seriesOrder;
      const bo = b.frontmatter.seriesOrder;
      if (typeof ao === "number" && typeof bo === "number" && ao !== bo) return bo - ao;
      if (typeof ao === "number" && typeof bo !== "number") return -1;
      if (typeof ao !== "number" && typeof bo === "number") return 1;
    }

    return a.slug.localeCompare(b.slug);
  });

  return published;
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags ?? []) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string): BlogPost[] {
  const t = tag.toLowerCase();
  return getAllPosts().filter((p) => (p.frontmatter.tags ?? []).includes(t));
}

export function formatPostDate(date: string): string {
  // Avoid time-zone surprises by forcing UTC.
  const d = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit", timeZone: "UTC" }).format(d);
}

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function extractToc(markdown: string): TocItem[] {
  // Strip fenced code blocks to avoid picking up headings inside them.
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");

  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  const lines = withoutCode.split("\n");
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.*)$/.exec(line.trim());
    if (!m) continue;

    const level = m[1].length as 2 | 3;
    const text = m[2].replace(/\s+#+\s*$/, "").trim();
    if (!text) continue;

    items.push({
      level,
      text,
      id: slugger.slug(text),
    });
  }

  return items;
}

export function getPostsBySeries(series: string): BlogPost[] {
  const s = series.trim().toLowerCase();

  const posts = getAllPosts().filter((p) => (p.frontmatter.series ?? "").trim().toLowerCase() === s);

  // Sort by seriesOrder (desc) if present (most recent first), otherwise by date (desc).
  posts.sort((a, b) => {
    const ao = a.frontmatter.seriesOrder;
    const bo = b.frontmatter.seriesOrder;
    if (typeof ao === "number" && typeof bo === "number" && ao !== bo) return bo - ao;
    if (typeof ao === "number" && typeof bo !== "number") return -1;
    if (typeof ao !== "number" && typeof bo === "number") return 1;
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });

  return posts;
}
