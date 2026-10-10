// ===== Shop — sari products + category chips (SERVER = SEO) =====
import { getProducts, getCategories } from '@/lib/woocommerce';
import ProductCard from '@/components/ProductCard';
import PageHero from '@/components/PageHero';
import { BADGES } from '@/components/format';
import SiteShell from '@/components/SiteShell';

export const metadata = {
  title: 'Shop All Jewellery',
  description:
    'Browse the full H&A Aura collection — necklaces, jhumkas, bracelets, rings, hair catchers & baby accessories. Cash on Delivery across Pakistan.',
  alternates: { canonical: '/shop' },
};

// (1) Build par products + categories lao
export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Shop <span className="gold-text">All Jewellery</span></>}
        subtitle="Every category — in one place. Add what you love to the cart."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shop' }]}
      />

      {/* (2) Category chips — har ek apne static page par le jata hai */}
      <div className="shop-chips reveal">
        <a href="/shop" className="chip active">All</a>
        {categories.map((c) => (
          <a key={c.id} href={`/shop/${c.slug}`} className="chip">{c.name}</a>
        ))}
      </div>

      <div className="shop-count">{products.length} products</div>

      {/* (3) Product grid */}
      <div className="grid" style={{ paddingBottom: 70 }}>
        {products.map((p, i) => (
          <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
            <ProductCard
              product={p}
              badge={BADGES[i % BADGES.length]}
              delay={i % 4 === 1 ? 'd1' : i % 4 === 2 ? 'd2' : i % 4 === 3 ? 'd3' : ''}
            />
          </a>
        ))}
      </div>
    </div>
    </SiteShell>
  );
}
