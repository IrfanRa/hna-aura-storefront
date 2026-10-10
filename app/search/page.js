// ===== Search page — /search?q=ring (CLIENT: live Store API) =====
import { Suspense } from 'react';
import SiteShell from '@/components/SiteShell';
import SearchClient from '@/components/SearchClient';
import PageHero from '@/components/PageHero';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Search Products',
  description: 'Search the H&A Aura jewellery collection.',
  robots: { index: false, follow: false }, // (1) search pages Google me index na hon
};

export default async function SearchPage() {
  const products = await getProducts(); // (2) shell ke liye
  return (
    <SiteShell products={products}>
      <div className="wrap" style={{ paddingTop: 30, paddingBottom: 70 }}>
        <PageHero
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
        />
        {/* (3) useSearchParams ke liye Suspense lazmi (static export) */}
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'var(--muted)' }}>Searching…</p>}>
          <SearchClient />
        </Suspense>
      </div>
    </SiteShell>
  );
}
