// ===== FAQ (SERVER = SEO) =====
import PageHero from '@/components/PageHero';
import FaqAccordion from '@/components/FaqAccordion';
import JsonLd from '@/components/JsonLd';
import SiteShell from '@/components/SiteShell';
import { getProducts } from '@/lib/woocommerce';

export const metadata = {
  title: 'FAQs — Questions & Answers',
  description:
    'H&A Aura FAQs: Cash on Delivery, delivery time, 7-day exchange, payment methods and how to order.',
  alternates: { canonical: '/faq' },
};

// (1) Common questions — straight answers for SEO
const FAQS = [
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! Cash on Delivery is available across Pakistan. Pay when your order arrives at your doorstep — no advance payment needed.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are dispatched within 24–48 hours and delivered in 3–5 working days. Delivery charges are a flat PKR 250.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Currently Cash on Delivery. JazzCash is coming soon — follow us on Instagram for updates.',
  },
  {
    q: 'What is your exchange/return policy?',
    a: 'Easy 7-day exchange — the piece must be unworn and in its original packaging. Send your order number on WhatsApp to request an exchange.',
  },
  {
    q: 'Is the jewellery really imported?',
    a: 'Yes, all our designs are imported and every piece is quality-checked before dispatch.',
  },
  {
    q: 'How can I track my order?',
    a: 'After dispatch you receive a tracking number on WhatsApp/SMS. For any issue, contact us at 0313 4494915.',
  },
  {
    q: 'Does it come with gift packaging?',
    a: 'Yes! Every order arrives in H&A Aura signature premium gift packaging — perfect for gifting.',
  },
  {
    q: 'When is the garments collection launching?',
    a: 'Soon! Our garments collection will launch right here in this store. Follow @hauraofficial01 on Instagram for the first announcement.',
  },
];

export default async function FaqPage() {
  const products = await getProducts(); // (SiteShell: cart drawer ke liye keematein)
  // (2) Google FAQ rich results ke liye structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <SiteShell products={products}>
    <div className="wrap">
      <PageHero
        title={<>Frequently Asked <span className="gold-text">Questions</span></>}
        subtitle="Answers to common questions — contact us if you need anything else."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]}
      />
      <FaqAccordion items={FAQS} />
      <JsonLd data={jsonLd} />
    </div>
    </SiteShell>
  );
}
