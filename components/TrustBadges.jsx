'use client'; // (1) Bharose wali patti — home + product page par

// (2) 4 bharosa points — emoji icons ke sath
const ITEMS = [
  { e: '🔒', t: 'Secure Checkout', d: '256-bit encrypted' },
  { e: '💵', t: 'Cash on Delivery', d: 'Pay at your doorstep' },
  { e: '↩️', t: '7-Day Easy Exchange', d: 'No questions asked' },
  { e: '🛡️', t: 'Quality Checked', d: 'Inspected before dispatch' },
];

// (3) compact = product page ke liye chhota version
export default function TrustBadges({ compact = false }) {
  return (
    <div className={compact ? 'trust trust-compact' : 'trust'}>
      {ITEMS.map((it) => (
        <div key={it.t} className="trust-item">
          <span className="trust-e">{it.e}</span>
          <div className="trust-t">
            <b>{it.t}</b>
            <span>{it.d}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
