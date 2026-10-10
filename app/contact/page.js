// ===== Contact Us (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import ContactWhatsApp from '@/components/ContactWhatsApp';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'Contact Us',
  description:
    'Contact H&A Aura — WhatsApp, email or Instagram. Orders, exchanges or questions — we reply fast.',
  alternates: { canonical: '/contact' },
};

const WA = 'https://wa.me/923134494915';

export default async function ContactPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Contact <span className="gold-text">Us</span></>}
        subtitle="Questions, orders or exchanges — we're right here."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />
      <div className="contact-grid">
        {/* (1) Rabte ke tareeqe */}
        <div className="contact-card">
          <h3>Get in Touch</h3>
          <div className="contact-row">
            <span>✦</span>
            <span>WhatsApp: <a href={WA} target="_blank" rel="noopener">0313 4494915</a></span>
          </div>
          <div className="contact-row">
            <span>✦</span>
            <span>Email: <a href="mailto:hauraofficial01@gmail.com">hauraofficial01@gmail.com</a></span>
          </div>
          <div className="contact-row">
            <span>✦</span>
            <span>Instagram: <a href="https://www.instagram.com/hauraofficial01" target="_blank" rel="noopener">@hauraofficial01</a></span>
          </div>
          <a href={WA} target="_blank" rel="noopener" className="btn btn-gold" style={{ marginTop: 18, display: 'inline-block' }}>
            Chat on WhatsApp
          </a>
        </div>

        {/* (2) Form — WhatsApp par bhejta hai */}
        <div className="contact-card">
          <h3>Send a Message</h3>
          <ContactWhatsApp />
        </div>
      </div>
    </div>
    </SiteShell>
  );
}
