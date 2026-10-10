// ===== Product detail — /product/aurelia-gold-pendant-set (SERVER = SEO) =====
import { notFound } from 'next/navigation';
import { getProducts, getProductBySlug, getProductsByCategory, getProductVariations, getProductReviews } from '@/lib/woocommerce';
import ProductDetail from '@/components/ProductDetail';
import RelatedProducts from '@/components/RelatedProducts';
import PageHero from '@/components/PageHero';
import JsonLd from '@/components/JsonLd';
import { stripHtml } from '@/components/format';
import SiteShell from '@/components/SiteShell';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://palegoldenrod-fish-444596.hostingersite.com';

// (1) Build ke waqt har product ka page banao
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// (2) Har product ka apna SEO title + description + share image
export async function generateMetadata({ params }) {
  const { slug } = await params; // (Next 15+: params ab Promise hai)
  const p = await getProductBySlug(slug);
  if (!p) return { title: 'Product not found' };
  const desc = stripHtml(p.short_description || p.description || '').slice(0, 155) ||
    `${stripHtml(p.name)} — buy online in Pakistan at H&A Aura. Cash on Delivery.`;
  return {
    title: stripHtml(p.name),
    description: desc,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      title: stripHtml(p.name),
      description: desc,
      images: p.images?.[0]?.src ? [p.images[0].src] : ['/logo.webp'],
      type: 'website',
    },
  };
}

// (3) Product page
export default async function ProductPage({ params }) {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  // (4) Usi category ke 4 aur products (related)
  const catId = p.categories?.[0]?.id;
  let related = [];
  if (catId) {
    const all = await getProductsByCategory(catId);
    related = all.filter((x) => x.id !== p.id).slice(0, 4);
  }

  // (4b) Variations (size/colour) + approved reviews — build ke waqt
  const [variations, reviews] = await Promise.all([
    p.type === 'variable' ? getProductVariations(p.id) : Promise.resolve([]),
    getProductReviews(p.id),
  ]);

  // (5) Google Product structured data (rich results ke liye)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stripHtml(p.name),
    image: (p.images || []).map((i) => i.src),
    description: stripHtml(p.short_description || p.description || ''),
    sku: String(p.id),
    brand: { '@type': 'Brand', name: 'H&A Aura' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${p.slug}`,
      priceCurrency: 'PKR',
      price: p.price,
      availability:
        p.stock_status === 'instock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  const cat = p.categories?.[0];

  return (
    <SiteShell products={products}>
    <div className="wrap">
      <div style={{ paddingTop: 40 }}>
        <PageHero
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            ...(cat ? [{ label: stripHtml(cat.name), href: `/shop/${cat.slug}` }] : []),
            { label: stripHtml(p.name) },
          ]}
        />
      </div>
      <ProductDetail product={p} variations={variations} reviews={reviews} />
      <RelatedProducts products={related} />
      <JsonLd data={jsonLd} />
    </div>
    </SiteShell>
  );
}
