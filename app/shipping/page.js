// ===== Shipping & Delivery policy (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Shipping & Delivery',
  description:
    'H&A Aura delivery policy: PKR 250 flat delivery, 3–5 working days, Cash on Delivery across Pakistan.',
  alternates: { canonical: '/shipping' },
};

export default async function ShippingPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Shipping &amp; <span className="gold-text">Delivery</span></>}
        subtitle="Your order, at your doorstep — simple and secure."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shipping & Delivery' }]}
      />
      <div className="prose">
        <h2>✦ Delivery charges</h2>
        <p>Flat <b>PKR 250</b> delivery charges across Pakistan — whether it's one piece or ten.</p>
        <h2>✦ How long will it take?</h2>
        <ul>
          <li><b>Dispatch:</b> within 24–48 hours of ordering.</li>
          <li><b>Delivery:</b> 3–5 working days (depending on your city).</li>
          <li>After dispatch you receive a <b>tracking number</b> on WhatsApp/SMS.</li>
        </ul>
        <h2>✦ Cash on Delivery</h2>
        <p>Pay the rider when your parcel arrives — no advance payment. (JazzCash coming soon.)</p>
        <h2>✦ Good to know</h2>
        <ul>
          <li>Every parcel is sent in <b>premium gift packaging</b>.</li>
          <li>A wrong address or switched-off phone can send the parcel back — please double-check your details when ordering.</li>
          <li>For any issue, WhatsApp us at <b>0313 4494915</b>.</li>
        </ul>
      </div>
    </div>
    </SiteShell>
  );
}
