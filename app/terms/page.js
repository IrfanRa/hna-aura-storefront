// ===== Terms & Conditions (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'H&A Aura terms & conditions: orders, pricing, delivery, exchange and website usage.',
  alternates: { canonical: '/terms' },
};

export default async function TermsPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Terms &amp; <span className="gold-text">Conditions</span></>}
        subtitle="A quick read before you shop — in plain words."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />
      <div className="prose">
        <h2>✦ Products & pricing</h2>
        <p>All prices are in <b>Pakistani Rupees (PKR)</b>. Slight colour differences in photos may occur due to screens.</p>
        <h2>✦ Orders</h2>
        <ul>
          <li>After you place an order, we confirm it on WhatsApp/phone.</li>
          <li>A wrong address or phone number may delay delivery.</li>
        </ul>
        <h2>✦ Payment</h2>
        <p>Currently <b>Cash on Delivery</b> — pay when your parcel arrives. (JazzCash coming soon.)</p>
        <h2>✦ Delivery & exchange</h2>
        <p>Details are on the <a href="/shipping">Shipping</a> and <a href="/returns">Returns &amp; Exchange</a> pages — the same terms apply here.</p>
        <h2>✦ Website usage</h2>
        <p>Our images and text belong to H&amp;A Aura — please don't copy them without permission.</p>
        <h2>✦ Contact</h2>
        <p>Questions? Visit our <a href="/contact">Contact Us</a> page.</p>
      </div>
    </div>
    </SiteShell>
  );
}
