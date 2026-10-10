'use client'; // (1) Search results — Store API se live

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';
import { BADGES } from './format';

// (2) Store API ki keemat (minor units) -> v3 jaisi shape taake ProductCard chale
function mapStoreProduct(p) {
  const unit = Math.pow(10, p.prices?.currency_minor_unit ?? 2);
  const price = Number(p.prices?.price || 0) / unit;
  const regular = Number(p.prices?.regular_price || 0) / unit;
  const sale = p.prices?.sale_price ? Number(p.prices.sale_price) / unit : '';
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    type: p.type || 'simple',
    price: String(price),
    regular_price: String(regular),
    sale_price: sale === '' ? '' : String(sale),
    images: p.images || [],
    categories: p.categories || [],
  };
}

// (3) /search?q=... — query se live products
export default function SearchClient() {
  const q = useSearchParams().get('q') || '';
  const [items, setItems] = useState(null); // null = loading

  useEffect(() => {
    const WC = process.env.NEXT_PUBLIC_WC_URL;
    if (!WC || !q.trim()) { setItems([]); return; }
    setItems(null);
    fetch(`${WC}/wp-json/wc/store/v1/products?search=${encodeURIComponent(q.trim())}&per_page=24`)
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => setItems(Array.isArray(list) ? list.map(mapStoreProduct) : []))
      .catch(() => setItems([]));
  }, [q]);

  return (
    <>
      <div className="sec-head" style={{ marginBottom: 40 }}>
        <div className="eyebrow">✦ &nbsp;Search&nbsp; ✦</div>
        <h2>Results for <span className="gold-text">“{q}”</span></h2>
        {items && <p>{items.length} product{items.length === 1 ? '' : 's'} found</p>}
      </div>
      {items === null && <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Searching…</p>}
      {items !== null && items.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
          Nothing found for “{q}”. Try “ring”, “necklace” or “jhumka”.
        </p>
      )}
      {items !== null && items.length > 0 && (
        <div className="grid">
          {items.map((p, i) => (
            <a key={p.id} href={`/product/${p.slug}`} style={{ textDecoration: 'none' }}>
              <ProductCard product={p} badge={BADGES[i % BADGES.length]} delay="" />
            </a>
          ))}
        </div>
      )}
    </>
  );
}
