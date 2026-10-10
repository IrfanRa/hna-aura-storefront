// ===== Home page — SERVER component =====
// Build ke waqt products WooCommerce se aate hain = Google ko poora content milta hai (SEO).

import SiteShell from '@/components/SiteShell';
import Storefront from '@/components/Storefront';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Imported Jewellery in Pakistan | Cash on Delivery',
  description:
    'H&A Aura — premium imported jewellery: necklaces, jhumkas, bracelets, rings & hair accessories. Cash on Delivery across Pakistan, 7-day easy exchange.',
  alternates: { canonical: '/' },
};

// (1) Darwaza: build par products lao, shell + sections ko thama do
export default async function Home() {
  const products = await getProducts();
  return (
    <SiteShell products={products}>
      <Storefront products={products} />
    </SiteShell>
  );
}
