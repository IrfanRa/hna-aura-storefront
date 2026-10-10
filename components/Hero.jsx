'use client'; // (1) static hissa hai — koi click nahi, phir bhi client khandan ka fard

// (2) Chamakte sitare ki jaghein (design ke liye)
const SPARKS = [
  { top: '18%', left: '12%', d: '0s' }, { top: '32%', left: '84%', d: '1.2s' },
  { top: '64%', left: '8%', d: '2.1s' }, { top: '74%', left: '90%', d: '.6s' },
  { top: '22%', left: '64%', d: '2.8s' }, { top: '52%', left: '26%', d: '3.6s' },
  { top: '82%', left: '48%', d: '1.7s' }, { top: '40%', left: '44%', d: '4.2s' },
];

// (3) Sab se upar wala bara banner — LCP ke liye logo foran load ho
export default function Hero() {
  return (
    <header className="hero" id="home">
      {SPARKS.map((s, i) => (
        <span key={i} className="spark" style={{ top: s.top, left: s.left, animationDelay: s.d }}></span>
      ))}
      <div className="wrap hero-in">
        {/* (4) fetchPriority high = sab se pehle ye tasveer lao (LCP) */}
        <img className="hero-logo" src="/logo.webp" alt="H&A Aura — Imported Jewellery in Pakistan" fetchPriority="high" />
        <div className="eyebrow">Imported Jewellery · Pakistan</div>
        <h1>Wear Your <span className="gold-text">Aura</span>,<br />Own Every Moment</h1>
        <p>Handpicked imported jewellery — necklaces, jhumkas, bangles, rings &amp; more, delivered to your doorstep with cash on delivery across Pakistan.</p>
        <div className="cta-row">
          <a href="/shop" className="btn btn-gold">Shop Collection</a>
          <a href="/about" className="btn btn-ghost">Our Story</a>
        </div>
      </div>
    </header>
  );
}
