'use client'; // (1) grid ka khandan — Card client hai

import ProductCard from './ProductCard';
import { BADGES } from './format';

// (2) Home page ka "Shop The Collection" hissa — products page.js se props mein aate hain
export default function ShopSection({ products = [] }) {
  const show = products.slice(0, 4); // (3) home par sirf 4 jhalak

  return (
    <section id="shop">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="eyebrow">✦ &nbsp;Live from WooCommerce&nbsp; ✦</div>
          <h2>Shop <span className="gold-text">The Collection</span></h2>
          <p>Handpicked imported pieces — a glimpse here, the full store ahead.</p>
        </div>
        <div className="grid">
          {/* (4) Har product ke liye ek Card (card khud product page ka link hai) */}
          {show.map((p, i) => (
            <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
              <ProductCard
                product={p}
                badge={BADGES[i % BADGES.length]}
                delay={i === 1 ? 'd1' : i === 2 ? 'd2' : i === 3 ? 'd3' : ''}
              />
            </a>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <a href="/shop" className="btn btn-gold">View All Products</a>
        </div>
      </div>
    </section>
  );
}
