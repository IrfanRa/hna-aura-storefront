'use client'; // (1) Checkout — browser se WooCommerce Store API (COD)

import { useState } from 'react';
import { useCart } from './cart-context';
import { storeApi } from './store-api';
import { fmt, stripHtml } from './format';

const WA_NUMBER = '923134494915'; // (2) order confirm ke liye WhatsApp

// (3) Store API ke minor units (paisa) -> PKR
const toPKR = (minor, unit = 2) => Number(minor || 0) / Math.pow(10, unit);

export default function CheckoutForm() {
  const { cart, clear } = useCart(); // (4) cart lines + saaf karne wala
  const lines = Object.values(cart);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', address_1: '', city: '', postcode: '' });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [serverTotal, setServerTotal] = useState(null);

  // (5) Form ke khaane
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // (6) COD order — poora flow:
  //  session bootstrap -> server cart sync -> address -> shipping rate -> checkout
  const placeOrder = async (e) => {
    e.preventDefault();
    setError('');
    const f = form;
    if (!f.first_name.trim() || !f.email.trim() || !f.phone.trim() || !f.address_1.trim() || !f.city.trim() || !f.postcode.trim()) {
      setError('Please fill in your name, email, phone, address, city and postcode — all are required.');
      return;
    }
    if (!lines.length) { setError('Your cart is empty.'); return; }
    setPlacing(true);
    try {
      // (7) Session bootstrap — yahan nonce + cart-token milta hai
      let cartRes = await storeApi('/cart');
      let serverCart = await cartRes.json();

      // (8) Server cart ko local cart se sync karo (purani lines hatao — duplicate na ho)
      for (const it of serverCart.items || []) {
        await storeApi('/cart/remove-item', { method: 'POST', body: { key: it.key } });
      }

      // (9) Local lines add karo (variation wali line me size/colour bhi jata hai)
      for (const line of lines) {
        const body = { id: Number(line.id), quantity: line.qty };
        if (line.variation) body.variation = line.variation;
        const r = await storeApi('/cart/add-item', { method: 'POST', body });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.message || `Could not add "${line.name}" to the order. Please try again.`);
      }

      // (10) Address bhejo — isi se shipping rates nikalte hain
      //      postcode LAZMI hai — is ke baghair Woo "shipping address" error deta hai
      const address = {
        first_name: f.first_name.trim(),
        last_name: (f.last_name || '').trim() || f.first_name.trim(),
        address_1: f.address_1.trim(),
        city: f.city.trim(),
        postcode: f.postcode.trim(),
        country: 'PK',
      };
      const custRes = await storeApi('/cart/update-customer', {
        method: 'POST',
        body: {
          billing_address: { ...address, email: f.email.trim(), phone: f.phone.trim() },
          shipping_address: address,
        },
      });
      if (!custRes.ok) {
        const cd = await custRes.json().catch(() => ({}));
        throw new Error(cd.message || 'Could not save your address. Please check the details and try again.');
      }

      // (11) Pehla available shipping rate select karo (flat PKR 250)
      cartRes = await storeApi('/cart');
      serverCart = await cartRes.json();
      const pkg = (serverCart.shipping_rates || [])[0];
      const rate = pkg && (pkg.shipping_rates || [])[0];
      if (pkg && rate) {
        const rateRes = await storeApi('/cart/select-shipping-rate', {
          method: 'POST',
          body: { package_id: pkg.package_id, rate_id: rate.rate_id },
        });
        if (!rateRes.ok) {
          const rd = await rateRes.json().catch(() => ({}));
          throw new Error(rd.message || 'Could not select a delivery method. Please try again.');
        }
        cartRes = await storeApi('/cart');
        serverCart = await cartRes.json();
      }
      // (11b) Server totals sirf tab dikhao jab asal me aayein —
      //       warna local hisaab (items + PKR 250) hi rehne do
      const totals = serverCart?.totals;
      if (totals && totals.total_price) {
        const unit = totals.currency_minor_unit ?? 2;
        setServerTotal({
          items: toPKR(totals.total_items, unit),
          shipping: toPKR(totals.total_shipping, unit),
          total: toPKR(totals.total_price, unit),
        });
      }

      // (12) Asal order
      const res = await storeApi('/checkout', {
        method: 'POST',
        body: {
          billing_address: { ...address, email: f.email.trim(), phone: f.phone.trim() },
          shipping_address: address,
          payment_method: 'cod',
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'The order could not be placed. Please try again.');
      clear(); // (13) order ban gaya — cart saaf
      try { localStorage.removeItem('haAuraCartToken'); } catch (e) { /* ignore */ }
      setOrderId(data.order_id);
    } catch (err) {
      setError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  // (14) WhatsApp confirm link — order number pehle se likha
  const waConfirm = orderId
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hello H&A Aura! Please confirm my order #${orderId}. Name: ${form.first_name}`)}`
    : '#';

  return (
    <div className="wrap" style={{ padding: '60px 24px', maxWidth: 980 }}>
      <a href="/" style={{ color: 'var(--gold)', letterSpacing: 2, fontSize: 13 }}>← CONTINUE SHOPPING</a>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px,5vw,52px)', margin: '18px 0 8px' }}>
        Check<span className="gold-text">out</span>
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 34 }}>Cash on Delivery — pay at your doorstep. (JazzCash coming soon.)</p>

      <style>{`
        .co-grid{display:grid;grid-template-columns:1fr 380px;gap:36px}
        @media(max-width:860px){.co-grid{grid-template-columns:1fr}}
        .co-sum{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:26px;height:fit-content}
        .co-line{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}
        .co-err{background:rgba(180,40,40,.1);border:1px solid rgba(180,40,40,.5);color:#a33;
          padding:13px 16px;border-radius:4px;margin-bottom:18px;font-size:14px}
      `}</style>

      {/* (15) Kamyabi wali screen */}
      {orderId && (
        <div style={{ textAlign: 'center', padding: '50px 20px', border: '1px solid var(--line)', borderRadius: 8, background: 'var(--card)' }}>
          <div style={{ fontSize: 52, color: 'var(--gold)' }}>✓</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, margin: '14px 0' }}>Thank you, {form.first_name}!</h2>
          <p style={{ color: 'var(--muted)' }}>Your order <b style={{ color: 'var(--gold)' }}>#{orderId}</b> is confirmed.<br />Pay cash when your parcel arrives.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 26, flexWrap: 'wrap' }}>
            <a href={waConfirm} target="_blank" rel="noopener" className="btn btn-gold">Confirm on WhatsApp</a>
            <a href="/" className="btn btn-ghost">Continue Shopping</a>
          </div>
        </div>
      )}

      {!orderId && lines.length === 0 && (
        <p style={{ color: 'var(--muted)' }}>Your cart is empty. <a href="/shop" style={{ color: 'var(--gold)' }}>Back to the shop →</a></p>
      )}

      {/* (16) Form + summary */}
      {!orderId && lines.length > 0 && (
        <form onSubmit={placeOrder} className="co-grid">
          <div>
            {error && <div className="co-err">{error}</div>}
            <div className="co-2">
              <div className="co-field"><label>FIRST NAME *</label><input value={form.first_name} onChange={set('first_name')} placeholder="Ayesha" /></div>
              <div className="co-field"><label>LAST NAME</label><input value={form.last_name} onChange={set('last_name')} placeholder="Khan" /></div>
            </div>
            <div className="co-2">
              <div className="co-field"><label>EMAIL *</label><input type="email" value={form.email} onChange={set('email')} placeholder="you@email.com" /></div>
              <div className="co-field"><label>PHONE *</label><input value={form.phone} onChange={set('phone')} placeholder="0300 1234567" /></div>
            </div>
            <div className="co-field"><label>ADDRESS *</label><input value={form.address_1} onChange={set('address_1')} placeholder="House 12, Street 4, DHA Phase 5" /></div>
            <div className="co-2">
              <div className="co-field"><label>CITY *</label><input value={form.city} onChange={set('city')} placeholder="Lahore" /></div>
              <div className="co-field"><label>POSTCODE / ZIP *</label><input value={form.postcode} onChange={set('postcode')} placeholder="54000" inputMode="numeric" /></div>
            </div>
            <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: 8 }} disabled={placing}>
              {placing ? 'Placing your order…' : 'Place COD Order'}
            </button>
          </div>
          <div className="co-sum">
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, marginBottom: 14 }}>Order <span className="gold-text">Summary</span></h3>
            {lines.map((l) => (
              <div className="co-line" key={(l.variationLabel ? 'v' : 'p') + l.id}>
                <span>{stripHtml(l.name)}{l.variationLabel ? ` (${l.variationLabel})` : ''} × {l.qty}</span>
                <span>{fmt(Number(l.price) * l.qty)}</span>
              </div>
            ))}
            <div className="co-line"><span>Delivery</span><span>{serverTotal ? fmt(serverTotal.shipping) : 'PKR 250'}</span></div>
            <div className="co-line" style={{ border: 'none', fontSize: 18 }}>
              <b>Total</b><b className="gold-text">{serverTotal ? fmt(serverTotal.total) : fmt(lines.reduce((s, l) => s + Number(l.price) * l.qty, 0) + 250)}</b>
            </div>
          </div>
        </form>
      )}
      {!orderId && error && lines.length === 0 && <div className="co-err">{error}</div>}
    </div>
  );
}
