// ===== Category page — /shop/necklaces-pendants (SERVER = SEO) =====
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import { getCategories, getCategoryBySlug, getProductsByCategory, getProducts } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import { BADGES, stripHtml } from '@/components/format';

// (1) Build ke waqt har category ka page banao
export async function generateStaticParams() {
  const cats = await getCategories();
  return cats.map((c) => ({ slug: c.slug }));
}

// (2) Har category ka apna SEO title/description
export async function generateMetadata({ params }) {
  const { slug } = await params; // (Next 15+: params ab Promise hai)
  const cat = await getCategoryBySlug(slug);
  if (!cat) return { title: 'Category not found' };
  return {
    title: `${stripHtml(cat.name)} — Shop Online in Pakistan`,
    description: `Buy ${stripHtml(cat.name).toLowerCase()} online in Pakistan at H&A Aura. ${stripHtml(cat.description || 'Premium imported designs')}. Cash on Delivery.`,
    alternates: { canonical: `/shop/${cat.slug}` },
  };
}

// (3) Category page
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();
  // (4) Is category ki products + shell ke liye sari products (ek sath lao)
  const [catProducts, products] = await Promise.all([
    getProductsByCategory(cat.id),
    getProducts(),
  ]);

  return (
    <SiteShell products={products}>
      <div className="wrap">
        <PageHero
          title={<>{stripHtml(cat.name)}</>}
          subtitle={stripHtml(cat.description) || 'Premium imported designs, Cash on Delivery.'}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: stripHtml(cat.name) }]}
        />
        <div className="shop-count">{catProducts.length} products</div>
        <div className="grid" style={{ paddingBottom: 70 }}>
          {catProducts.map((p, i) => (
            <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
              <ProductCard product={p} badge={BADGES[i % BADGES.length]} delay="" />
            </a>
          ))}
        </div>
        {catProducts.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', paddingBottom: 70 }}>
            New designs are coming soon to this category. ✦
          </p>
        )}
      </div>
    </SiteShell>
  );
}
