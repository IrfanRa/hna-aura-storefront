// ===== sitemap.xml — Google ko site ka naksha (technical SEO) =====
// Build ke waqt chalta hai: static pages + sari products + sari categories.

import { getProducts, getCategories } from '@/lib/woocommerce';

// (0) Static export ke liye lazmi — build par hi banao
export const dynamic = 'force-static';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://palegoldenrod-fish-444596.hostingersite.com';

export default async function sitemap() {
  // (1) Hamesha rehne wale pages (checkout noindex hai — sitemap me nahi)
  const staticPages = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/privacy',
    '/terms',
  ].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '' ? 'daily' : 'monthly',
    priority: p === '' ? 1 : p === '/shop' ? 0.9 : 0.6,
  }));

  // (2) Products + categories — kuch na mile to khaali list (build na ruke)
  let products = [];
  let categories = [];
  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    /* API down ho to sirf static pages ka sitemap */
  }

  const productPages = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: new Date(p.modified || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${SITE_URL}/shop/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
