'use client'; // (1) WhatsApp banner — seedha chat khulta hai

// (2) Dukaan ka WhatsApp (Pakistan code ke sath)
const WA = 'https://wa.me/923134494915?text=Hello%20H%26A%20Aura!%20I%20want%20to%20place%20an%20order.';

// (3) "WhatsApp par order karo" wala banner
export default function ContactCTA() {
  return (
    <section id="contact" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="wa-banner reveal">
          <div className="eyebrow" style={{ marginBottom: 14 }}>✦ &nbsp;Order Directly&nbsp; ✦</div>
          <h2>Prefer <span className="gold-text">WhatsApp?</span></h2>
          <p>Send us a screenshot of your favourite piece and we'll confirm your order on chat — simple, fast, personal.</p>
          {/* (4) Asal WhatsApp link — naye tab mein khulta hai */}
          <a className="wa-btn" href={WA} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.2.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.1z" /></svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
