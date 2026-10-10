'use client'; // (1) chalti patti — sirf dikhawa

// Har item ke sath relevant emoji — colorful aur readable
const TICKER = [
  { e: '🌍', t: '100% Imported' },
  { e: '💵', t: 'Cash on Delivery' },
  { e: '🎁', t: 'Premium Packaging' },
  { e: '🔄', t: '7-Day Easy Exchange' },
  { e: '✨', t: 'New Designs Weekly' },
];

// (2) Neeche chalti hui patti — list do dafa taake gol ghoome
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...TICKER, ...TICKER].map((it, i) => (
          <span key={i}><span className="tick-e">{it.e}</span>{it.t}</span>
        ))}
      </div>
    </div>
  );
}
