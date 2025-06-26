
export const generateRSSFeed = (posts: any[]) => {
  const siteUrl = window.location.origin;
  const rssItems = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ArahKaii Journal</title>
    <description>Latest fashion insights and designer stories from ArahKaii marketplace</description>
    <link>${siteUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;
};

export const generateJSONFeed = (posts: any[]) => {
  const siteUrl = window.location.origin;
  
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "ArahKaii Journal",
    description: "Latest fashion insights and designer stories from ArahKaii marketplace",
    home_page_url: `${siteUrl}/blog`,
    feed_url: `${siteUrl}/blog/feed.json`,
    items: posts.map(post => ({
      id: `${siteUrl}/blog/${post.slug}`,
      url: `${siteUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content,
      summary: post.excerpt,
      date_published: post.published_at,
      image: post.featured_image_url
    }))
  };
};
