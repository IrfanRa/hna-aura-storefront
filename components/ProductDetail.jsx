'use client'; // (1) Product page: gallery, variations, reviews, WhatsApp — sab client ka kaam

import { useState } from 'react';
import { useCart } from './cart-context';
import { fmt, stripHtml } from './format';
import TrustBadges from './TrustBadges';

const WA_NUMBER = '923134494915'; // (2) order ke liye WhatsApp

// (3) Sitare — rating dikhane ke liye
function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(n) ? 'on' : ''}>★</span>
      ))}
    </span>
  );
}

// (4) Product ka mukammal taaruf
export default function ProductDetail({ product: p, variations = [], reviews = [] }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1); // (5) kitni ginti
  const [imgIdx, setImgIdx] = useState(0); // (6) konsi tasveer bari
  const [tab, setTab] = useState('desc'); // (6b) konsa tab khula: desc | info | rev

  // (7) Variable product? (WooCommerce se attributes: Size, Colour...)
  const attrs = (p.attributes || []).filter((a) => a.variation && a.options?.length);
  const isVariable = attrs.length > 0 && variations.length > 0;

  // (8) Har attribute ki selected value (pehli option default)
  const [sel, setSel] = useState(() =>
    Object.fromEntries(attrs.map((a) => [a.name, a.options[0]]))
  );

  // (9) Selected combination wali variation dhoondo
  const match = isVariable
    ? variations.find((v) => Object.entries(sel).every(([k, val]) => v.attrs[k] === val))
    : null;

  // (10) Keemat — variation ki, warna product ki
  const price = Number(match ? match.price : p.price) || 0;
  const regular = Number(match ? match.regular : p.regular_price) || 0;
  const hasSale = match ? match.onSale : !!(p.sale_price && p.sale_price !== '');
  // (10b) Safety: variable product jis ki variations/price abhi WP me poori na hui hon
  const priceValid = price > 0;

  const images = p.images?.length ? p.images : [{ src: '/logo.webp' }];
  const shortDesc = stripHtml(p.short_description || ''); // (10c) upar sirf mukhtasar taaruf
  const fullDescHtml = p.description || p.short_description || ''; // (10d) Description tab me poori tafseel (HTML)
  const allAttrs = (p.attributes || []).filter((a) => a.options?.length); // (10e) Additional Information tab ke liye
  const name = stripHtml(p.name);

  // (11) "Size: 2.6, Colour: Golden" — cart + WhatsApp ke liye
  const variationLabel = isVariable
    ? Object.entries(sel).map(([k, v]) => `${k}: ${v}`).join(', ')
    : '';

  // (12) Cart mein dalo (variation id + attributes sath)
  const doAdd = () => {
    add(
      {
        id: isVariable && match ? match.id : p.id,
        name,
        price,
        image: images[0]?.src || '/logo.webp',
        variationLabel,
        variation: isVariable
          ? Object.entries(sel).map(([attribute, value]) => ({ attribute, value }))
          : null,
      },
      qty
    );
  };

  // (13) WhatsApp order button — product + variation + keemat pehle se likhi
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hello H&A Aura! I want to order:\n${name}${variationLabel ? `\n${variationLabel}` : ''}\nQty: ${qty}${priceValid ? ` — Total: ${fmt(price * qty)}` : ' — please confirm price'}`
  )}`;

  // (14) Reviews — average + form
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const [rName, setRName] = useState('');
  const [rEmail, setREmail] = useState('');
  const [rRating, setRRating] = useState(5);
  const [rText, setRText] = useState('');
  const [rMsg, setRMsg] = useState('');
  const [rSending, setRSending] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    setRMsg('');
    if (rName.trim().length < 2 || rText.trim().length < 3) {
      setRMsg('Please add your name and a short review.');
      return;
    }
    setRSending(true);
    try {
      const WC = process.env.NEXT_PUBLIC_WC_URL;
      const res = await fetch(`${WC}/wp-json/ha-aura/v1/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: p.id,
          reviewer: rName.trim(),
          reviewer_email: rEmail.trim(),
          rating: rRating,
          review: rText.trim(),
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.message || 'Could not submit your review. Please try again.');
      setRMsg('Thank you! Your review will appear here after approval.');
      setRText('');
    } catch (err) {
      setRMsg(err.message);
    } finally {
      setRSending(false);
    }
  };

  return (
    <>
      <div className="pd-grid">
        {/* (15) Tasveer + thumbnails */}
        <div>
          <div className="pd-img">
            <img src={images[imgIdx].src} alt={name} fetchPriority="high" />
          </div>
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
              {images.map((im, i) => (
                <img
                  key={i}
                  src={im.src}
                  alt=""
                  onClick={() => setImgIdx(i)}
                  style={{
                    width: 70, height: 70, objectFit: 'cover', borderRadius: 6, cursor: 'pointer',
                    border: i === imgIdx ? '2px solid var(--gold)' : '1px solid var(--line)',
                    opacity: i === imgIdx ? 1 : 0.6,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* (16) Tafseel */}
        <div className="pd-info">
          <div className="card-cat">{p.categories?.[0]?.name || 'Jewellery'}</div>
          <h1>{name}</h1>
          {reviews.length > 0 && (
            <div className="pd-rating">
              <Stars n={avg} />
              <span>{avg.toFixed(1)} · {reviews.length} review{reviews.length > 1 ? 's' : ''}</span>
            </div>
          )}
          <div className="pd-price">
            {priceValid ? (
              <>
                <span className="now">{fmt(price)}</span>
                {hasSale && <span className="was">{fmt(regular)}</span>}
                {hasSale && <span className="badge">Sale</span>}
              </>
            ) : (
              <span className="now" style={{ fontSize: 18 }}>Price on request</span>
            )}
          </div>
          {shortDesc && <div className="pd-desc">{shortDesc}</div>}

          {/* (17) Size / Colour selectors */}
          {isVariable && attrs.map((a) => (
            <div key={a.name} className="var-row">
              <div className="var-label">{a.name}: <b>{sel[a.name]}</b></div>
              <div className="var-opts">
                {a.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`var-btn ${sel[a.name] === opt ? 'active' : ''}`}
                    onClick={() => setSel({ ...sel, [a.name]: opt })}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* (18) Ginti + Add to Cart — sirf jab keemat mojood ho */}
          {priceValid && (
            <div className="pd-buy">
              <div className="pd-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(9, qty + 1))} aria-label="Increase">+</button>
              </div>
              <button className="btn btn-gold" onClick={doAdd} style={{ flex: 1 }}>
                Add to Cart
              </button>
            </div>
          )}
          {!priceValid && (
            <p className="pd-desc">This product's options are being updated — message us on WhatsApp and we'll confirm the price for you.</p>
          )}
          {/* (19) WhatsApp order — Add to Cart ke sath */}
          <a className="btn wa-order" href={waLink} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.2.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.1z" /></svg>
            Order on WhatsApp
          </a>

          {/* (20) Bharosa wali patti */}
          <div style={{ marginTop: 22 }}>
            <TrustBadges compact />
          </div>
        </div>
      </div>

      {/* (21) Tabs — WooCommerce style: Description | Additional Information | Reviews */}
      <section className="pd-tabs">
        <div className="tab-bar" role="tablist">
          <button type="button" role="tab" className={`tab-btn ${tab === 'desc' ? 'active' : ''}`} onClick={() => setTab('desc')}>
            Description
          </button>
          <button type="button" role="tab" className={`tab-btn ${tab === 'info' ? 'active' : ''}`} onClick={() => setTab('info')}>
            Additional Information
          </button>
          <button type="button" role="tab" className={`tab-btn ${tab === 'rev' ? 'active' : ''}`} onClick={() => setTab('rev')}>
            Reviews ({reviews.length})
          </button>
        </div>

        {/* (21a) Description tab — poori tafseel */}
        {tab === 'desc' && (
          <div className="tab-panel">
            {fullDescHtml ? (
              <div className="pd-full-desc" dangerouslySetInnerHTML={{ __html: fullDescHtml }} />
            ) : (
              <p className="rev-empty">No detailed description available for this product yet.</p>
            )}
          </div>
        )}

        {/* (21b) Additional Information tab — attributes ki table */}
        {tab === 'info' && (
          <div className="tab-panel">
            {allAttrs.length > 0 ? (
              <table className="attr-table">
                <tbody>
                  {allAttrs.map((a) => (
                    <tr key={a.name}>
                      <th>{a.name}</th>
                      <td>{a.options.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="rev-empty">No additional information available for this product yet.</p>
            )}
          </div>
        )}

        {/* (21c) Reviews tab */}
        {tab === 'rev' && (
          <div className="tab-panel">
            <div className="sec-head" style={{ marginBottom: 30 }}>
              <div className="eyebrow">✦ &nbsp;Reviews&nbsp; ✦</div>
              <h2>Customer <span className="gold-text">Reviews</span></h2>
              {reviews.length > 0 && (
                <p><Stars n={avg} /> &nbsp;{avg.toFixed(1)} out of 5 · {reviews.length} verified review{reviews.length > 1 ? 's' : ''}</p>
              )}
            </div>

            {reviews.length > 0 ? (
              <div className="rev-list">
                {reviews.map((r) => (
                  <div key={r.id} className="rev-card">
                    <div className="rev-head">
                      <b>{r.reviewer}</b>
                      <Stars n={r.rating} />
                    </div>
                    <div className="rev-text" dangerouslySetInnerHTML={{ __html: r.review }} />
                    {r.date && <div className="rev-date">{r.date}</div>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="rev-empty">No reviews yet — be the first to share your experience!</p>
            )}

            {/* (22) Review likho — moderation ke baad show hoga */}
            <form className="rev-form" onSubmit={submitReview}>
              <h3>Write a review</h3>
              <div className="rev-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    className={i <= rRating ? 'on' : ''}
                    onClick={() => setRRating(i)}
                    aria-label={`${i} star${i > 1 ? 's' : ''}`}
                  >★</button>
                ))}
              </div>
              <div className="co-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="co-field"><label>YOUR NAME *</label><input value={rName} onChange={(e) => setRName(e.target.value)} placeholder="Ayesha" /></div>
                <div className="co-field"><label>EMAIL *</label><input type="email" value={rEmail} onChange={(e) => setREmail(e.target.value)} placeholder="you@email.com" /></div>
              </div>
              <div className="co-field"><label>YOUR REVIEW *</label><textarea value={rText} onChange={(e) => setRText(e.target.value)} placeholder="How was the quality, packaging, delivery?" rows={4} /></div>
              {rMsg && <p className="rev-msg">{rMsg}</p>}
              <button type="submit" className="btn btn-ghost" disabled={rSending}>
                {rSending ? 'Submitting…' : 'Submit Review'}
              </button>
              <p className="rev-note">Reviews appear here after approval.</p>
            </form>
          </div>
        )}
      </section>

      {/* (23) Mobile sticky buy bar — sirf mobile par nazar aayega (CSS) */}
      {priceValid && (
        <div className="mobile-buy-bar">
          <div className="mbb-price">{fmt(price)}</div>
          <button className="btn btn-gold mbb-btn" onClick={doAdd}>
            Add to Cart
          </button>
        </div>
      )}
    </>
  );
}
