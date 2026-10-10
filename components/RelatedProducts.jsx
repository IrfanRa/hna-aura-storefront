'use client'; // (1) "ye bhi dekho" wala hissa

import ProductCard from './ProductCard';
import { BADGES } from './format';

// (2) Props: products (4 tak) — khaali hon to kuch na dikhao
export default function RelatedProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <section style={{ paddingBottom: 70 }}>
      <div className="sec-head reveal">
        <div className="eyebrow">✦ &nbsp;You May Also Like&nbsp; ✦</div>
        <h2>Related <span className="gold-text">Pieces</span></h2>
      </div>
      <div className="grid">
        {products.map((p, i) => (
          <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
            <ProductCard product={p} badge={BADGES[i % BADGES.length]} delay="" />
          </a>
        ))}
      </div>
    </section>
  );
}
