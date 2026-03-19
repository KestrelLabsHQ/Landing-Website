import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const SITE_URL = "https://kestrellabshq.com";

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = getAllPosts();

  const items = (await Promise.all(
    posts.map(async (p) => {
      const { content } = getPostBySlug(p.slug);
      const url = `${SITE_URL}/blog/${p.slug}`;
      const title = escapeXml(p.frontmatter.title);
      const description = escapeXml(p.frontmatter.description ?? "");
      const pubDate = new Date(`${p.frontmatter.date}T00:00:00Z`).toUTCString();

      const html = String(
        await remark()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeStringify, { allowDangerousHtml: true })
          .process(content)
      );

      return `
<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <pubDate>${pubDate}</pubDate>
  <description>${description}</description>
  <content:encoded><![CDATA[${html}]]></content:encoded>
</item>`;
    })
  )).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Kestrel Labs</title>
    <link>${SITE_URL}</link>
    <description>Notes, writeups, and updates from Kestrel Labs.</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
