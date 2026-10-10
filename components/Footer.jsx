'use client'; // (1) neeche wala hissa — links, social, contact

// (2) Rabte ke links — ek jagah taake badalna asaan ho
const WA = 'https://wa.me/923134494915';
const EMAIL = 'hauraofficial01@gmail.com';
const INSTA = 'https://www.instagram.com/hauraofficial01';

// (3) Social icons (SVG)
const IconInsta = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconWa = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.2.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.1z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" />
  </svg>
);

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          {/* (4) Brand + social */}
          <div className="foot-brand">
            <a className="brand" href="/">
              <img src="/logo.webp" alt="H&A Aura logo" style={{ width: 52, height: 52 }} />
              <span><span className="brand-name">H&amp;A AURA</span><span className="brand-sub">IMPORTED JEWELLERY</span></span>
            </a>
            <p>Premium imported jewellery, delivered across Pakistan. Cash on Delivery, 7-day easy exchange.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              <a href={INSTA} target="_blank" rel="noopener" aria-label="Instagram" style={{ color: 'var(--gold)' }}><IconInsta /></a>
              <a href={WA} target="_blank" rel="noopener" aria-label="WhatsApp" style={{ color: 'var(--gold)' }}><IconWa /></a>
              <a href={`mailto:${EMAIL}`} aria-label="Email" style={{ color: 'var(--gold)' }}><IconMail /></a>
            </div>
          </div>
          {/* (5) Links */}
          <div>
            <h5>Shop</h5>
            <ul>
              <li><a href="/shop">All Jewellery</a></li>
              <li><a href="/shop/necklaces-pendants">Necklaces</a></li>
              <li><a href="/shop/earrings-jhumkas">Earrings</a></li>
              <li><a href="/shop/bracelets">Bracelets</a></li>
              <li><a href="/shop/rings">Rings</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h5>Help</h5>
            <ul>
              <li><a href="/shipping">Shipping &amp; COD</a></li>
              <li><a href="/returns">Returns &amp; Exchange</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 H&amp;A Aura — Imported Jewellery. All rights reserved.</span>
          <span>Designed &amp; Developed by <a href="https://zynaura.com" target="_blank" rel="noopener" className="zynaura-link">ZynAura Tech</a></span>
        </div>
      </div>
    </footer>
  );
}
