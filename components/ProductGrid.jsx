'use client'; // Load More ke button ka click yahan handle hota hai

import { useState } from 'react';
import ProductCard from './ProductCard';
import { BADGES } from './format';

// Ek dafa mein kitni products dikhayen — baqi Load More se khulti hain
const PAGE_SIZE = 20;

// Products ki grid + Load More button — shop aur category, dono pages istemal karte hain.
// NOTE: Sari products HTML mein rehti hain (SEO ke liye lazmi) — button koi data load NAHI karta,
// sirf pehle se mojood cards ko ek ek karke dikhata hai. Is liye dabate hi foran khul jati hain,
// aur reveal animation wala system (jo mount par sab ko observe kar leta hai) bhi kharab nahi hota.
export default function ProductGrid({ products = [] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const total = products.length;
  const hasMore = visible < total;

  return (
    <>
      <div className="grid" style={{ paddingBottom: hasMore ? 26 : 70 }}>
        {products.map((p, i) => (
          <a
            key={p.id}
            href={`/product/${p.slug}`}
            style={{ textDecoration: 'none', display: i < visible ? undefined : 'none' }}
          >
            <ProductCard
              product={p}
              badge={BADGES[i % BADGES.length]}
              delay={i % 4 === 1 ? 'd1' : i % 4 === 2 ? 'd2' : i % 4 === 3 ? 'd3' : ''}
            />
          </a>
        ))}
      </div>
      {hasMore && (
        <div style={{ textAlign: 'center', paddingBottom: 70 }}>
          <button type="button" className="btn btn-gold" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load More
          </button>
          <div style={{ marginTop: 12, color: 'var(--muted)', fontSize: 14 }}>
            Showing {Math.min(visible, total)} of {total} products
          </div>
        </div>
      )}
    </>
  );
}
