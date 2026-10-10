// ===== About Us — brand story (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'About Us — Our Story',
  description:
    'The H&A Aura story: premium imported jewellery in Pakistan — handpicked designs, Cash on Delivery, 7-day easy exchange and gift packaging.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Our <span className="gold-text">Story</span></>}
        subtitle="Jewellery isn't just worn — it's felt."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />
      <div className="prose">
        <h2>✦ What is H&A Aura?</h2>
        <p>
          H&amp;A Aura is built on a simple belief — <b>every woman deserves jewellery
          that makes her feel beautiful</b>, without the designer price tag.
          We bring handpicked imported jewellery from around the world: necklaces,
          jhumkas, bracelets, rings, hair catchers and baby accessories — every
          piece carefully selected and quality-checked.
        </p>
        <h2>✦ Our promise</h2>
        <ul>
          <li><b>100% imported designs</b> — every piece checked before dispatch.</li>
          <li><b>Cash on Delivery</b> — across Pakistan, no advance needed.</li>
          <li><b>7-Day Easy Exchange</b> — shop with confidence.</li>
          <li><b>Premium gift packaging</b> — every order in signature H&amp;A Aura style.</li>
        </ul>
        <h2>✦ What's next?</h2>
        <p>
          Jewellery is just the beginning — our <b>garments collection</b> is
          coming soon to this very store. The H&amp;A Aura journey is with you,
          and we want you to feel your <i>aura</i> in every moment.
        </p>
        <p>
          Questions? <a href="/contact">Contact us</a> — we'd love to hear from you.
        </p>
      </div>
    </div>
    </SiteShell>
  );
}
