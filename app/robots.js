// ===== robots.txt — search engines ke liye hidayat (technical SEO) =====

// (0) Static export ke liye lazmi — build par hi banao
export const dynamic = 'force-static';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://hnaura.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout'], // (1) checkout page Google mein na aaye
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`, // (2) sitemap ka pata
  };
}
