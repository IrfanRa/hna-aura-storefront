'use client'; // (1) customer ki raaye wala hissa

// (2) ★ DEMO testimonial — client ke asal review se replace karna hai ★
const DEMO = {
  text: 'My pendant set arrived in beautiful packaging — the quality exceeded my expectations. Cash on Delivery made buying so easy!',
  name: 'Ayesha K. — Lahore',
};

export default function Testimonials() {
  return (
    <section className="testi">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">✦ &nbsp;Customer Love&nbsp; ✦</div>
          <h2>What Our <span className="gold-text">Customers Say</span></h2>
        </div>
        {/* (3) Demo review — bad mein asal reviews aayenge */}
        <div className="testi-card reveal">
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">“{DEMO.text}”</p>
          <div className="testi-name">{DEMO.name.toUpperCase()} · VERIFIED BUYER (DEMO)</div>
        </div>
      </div>
    </section>
  );
}
