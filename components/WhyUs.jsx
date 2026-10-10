'use client'; // (1) "hum par bharosa kyun" wale 4 dabbe

// (2) Har dabbe ka icon (SVG), unwan aur wazahat — list mein taake code chhota rahe
const ITEMS = [
  { t: '100% Imported', d: 'Genuine imported designs, quality-checked piece by piece before dispatch.',
    icon: <><path d="M6 3h12l4 6-10 12L2 9z" /><path d="M2 9h20M9 3l3 6 3-6M12 9l0 12" /></> },
  { t: 'Cash on Delivery', d: 'Pay at your doorstep — trusted nationwide delivery, no advance needed.',
    icon: <><path d="M1 8h13v9H1zM14 11h4l4 4v2h-8z" /><circle cx="6" cy="19" r="1.8" /><circle cx="18" cy="19" r="1.8" /></> },
  { t: '7-Day Exchange', d: 'Changed your mind? Easy 7-day exchange on all unworn pieces.',
    icon: <><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></> },
  { t: 'Gift Packaging', d: 'Every order arrives in signature H&A Aura premium gift packaging.',
    icon: <><rect x="3" y="8" width="18" height="4" /><path d="M5 12v8h14v-8M12 8v12M12 8c-4 0-5-2-5-3.5C7 3 8 2 9.5 2 11 2 12 8 12 8zm0 0c4 0 5-2 5-3.5C17 3 16 2 14.5 2 13 2 12 8 12 8z" /></> },
];

export default function WhyUs() {
  return (
    <section className="why" id="why">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">✦ &nbsp;Why H&amp;A Aura&nbsp; ✦</div>
          <h2>Shop With <span className="gold-text">Confidence</span></h2>
        </div>
        <div className="why-grid">
          {/* (3) List par map — ek design, 4 dabbe */}
          {ITEMS.map((it, i) => (
            <div key={it.t} className={`why-item reveal ${i ? 'd' + i : ''}`}>
              <svg viewBox="0 0 24 24">{it.icon}</svg>
              <h4>{it.t}</h4><p>{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
