'use client'; // (1) Side wali cart patti — lines seedha cart se aati hain

import { useCart } from './cart-context'; // (2) board se sab kuch
import { fmt, stripHtml } from './format';

// (3) Cart drawer — har line: naam, variation, keemat, ginti
export default function CartDrawer() {
  const { cart, inc, dec, remove, drawerOpen, setDrawerOpen } = useCart();

  // (4) {key: line} -> [[key, line], ...]
  const lines = Object.entries(cart);

  // (5) Kul hisaab
  const subtotal = lines.reduce((s, [, l]) => s + Number(l.price) * l.qty, 0);

  return (
    <>
      {/* (6) Patti ke peeche parda — click par band */}
      <div className={`overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}></div>

      <aside className={`drawer ${drawerOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="drawer-head">
          <h3>Your Cart</h3>
          <button className="close-x" onClick={() => setDrawerOpen(false)} aria-label="Close cart">✕</button>
        </div>

        <div className="drawer-items">
          {lines.length === 0 ? (
            <div className="cart-empty"><span className="big">✦</span>Your cart is empty.<br />Discover pieces made to shine.</div>
          ) : lines.map(([key, l]) => (
            <div className="c-item" key={key}>
              <img src={l.image || '/logo.webp'} alt={stripHtml(l.name)} loading="lazy" />
              <div className="c-info">
                <h4>{stripHtml(l.name)}</h4>
                {l.variationLabel && <div className="c-var">{l.variationLabel}</div>}
                <div className="p">{fmt(l.price)}</div>
                <div className="qty">
                  <button onClick={() => dec(key)} aria-label="Decrease">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => inc(key)} aria-label="Increase">+</button>
                </div>
              </div>
              <button className="c-rm" onClick={() => remove(key)}>Remove</button>
            </div>
          ))}
        </div>

        <div className="drawer-foot">
          <div className="total-row"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className="total-row"><span>Delivery</span><span>PKR 250</span></div>
          <div className="total-row grand"><span>Total</span><b>{fmt(lines.length ? subtotal + 250 : 0)}</b></div>
          {/* (7) Checkout page par bhejo */}
          <a href="/checkout" className="btn btn-gold checkout" style={{ display: 'block', textAlign: 'center' }}>Checkout</a>
          <div className="demo-note">Cash on Delivery available across Pakistan.</div>
        </div>
      </aside>
    </>
  );
}
