'use client'; // (1) sirf dikhawa — categories ki jhalak

// (2) Collections — /shop aur category pages ke links
export default function Collections({ products = [] }) {
  const jewelImg = products[0]?.images?.[0]?.src || '/logo.webp';
  const garmImg = products[2]?.images?.[0]?.src || '/logo.webp';

  return (
    <section id="collections" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">✦ &nbsp;Collections&nbsp; ✦</div>
          <h2>Curated <span className="gold-text">For You</span></h2>
          <p>Something special for every mood.</p>
        </div>
        <div className="cols">
          <div className="col-card reveal">
            <img src={jewelImg} alt="Imported jewellery collection" loading="lazy" />
            <div className="col-body">
              <span className="tag">Live Now</span>
              <h3>Imported Jewellery</h3>
              <p>Necklaces, jhumkas, bracelets, rings — timeless pieces imported for the modern you.</p>
              <a href="/shop" className="btn btn-gold" style={{ padding: '14px 36px' }}>Shop Now</a>
            </div>
          </div>
          <div className="col-card locked reveal d1">
            <img src={garmImg} alt="Garments collection coming soon" loading="lazy" />
            <div className="col-body">
              <span className="tag">Coming Soon</span>
              <h3>Garments</h3>
              <p>Premium eastern &amp; western wear — launching soon in this very store.</p>
              <span className="soon">✦ &nbsp;Launching Soon&nbsp; ✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
