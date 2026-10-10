// ===== Privacy Policy (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Privacy Policy',
  description: 'H&A Aura privacy policy: how your data is collected, used and kept safe.',
  alternates: { canonical: '/privacy' },
};

export default async function PrivacyPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Privacy <span className="gold-text">Policy</span></>}
        subtitle="Your trust, our responsibility."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />
      <div className="prose">
        <h2>✦ What data do we collect?</h2>
        <p>Only what's needed for your order: <b>name, phone number, email and address</b>. Nothing more.</p>
        <h2>✦ How we use it</h2>
        <ul>
          <li>To deliver and confirm your order.</li>
          <li>To contact you for exchanges or customer support.</li>
        </ul>
        <p>We <b>never sell or rent your data</b> to anyone.</p>
        <h2>✦ Cookies / local storage</h2>
        <p>Your cart stays in your own browser (localStorage) — not on our server.</p>
        <h2>✦ Payment</h2>
        <p>Currently <b>Cash on Delivery</b> — we never collect card or bank details.</p>
        <h2>✦ Contact</h2>
        <p>Privacy questions? Write to <a href="mailto:hauraofficial01@gmail.com">hauraofficial01@gmail.com</a>.</p>
      </div>
    </div>
    </SiteShell>
  );
}
