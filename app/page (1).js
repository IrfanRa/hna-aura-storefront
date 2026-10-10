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

// (1) Darwaza: build par products lao, shell + sections ko thama do.
//     Agar WooCommerce se rabta na ho sake to 500 crash ki bajaye
//     user ko tameez wala paigham dikhao.
export default async function Home() {
  let products = [];
  let storeDown = false;
  try {
    products = await getProducts();
  } catch (e) {
    storeDown = true;
  }
  return (
    <SiteShell products={products}>
      {storeDown ? (
        <div className="wrap" style={{ padding: '90px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🛠️</div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(30px, 5vw, 42px)',
              marginBottom: 12,
            }}
          >
            We'll be right <span className="gold-text">back</span>
          </h1>
          <p style={{ color: 'var(--muted)', maxWidth: 480, margin: '0 auto 10px' }}>
            Our jewellery collection couldn't be loaded right now. Please check your
            connection and refresh the page.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>
            You can also order directly on{' '}
            <a
              href="https://wa.me/923134494915"
              target="_blank"
              rel="noopener"
              style={{ color: 'var(--gold)' }}
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      ) : (
        <Storefront products={products} />
      )}
    </SiteShell>
  );
}
