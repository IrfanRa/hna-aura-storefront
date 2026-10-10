// ===== Returns & Exchange policy (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Returns & Exchange',
  description:
    'H&A Aura 7-day easy exchange policy: unworn pieces, original packaging — request an exchange on WhatsApp.',
  alternates: { canonical: '/returns' },
};

export default async function ReturnsPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Returns &amp; <span className="gold-text">Exchange</span></>}
        subtitle="Shop worry-free — 7-day easy exchange."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Returns & Exchange' }]}
      />
      <div className="prose">
        <h2>✦ 7-Day Easy Exchange</h2>
        <p>
          Within <b>7 days</b> of receiving your parcel you can exchange a piece —
          with just two conditions:
        </p>
        <ul>
          <li>The piece is <b>unworn</b>.</li>
          <li>Send it back in its <b>original packaging</b>.</li>
        </ul>
        <h2>✦ How do I exchange?</h2>
        <ul>
          <li>Send your <b>order number</b> on WhatsApp <b>0313 4494915</b>.</li>
          <li>Send the name/screenshot of the new piece.</li>
          <li>We'll confirm the exchange and send the new piece.</li>
        </ul>
        <h2>✦ Damaged or defective piece?</h2>
        <p>
          If your piece arrived damaged, contact us within <b>48 hours</b> with a
          photo — we'll send a replacement right away, no questions asked.
        </p>
        <h2>✦ Note</h2>
        <p>
          Sale items can also be exchanged, but there are <b>no refunds for now</b> —
          only exchange or store credit. This policy keeps getting better over time.
        </p>
      </div>
    </div>
    </SiteShell>
  );
}
