import { getAnalisis } from "@/lib/content";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export async function GET() {
  const items = getAnalisis();

  const rssItems = items
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.frontmatter.title}]]></title>
      <description><![CDATA[${item.frontmatter.description}]]></description>
      <link>${SITE_URL}/analisis/${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/analisis/${item.slug}</guid>
      <pubDate>${new Date(item.frontmatter.pubDate).toUTCString()}</pubDate>
      <author>${item.frontmatter.author}</author>
      ${item.frontmatter.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/analisis/rss.xml" rel="self" type="application/rss+xml" />
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
